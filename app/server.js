var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://mcritt:atlasdb@cluster0.rhffd.mongodb.net/titan-backend?retryWrites=true&w=majority";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var router = require("../routes/products");
app.use("/", router);

MongoClient.connect(url, function(err, client) {
    if (err) return console.log(err);
    app.listen(3000, () => console.log('Connecting to port 3000.'));
    console.log('Connected to database.');
});

