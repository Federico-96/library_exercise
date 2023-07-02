// const express = require('express');
// const router = express.Router();
// const booksController = require('./books.controller.js');

import { router } from "express";
import { getAllbooks, getBookByID, createBooks, editBookByID, deleteBookByID } from "./books.controller.js"

// GET ALL books
router.get('/', getAllbooks);

// GET book byID
router.get('/:ID', getBookByID);

// CREATE book
router.post('/', createBooks);

// UPDATE book by ID
router.put('/:ID', editBookByID);

// DELETE book
router.delete('/:ID', deleteBookByID);

export {router};