const express = require("express");
const router = express.Router();
const {User} = require("../../models/User");
const Collection = require('../../models/Collection');


router.get("/test", (req, res) => res.json({ msg: "This is the collections route" }));

router.post("/new", async (req,res) => {
    try {
        let collection = new Collection();
        collection.donorId = req.body["donorId"]
        collection.books = req.body["books"];
        await collection.save();
        return res.json((collection))
    } catch (err) {
        return res.sendStatus(400)
    }
})

router.get("/:id/index", (req,res) => {
    Collection.find({donorId: req.params.id})
    .then(collections => {
        if (collections) {
            return res.json(collections);
        } else {
            return res.status(404).json({notfound: "No Collections Found for User"})
        }
    })
})

router.get("/:id", (req,res) => {
    Collection.find({_id: req.params.id})
    .then(collection => {
        if (collection) {
            return res.json(collection)
        } else {
            return res.status(404).json({notfound: "Collection Not Found"})
        }
    }) 
    .catch(err => res.json(err))
})

router.put('/:id', (req,res) => {
    console.log(req.body)
    Collection.findById(req.params.id, (err, collection) => {
        collection.status = req.body.status;
        collection.books = req.body.books;
        collection.points = req.body.points;
        collection.save().then(() => {
            return res.json(collection);
        })
        .catch(err => res.status(400).json(err));
    })
})

router.delete('/:id', (req,res) => {
    Collection.findByIdAndDelete(req.params.id)
    .then(() => res.json("Collection Removed"))
    .catch(err => res.json(err));
})


module.exports = router