const express = require('express');
const router = express.Router();
const authorsController = require('./authors.controller.js');

// CREATE authors
router.post('/', authorsController.createAuthors);
// router.put('/endprestito/:ID', );

// GET ALL authors
router.get('/', authorsController.getAllAuthors);

// GET authors by ID
router.get('/:ID', authorsController.getAuthorByID);

// UPDATE authors by ID
router.put('/:ID', authorsController.editAuthorByID);

// DELETE authors by ID
router.delete('/:ID', authorsController.deleteAuthorByID);

module.exports = router;