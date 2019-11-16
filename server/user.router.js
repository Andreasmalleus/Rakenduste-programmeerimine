const express = require('express');
const router = express();
const cors = require('cors');
const models = require('../models/user.model.js');


const User = models.User;

//Get all users
router.get("/users", cors(),(req,res) => {
    User.find({},(err, users) => {
        if(err)return console.log(err);
        res.json(users)
    })
})

//Get user by id
router.get("/items/:userId", cors(), (req,res) => {
    User.findById((req.params.userId), (err, user) => {
        if(err) return console.log(err);
        res.send(user);
    });
});

//Delete all users
router.delete("/users", cors(), (req,res)=> {
    User.deleteMany({}, (err) => {
        if(err)return console.log(err);
    })
})

module.exports = router;