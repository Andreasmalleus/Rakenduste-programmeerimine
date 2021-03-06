const express = require('express');
const router = express();
const mongoose = require('mongoose');
const models = require('../models/item.model.js');



const Item = models.Item;

//Create an item
router.post("/items", (req, res) => {
    const props = {
        id: "clothing-1",
        imgSrc: "http://qnimate.com/wp-content/uploads/2014/03/images2.jpg",
        title: "Kenzo",
        price: 12,
        category: "new clothing",
    }
    const item = new Item(props);
    item.save((err, item) => {
        if(err)return console.log(err);
        console.log(item);
    })
});

//Delete an item
router.delete("/items/:itemId", (req,res) => {
    Item.deleteOne({_id : mongoose.Types.ObjectId(req.params.itemId)},(err) =>{
        if(err)return console.log(err);
    })
})

//Get an item by id
router.get("/items/:itemId", (req,res) => {
    Item.findById(req.params.itemId, (err, item) => {
        if(err) return console.log(err);
        res.send(item);
    });
});

//Get all items
router.get("/items", (req,res) => {
    Item.find({},(err, items) =>{
        if(err) return console.log(err);
        res.send(items);
    });
});

module.exports = router;