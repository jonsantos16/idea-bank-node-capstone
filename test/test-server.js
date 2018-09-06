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
const { TEST_DATABASE_URL } = require('../config');

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
    }
}

describe('eureka-node-capstone', function() {
    before (function() {
        return runServer(TEST_DATABASE_URL);
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
                console.log(post);
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
                console.log(_post);
                return chai.request(app).delete(`/entry/${post.id}`);
            })
            .then(function(res) {
                expect(res).to.have.status(204);
                return Entry.findById(post.id);
            })
            .then(function(_post) {
                console.log(_post);
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
                updatePost.id = post.id;
                return chai.request(app)
                    .put(`/update-entry/${post.id}`)
                    .send(updatePost)
            })
            .then(function(res) {
                expect(res).to.have.status(204);
                return Entry.findById(updatePost.id)
            })
            .then(function(post) {
                expect(post.inputTitle).to.equal(updatePost.inputTitle);
                expect(post.inputContent).to.equal(updatePost.inputContent);
                expect(post.entryType).to.equal(updatePost.entryType);
            })
    })
})