// const express = require('express'); 
// const router = express.Router();
// const loansController = require('./loans.controller');

import { router } from "express";
import { getAllLoans, getLoanByID, createLoan, editLoanByID, deleteLoan, endLoan } from "./loans.controller.js";

// GET ALL loans
router.get('/', getAllLoans);

// GET loan byID
router.get('/:ID', getLoanByID),

// CREATE loan
router.post('/', createLoan);

// UPDATE loan by ID
router.put('/:ID', editLoanByID);

// DELETE loan
router.delete('/:ID', deleteLoan);

// UPDATE endLoan
router.put('/endloan/:ID', endLoan);

export {router};