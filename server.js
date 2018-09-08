const User = require('./models/user');
const Entry = require('./models/entry');
const bodyParser = require('body-parser');
const config = require('./config');
const mongoose = require('mongoose');
const moment = require('moment');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const express = require('express');
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));

mongoose.Promise = global.Promise;

// ---------------- RUN/CLOSE SERVER -----------------------------------------------------
let server = undefined;
// Creates a promise, finds what database to use, port is how you call one function in a server, when listening to a port, this port corresponds to the database 
function runServer(urlToUse) {
    return new Promise((resolve, reject) => {
        mongoose.connect(urlToUse, err => {
            if (err) {
                return reject(err);
            }
            server = app.listen(config.PORT, () => {
                console.log(`Listening on localhost:${config.PORT}`);
                resolve();
            }).on('error', err => {
                mongoose.disconnect();
                reject(err);
            });
        });
    });
}
// if running directly, nothing. if run indirectly, like from test where it's imported as a module, specify database url to use. terminal will know which database to use but running indirectly, won't know which to use
if (require.main === module) {
    runServer(config.DATABASE_URL).catch(err => console.error(err));
}
// disconnects, as a promise bc sometimes needs to do something after
function closeServer() {
    return mongoose.disconnect().then(() => new Promise((resolve, reject) => {
        console.log('Closing server');
        server.close(err => {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    }));
}

// ---------------USER ENDPOINTS-------------------------------------
// POST -----------------------------------
// creating a new user
app.post('/users/create', (req, res) => {

    //take the name, username and the password from the ajax api call
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.body.email;
    let username = req.body.username;
    let password = req.body.password;

    //exclude extra spaces from the username and password
    username = username.trim();
    password = password.trim();

    //create an encryption key
    bcrypt.genSalt(10, (err, salt) => {

        //if creating the key returns an error...
        if (err) {

            //display it
            return res.status(500).json({
                message: 'Internal server error'
            });
        }

        //using the encryption key above generate an encrypted pasword
        bcrypt.hash(password, salt, (err, hash) => {

            //if creating the ncrypted pasword returns an error..
            if (err) {

                //display it
                return res.status(500).json({
                    message: 'Internal server error'
                });
            }

            //using the mongoose DB schema, connect to the database and create the new user
            User.create({
                firstName,
                lastName,
                email,
                username,
                password: hash,
            }, (err, item) => {

                //if creating a new user in the DB returns an error..
                if (err) {
                    //display it
                    return res.status(500).json({
                        message: 'Internal Server Error'
                    });
                }
                //if creating a new user in the DB is succefull
                if (item) {

                    //display the new user
                    console.log(`User \`${username}\` created.`);
                    return res.json(item);
                }
            });
        });
    });
});

// signing in a user
app.post('/users/login', function (req, res) {

    //take the username and the password from the ajax api call
    const username = req.body.username;
    const password = req.body.password;

    //using the mongoose DB schema, connect to the database and the user with the same username as above
    User.findOne({
        username: username
    }, function (err, items) {

        //if the there is an error connecting to the DB
        if (err) {

            //display it
            return res.status(500).json({
                message: "Internal server error"
            });
        }
        // if there are no users with that username
        if (!items) {
            //display it
            return res.status(401).json({
                message: "Not found!"
            });
        }
        //if the username is found
        else {

            //try to validate the password
            items.validatePassword(password, function (err, isValid) {

                //if the connection to the DB to validate the password is not working
                if (err) {

                    //display error
                    console.log('Could not connect to the DB to validate the password.');
                }

                //if the password is not valid
                if (!isValid) {

                    //display error
                    return res.status(401).json({
                        message: "Password Invalid"
                    });
                }
                //if the password is valid
                else {
                    //return the logged in user
                    console.log(`User \`${username}\` logged in.`);
                    return res.json(items);
                }
            });
        };
    });
});


// -------------entry ENDPOINTS------------------------------------------------
// POST -----------------------------------------
// creating a new Entry
app.post('/entry/create', (req, res) => {
    let entryType = req.body.entryType;
    let inputTitle = req.body.inputTitle;
    let inputContent = req.body.inputContent;
    let createdDate = req.body.createdDate;
    let inputAuthor = req.body.inputAuthor;
    let loggedInUserName = req.body.loggedInUserName;

    console.log(createdDate);
    
    Entry.create({
        entryType,
        inputTitle,
        inputAuthor,
        inputContent,
        createdDate,
        loggedInUserName,
    }, (err, item) => {
        if (err) {
            // console.log(err);
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        if (item) {
            return res.json(item);
            // return res.status(201);
        }
    });
});

// PUT --------------------------------------
app.put('/update-entry/:id', function (req, res) {
    console.log(req.body);
    let toUpdate = {};
    let updateableFields = ['entryType', 'inputTitle','inputContent'];
    updateableFields.forEach(function(field) {
        if (field in req.body) {
            toUpdate[field] = req.body[field];
        }
    });
    console.log(toUpdate);
    Entry
        .findByIdAndUpdate(req.params.id, {
            $set: toUpdate
        }).exec().then(function (achievement) {
            return res.status(204).end();
        }).catch(function (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        });
});

// GET ------------------------------------
// accessing all of a user's entries
app.get('/get-entry-by-user/:user', function (req, res) {

    Entry
        .find()
        .sort('createdDate')
        .then(function (entries) {
            // console.log(entries);
            let entriesOutput = [];
            entries.map(function (entry) {
                // console.log(entry);
                // console.log(req.params.user);
                if (entry.loggedInUserName == req.params.user) {
                    entriesOutput.push(entry);
                }
            });
            res.json({
                entriesOutput
            });
        })
        .catch(function (err) {
            console.error(err);
            res.status(500).json({
                message: 'Internal server error'
            });
        });
});
app.get('/search-entry/:query', function (req, res) {
    console.log(req.params.query);
    // db.entries.createIndex({
    //     "$**": "text"
    // })
    let searchTerm = req.params.query;

    Entry
    .find(
        {inputTitle: {$regex: searchTerm, $options: "i" }}
        // {inputContent: {$regex: searchTerm, $options: "i" }}
    )
        .sort('createdDate')
        .then(function (entries) {
            console.log(entries);
            // let entriesOutput = [];
            // entries.map(function (entry) {
            //     if (entry.loggedInUserName == req.params.user) {
            //         entriesOutput.push(entry);
            //     }
            // });
            res.json({
                entries
            });
        })
        .catch(function (err) {
            console.error(err);
            res.status(500).json({
                message: 'Internal server error'
            });
        });
});

app.get('/entry/recipe', function (req, res) {

    Entry
        .find({
            "entryType": "recipe"
        })
        .sort('createdDate')
        .then(function (entries) {
            res.json({
                entries
            });
        })
        .catch(function (err) {
            console.error(err);
            res.status(500).json({
                message: 'Internal server error'
            });
        });
});

app.get('/entry/activities', function(req, res) {
    Entry
        .find({
            "entryType": "activities"
        })
        .sort('createdDate')
        .then(function(entries) {
            console.log(entries);
            res.json({
                entries
            });
        })
        .catch(function(err) {
            console.error(err);
            res,status(500).json({
                message: 'Internal server error'
            });
        })
})

app.get('/entry/org-opt', function(req, res) {
    Entry
        .find({
            "entryType": "org/opt"
        })
        .sort('createdDate')
        .then(function(entries) {
            res.json({
                entries
            });
        })
        .catch(function(err) {
            console.error(err);
            res,status(500).json({
                message: 'Internal server error'
            });
        })
})

app.get('/entry/outreach', function(req, res) {
    Entry
        .find({
            "entryType": "outreach"
        })
        .sort('createdDate')
        .then(function(entries) {
            res.json({
                entries
            });
        })
        .catch(function(err) {
            console.error(err);
            res,status(500).json({
                message: 'Internal server error'
            });
        })
})

app.get('/entry/decor', function(req, res) {
    Entry
        .find({
            "entryType": "decor"
        })
        .sort('createdDate')
        .then(function(entries) {
            res.json({
                entries
            });
        })
        .catch(function(err) {
            console.error(err);
            res,status(500).json({
                message: 'Internal server error'
            });
        })
})

// accessing a single entry by id
// app.get('/entry/:id', function (req, res) {
//     Entry
//         .findById(req.params.id).exec().then(function (entry) {
//             return res.json(entry);
//         })
//         .catch(function (entries) {
//             console.error(err);
//             res.status(500).json({
//                 message: 'Internal Server Error'
//             });
//         });
// });

// DELETE ----------------------------------------
// deleting an entry by id
app.delete('/entry/:id', function (req, res) {
    Entry.findByIdAndRemove(req.params.id).exec().then(function (entry) {
        return res.status(204).end();
    }).catch(function (err) {
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    });
});

// MISC ------------------------------------------
// catch-all endpoint if client makes request to non-existent endpoint
app.use('*', (req, res) => {
    res.status(404).json({
        message: 'Not Found'
    });
});

exports.app = app;
exports.runServer = runServer;
exports.closeServer = closeServer;