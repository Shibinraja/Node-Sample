const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require('body-parser');
const MongoDB = require("mongodb");
const bcrypt = require("bcrypt")

const saltRounds = 10;

const MongoClient = MongoDB.MongoClient;
const URL = "mongodb://localhost:/27017";


//To authenticate Token from client to server

function aunthenticate(req, res, next) {
    res.status(401).json({
        message: "Not Authentication"
    })
}


app.use(cors());
app.use(bodyParser.json());

app.post('/haveFun', function (req, res) {
    MongoClient.connect(URL, function (err, client) {
        if (err) throw err;

        //Connect the client to the database created or present in database
        var db = client.db("filmDB");

        db.collection('film').insertOne(req.body, function (err, data) {
            if (err) throw err;

            console.log(data);
            res.json({ "message": "success" });

            return;

        })
        client.close()
    })


});

app.get('/hadDetails', function (req, res) {
    MongoClient.connect(URL, function (err, client) {
        if (err) throw err;

        //Access all the data from the DataBase

        var db = client.db("filmDB");

        //db.film.find().toArray()

        var useCursor = db.collection('film').find().toArray();

        useCursor.then((data) => {
            res.json(data)
        })

        client.close()

    })
})


app.post('/register', function (req, res) {
    MongoClient.connect(URL, function (err, client) {
        if (err) throw error;

        var db = db.client("filmDB");

        bcrypt.genSalt(saltRounds, function (err, salt) {
            //Connects and store the password in encrypted file in database using hash. 
            bcrypt.hash(req.body.password, salt, function (err, hash) {

                console.log(hash)

                db.collection('film').insertOne({ email: req.body.email, password: hash }, function (err, data) {
                    if (err) throw err;
                    res.status(200).json({ message: "Successfully Registered" });

                });;

                client.close();

            })
        })
    })

});

app.post('/login', function (req, res) {
    MongoClient.connect(URL, function (err, client) {
        if (err) throw err;

        var db = client.db("filmDB")
        var result = db.collection('film').findOne({ email: req.body.email });

        result.then(function (userdata) {

            console.log(userdata);
            console.log(req.body.password);
            console.log(userdata.password);

            bcrypt.compare(req.body.password, userdata.password, function (err, res) {
                if (res == true) {
                    res.json({ Message: "Success" })

                }

                else {
                    res.status(403).json({ Message: "Wrong Password" })
                }
            
            })

            client.close();
        })
    })
});


app.listen(7050);