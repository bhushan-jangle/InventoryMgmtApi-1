var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var path = require('path');
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var User = require('./user');

// CREATES A NEW USER
router.post('/product/add', function (req, res) {
    User.create({
            userId : req.body.userId,
            productName : req.body.productName,
            availableStock : req.body.availableStock,
            minStockLimit : req.body.minStockLimit,
            measuringUnit : req.body.measuringUnit,
            purchasingCost : req.body.purchasingCost,
            salePrice : req.body.salePrice
          },
        function (err, basePrice) {
            if (err) return res.status(500).send("There was a problem adding the information to the database.");
            res.status(200).send(basePrice);
        });
});

// RETURNS ALL THE USERS IN THE DATABASE
router.get('/product/all', function (req, res) {
    User.find({}, function (err, users) {
        if (err) return res.status(500).send("There was a problem finding the users.");
        res.status(200).send(users);
    });
});

// GETS A SINGLE USER FROM THE DATABASE
router.get('/product/byid/:id', function (req, res) {
  User.findById(req.params.id, function (err, user) {
      if (err) return res.status(500).send("There was a problem finding the user.");
      if (!user) return res.status(404).send("No user found.");
      res.status(200).send(user);
  });
});

router.get('/product/byuserid/:userId', function(req, res) {
  User.find({}, function(err,data){
    if(err){
      console.log(err);
    }else{
      console.log(req.params.userId);
      js = req.params.userId !== undefined ? data.filter(function(obj) {return obj.userId== req.params.userId}): data;
      res.send(js);
    }
  })
});

// DELETES A USER FROM THE DATABASE
router.delete('/product/:id', function (req, res) {
  User.findByIdAndRemove(req.params.id, function (err, user) {
      if (err) return res.status(500).send("There was a problem deleting the user.");
      res.status(200).send("User: "+ user.productName +" was deleted.");
  });
});

// UPDATES A SINGLE USER IN THE DATABASE
router.put('/product/:id', function (req, res) {
  User.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, user) {
      if (err) return res.status(500).send("There was a problem updating the user.");
      res.status(200).send(user);
  });
});

module.exports = router;
