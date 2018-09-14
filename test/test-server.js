'use strict';
const {
    app,
    runServer,
    closeServer
} = require('../server')

const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const faker = require('faker');

const expect = chai.expect;

let Entry = require('../models/entry.js');
let User = require('../models/user.js')
const { TEST_DATABASE_URL } = require('../config.js');

chai.use(chaiHttp);

function generateRandomType() {
    let value = Math.floor(Math.random() * 5)
    let type = '';
    if (value === 0) {
        type = 'recipe'
    } else if (value === 1) {
        type = 'activities'
    } else if (value === 2) {
        type = 'outreach'
    } else if (value === 3) {
        type = 'decor'
    } else if (value === 4) {
        type = 'org/opt'
    }
    return type;
}

function generateEntryData() {
    return {
        inputTitle: faker.lorem.words(),
        inputContent: faker.lorem.paragraph(),
        inputAuthor: faker.name.findName(),
        entryType: generateRandomType(),
        createdDate: '9/6/2018',    
    }
}

function seedEntryData() {
    console.info('seeding entry info');
    const seedData = [];

    for (let i=1; i <= 20; i++) {
        seedData.push(generateEntryData());
    }
    return Entry.insertMany(seedData).catch(console.log);
}

function tearDownDb() {
    console.warn('Deleting database');
    return mongoose.connection.dropDatabase();
}

describe('eureka-node-capstone', function() {
    before (function() {
        return runServer(TEST_DATABASE_URL);
    })
    beforeEach(function() {
        return seedEntryData();
    })
    afterEach(function() {
        return tearDownDb();
    })
    after(function() {
        return closeServer();
    })
    
    it('should add an entry on POST', function() {
        const newPost = {
            inputTitle: 'Santos',
            inputContent: 'is cooler than Angel... he wishes',
            entryType: 'outreach',
            inputAuthor: 'jonathan santos'
        }
        return chai.request(app)
            .post('/entry/create')
            .send(newPost)
            .then(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body).to.be.a('object');
                expect(res.body).to.include.keys(
                    '_id', 'inputTitle', 'inputContent', 'inputAuthor', 'entryType'
                );
                expect(res.body._id).to.not.be.null;
                expect(res.body.inputTitle).to.equal(newPost.inputTitle);
                expect(res.body.inputContent).to.equal(newPost.inputContent);
                expect(res.body.inputAuthor).to.equal(newPost.inputAuthor);
                return Entry.findById(res.body._id);
            })
            .then(function(post) {
                expect(post.inputAuthor).to.contain(newPost.inputAuthor);
                expect(post.inputTitle).to.equal(newPost.inputTitle);
                expect(post.inputContent).to.equal(newPost.inputContent);
            })
    })

    it('should delete an entry on DELETE', function() {
        let post;
        return Entry
            .findOne()
            .then(function(_post) {
                post = _post;
                return chai.request(app).delete(`/entry/${post.id}`);
            })
            .then(function(res) {
                expect(res).to.have.status(204);
                return Entry.findById(post.id);
            })
            .then(function(_post) {
                expect(_post).to.be.null;
            })
    })

    it('should update an entry on PUT', function() {
        let updatePost = {
            inputTitle: 'Title',
            inputContent: 'Content',
            entryType: 'recipe'
        };
        return Entry
            .findOne()
            .then(function(post) {
                updatePost._id = post._id;
                return chai.request(app)
                    .put(`/update-entry/${post._id}`)
                    .send(updatePost)
            })
            .then(function(res) {
                expect(res).to.have.status(204);
                return Entry.findById(updatePost._id)
            })
            .then(function(post) {
                expect(post.inputTitle).to.equal(updatePost.inputTitle);
                expect(post.inputContent).to.equal(updatePost.inputContent);
                expect(post.entryType).to.equal(updatePost.entryType);
            })
    })

    it('should get a category of entries on GET', function() {
        let category = generateRandomType();
        let resEntry;
        return chai.request(app)
            .get(`/entry/${category}`)
            .then(function(res) {
                console.log('res.body', res.body);
                expect(res).to.be.json;
                expect(res).to.have.status(200);
                expect(res.body.entries).to.be.a('array');

                res.body.entries.forEach(function(post) {
                    // console.log('post', post)
                    expect(post).to.be.a('object');
                    expect(post).to.include.keys(
                        "_id", "inputTitle", "inputAuthor", "inputContent", "entryType"
                    )
                    expect(post.entryType).to.equal(category);
                })

                // resEntry = res.body[0]
                // return Entry.findById(resEntry._id)
            })
    })

    it('should return an entry matching a specific query on GET', function() {
        let queryEntry;
        let queryId;
        
        return Entry
            .findOne()
            .then(function(post) {
                queryEntry = post.inputTitle
                queryId = post._id
                console.log('queryEntry', queryEntry);
                console.log('queryId', queryId);
                return chai.request(app)
                    .get(`/search-entry/${queryEntry}`)
                    .then(function(res) {
                        expect(res).to.have.status(200);
                        expect(res).to.be.json;
                        expect(res.body).to.be.a('object');
                        expect(res.body).to.have.keys
                        
                    })
            })
    })
})