const { name } = require('ejs');
const express = require('express');
const mongoose = require('mongoose');
const Book = require('./models/book');

const app = express();

const dbURI = 'mongodb+srv://Akil:Akil123@cluster0.qulfq.mongodb.net/book-db?retryWrites=true&w=majority';
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');


app.get('/books/create', (req, res) => {
    res.render('create', { title: 'Create a new book' });
  });

  app.get('/books', (req, res) => {
    Book.find().sort({ createdAt: -1 })
      .then(result => {
        res.render('index', { books: result});
      })
      .catch(err => {
        console.log(err);
      });
  });

  app.post('/books', (req, res) => {
      const book = new Book(req.body);

      book.save().then((result)=>{
        res.redirect('/books');
      }).catch((err) => {
        console.log(err);
      });
  });

  app.delete('/books/:id', (req, res) => {
    const id = req.params.id;
    
    Book.findByIdAndDelete(id)
      .then(result => {
        res.json({ redirect: '/books' });
      })
      .catch(err => {
        console.log(err);
      });
  });


  app.patch('/books/:id', async(req, res) => {
    try{
      const book = await Book.findById(req.params.id);
      book.name = "name updated";
      const a1 = await book.save();
      res.json({ redirect: '/books' });
    }catch(err){
      res.send('error')
    }
    
  })

