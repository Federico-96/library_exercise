// const express = require('express');
// const router = express.Router();
// const authorsController = require('./authors.controller.js');

import { router } from "express";
import { getAllAuthors, getAuthorByID, createAuthors, editAuthorByID, deleteAuthorByID } from "./authors.controller.js"

// CREATE authors
router.post('/', createAuthors);
// router.put('/endprestito/:ID', );

// GET ALL authors
router.get('/', getAllAuthors);

// GET authors by ID
router.get('/:ID', getAuthorByID);

// UPDATE authors by ID
router.put('/:ID', editAuthorByID);

// DELETE authors by ID
router.delete('/:ID', deleteAuthorByID);

module.exports = router;