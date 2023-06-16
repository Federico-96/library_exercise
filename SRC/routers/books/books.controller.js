const { json } = require('express');
const fs = require('fs');
const fsProm = require('fs/promises');
const{ v4: uuidv4 } = require('uuid');

// GET ALL books
const getAllbooks = async function(req, res) {
    try {
        const books = await fsProm.readFile(req.dbs.books, 'utf-8')
        res.send(JSON.parse(books))
    } catch (err) {
        res.status(404).send(err.message);
    }
    // const books = JSON.parse(fs.readFileSync(req.dbs.books, 'utf-8'));
    // res.send(books);
    // res.status(404).send(new Error('resource not found'))
}

// GET book byID
const getBookByID = async function(req, res) {
    try {
        const books = JSON.parse(await fsProm.readFile(req.dbs.books, 'utf-8'));
        const bookByID = books.find(b => b.ID === req.params.ID);
        res.send(bookByID);
    } catch (err) {
        res.status(404).send(err.message)
    }
}

// CREATE book
const createBooks = function (req, res) {
    const authors = JSON.parse(fs.readFileSync(req.dbs.authors, 'utf-8'));
    const books = JSON.parse(fs.readFileSync(req.dbs.books, 'utf-8'));

    if (!!authors.find(a => a.ID === req.body.author)) {
        const newBook = { ...req.body, ID: uuidv4()};
        books.push(newBook);
        fs.writeFileSync(req.dbs.books, JSON.stringify(books));
        res.send(newBook);
    } else {
        res.status(404).send('author not found');
    }
}

// UPDATE book by ID
const editBookByID = function(req, res) {
    const books = JSON.parse(fs.readFileSync(req.dbs.books, 'utf-8'));
    let bookByID = books.find(b => b.ID === req.params.ID);
    const bookIndex = books.findIndex(b => b.ID === req.params.ID);
    bookByID = {...bookByID, ...req.body};
    books[bookIndex] = bookByID;
    fs.writeFileSync(req.dbs.books, JSON.stringify(books));
    res.send(bookByID);
}

// DELETE book
const deleteBookByID = function(req, res) {
    let books = JSON.parse(fs.readFileSync(req.dbs.books, 'utf-8'));
    books = books.filter(b => b.ID !== req.params.ID);
    fs.writeFileSync(req.dbs.books, JSON.stringify(books));
    res.send(`The book with ID:${req.params.ID} was deleted`);
}

module.exports = {
    getAllbooks, 
    getBookByID, 
    createBooks,
    editBookByID, 
    deleteBookByID
}