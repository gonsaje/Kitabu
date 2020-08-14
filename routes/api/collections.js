const express = require("express");
const router = express.Router();
const Collection = require('../../models/Collection');

router.post("/new", (res,req) => {
    const collection = new Collection ({
        title: res.body.title,
        donorId: res.body.donorId,
    })

    collection.save().then( () => {
        return res.json(collection);
    })
})

router.get("/index", (res,req) => {
    Collection.find({donorId: req.query.donorId})
    .then(collections => {
        if (collections) {
            return res.json(collections);
          } else {
            return res.status(404).json({ notfound: "No Collections Found for User" })
          }
    })
})

router.get("/:id", (res,req) => {
    Collection.find({_id: req.params.id})
    .then(collection => {
        if (collection) {
            return res.json(collection)
        } else {
            return res.status(404).json({notfound: "Collection Not Found"})
        }
    }) 
})