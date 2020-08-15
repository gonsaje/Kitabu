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
    // console.log(req.body)
    let user = await User.findById(req.body.donorId)
    if (user) { 
        user.points += 1
        await user.save()
    } else res.sendStatus(404)
    
  } catch (error) {
    // console.log(error)
    return res.sendStatus(400)
  }
});

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

router.patch("/:id", (req,res) => {
    let book = Book.findById(req.params.id)
    if (book) {
        book.title = req.body.title;
        book.authors = req.body.authors;
        book.ISBN = req.body.ISBN;

        book.save()
        .then(() => res.json("Book Updated"))
        .catch(err => res.status(400).json(err))
    } else {
        return res.status(404).json({notfound: "Book Not Found"})
    }

});

router.delete("/:id", (req,res) => {
    Book.findByIdAndDelete(req.params.id)
    .then(() => res.json("Book Removed"))
    .catch(err => res.json(err));
})

module.exports = router;