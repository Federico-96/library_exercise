const express = require('express');
const router = express.Router();

const booksController = require('./books.controller.js');

// GET ALL books
router.get('/', booksController.getAllbooks);

// GET book byID
router.get('/:ID', booksController.getBookByID);

// CREATE book
router.post('/', booksController.createBooks);

// UPDATE book by ID
router.put('/:ID', booksController.editBookByID);

// DELETE book
router.delete('/:ID', booksController.deleteBookByID);

module.exports = router;