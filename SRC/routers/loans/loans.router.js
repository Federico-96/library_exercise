const express = require('express'); 
const router = express.Router();
const loansController = require('./loans.controller');

// GET ALL loans
router.get('/', loansController.getAllLoans);

// GET loan byID
router.get('/:ID', loansController.getLoanByID),

// CREATE loan
router.post('/', loansController.createLoan);

// UPDATE loan by ID
router.put('/:ID', loansController.editLoanByID);

// DELETE loan
router.delete('/:ID', loansController.deleteLoan);

// UPDATE endLoan
router.put('/endloan/:ID', loansController.endLoan);

module.exports = router;