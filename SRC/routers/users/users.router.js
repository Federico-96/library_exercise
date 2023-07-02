// const express = require('express');
// const router = express.Router();
// const usersController = require('./users.controller.js')

import { router } from "express";
import { getAllUsers, getUsersByID, createUsers, editUserbyID, deleteUserByID } from "./users.controller";

// GET ALL users
router.get('/', getAllUsers)

// GET user byID
router.get('/:ID',getUsersByID );

// CREATE user
router.post('/', createUsers);

// UPDATE user by ID
router.put('/:ID', editUserbyID);

// DELETE user
router.delete('/:ID', deleteUserByID);


export {router};