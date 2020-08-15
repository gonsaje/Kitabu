const express = require("express");
const router = express.Router();
const Collection = require('../../models/Collection');

router.post("/new", (res,req) => {
    const collection = new Collection ({
        title: req.body.title,
        donorId: req.body.donorId,
        books: req.body.books
    })

    collection.save().then( () => {
        return res.json(collection);
    })
})

router.get("/index", (req,res) => {
    Collection.find({donorId: req.body.donorId})
    .then(collections => {
        if (collections) {
            return res.json(artworks);
        } else {
            return res.status(404).json({notfound: "No Collections Found for User"})
        }
    })
})

router.get("/:id", (res,req) => {
    Collection.find({_id: req.query.id})
    .then(collection => {
        if (collection) {
            return res.json(collection)
        } else {
            return res.status(404).json({notfound: "Collection Not Found"})
        }
    }) 
})

router.patch('/:id', (req,res) => {
        let collection = Collection.findById(req.params.id)
        if (collection) {
            collection.books = req.body.books;
            collection.status = req.body.status;
            collection.points = req.body.points;
            collection.save()
            .then(() => res.json("Collection Updated"))
        } else {
            return res.status(404).json({notfound:'Collection Not Found'})
        }
})

// router.delete("/:id", (req,res) => {
//     Collection.findByIdAndDelete(req.params.id)
//     .then(() => {res.redirect('')})
//     .catch(err => console.log(err));
// })

// router.delete("/cancel", (res,req))