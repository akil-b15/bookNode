const express = require('express');
const mongoose = require('mongoose');
const Book = require('./models/book');

const app = express();

const dbURI = 'mongodb+srv://Akil:Akil123@cluster0.qulfq.mongodb.net/book-db?retryWrites=true&w=majority';
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));


app.set('view engine', 'ejs');


app.get('/add-book', (req, res) => {
    const book = new Book({
      name: 'Book 1',
      publisher: 'Akil Publications',
      author: 'Akil Ahmed'
    })
  
    book.save()
      .then(result => {
        res.send(result);
      })
      .catch(err => {
        console.log(err);
      });
  });