var express = require('express');
var router = express.Router();
var fs = require('fs');
var productManager = require("product-manager");
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
var db;
var url = "mongodb+srv://mcritt:atlasdb@cluster0.rhffd.mongodb.net/titan-backend?retryWrites=true&w=majority";

router.get('/products', function(req, res) {
	MongoClient.connect(url, function(err, client) {
		if (err) return console.log(err);
		var db = client.db("titan-backend");
		console.log('You are now connected to the database.');
		db.collection("products").find().toArray( function(err, results) {
			res.json(results);
		});
		console.log('Products retrieved.');
		client.close();
	});
});

router.post('/products/:product_id.json', function(req, res) {
	MongoClient.connect(url, function(err, client) {
		if (err) return console.log(err);
		var db = client.db("titan-backend");
		console.log('You are now connected to the database.');
		db.collection('products').insertOne({
			name:req.body.name,
			price:req.body.price,
			description:req.body.description,
			quantity:req.body.quantity
		});
		console.log('The product has been added.');		
		res.sendStatus(200);
		client.close();
	});
}); 

router.delete('/products/:product_id', function(req, res) {
	MongoClient.connect(url, function(err, client) {
		if (err) return console.log(err);
		var db = client.db("titan-backend");
		console.log('You are now connected to the database.');
		var delProductID = ObjectId(req.params.product_id.toString());
		db.collection('products').deleteOne({_id: delProductID});
		console.log('Your product has been deleted');
		res.sendStatus(200);
		client.close();
	});
});


module.exports = router;

// {"name":"book","price":4,"description":"paperback","quantity":1}
