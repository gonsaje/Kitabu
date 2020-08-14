const express = require("express");
const router = express.Router();
const Book = require('../../models/Book');
const User = require("../../models/User");

router.post('/new', async (req,res) => {
  //subject to change
  try { 
    let book = new Book ({
        title: req.body.title,
        author: req.body.author,
        ISBN: req.body.ISBN,
        image: req.body.image,     
        donorId: req.body.donorId
    })
    await book.save()
    console.log(req.body)
    let user = await User.findById(req.body.donorId)
    if (user) { 
        user.points += 1
        await user.save()
    } else res.sendStatus(404)
    return res.json(book)
    
  } catch (error) {
    console.log(error)
    return res.sendStatus(500)
  }

    // User.findById({id: req.body.donorId})
    // .then(user =>{
    //     user.points += 1;
    //     user.update();

    // })

    // book.save().then( () => {
    //     return res.json(book);
    // })
})

router.get("/index", (req,res) => {
    Book.find({ donorId: req.query.donorId })
    .then(books => {
      if (books) {
        return res.json(books);
      } else {
        return res.status(404).json({ notfound: "No Books Found for User" })
      }
    })
})

module.exports = router;