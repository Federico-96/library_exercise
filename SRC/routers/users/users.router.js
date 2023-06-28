const express = require('express');
const router = express.Router();
const usersController = require('./users.controller.js')

// GET ALL users
router.get('/', usersController.getAllUsers)

// GET user byID
router.get('/:ID',usersController.getUsersByID );

// CREATE user
router.post('/', usersController.createUsers);

// UPDATE user by ID
router.put('/:ID', usersController.editUserbyID);

// DELETE user
router.delete('/:ID', usersController.deleteUserByID);


module.exports = router;