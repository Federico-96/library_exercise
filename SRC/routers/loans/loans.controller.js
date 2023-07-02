// const { json } = require('express');
// const fsProm = require('fs/promises');
// const HttpError = require('../../utils/httpError.js')
// const { v4: uuidv4 } = require('uuid');

import fs from 'node:fs/promises'
import { HttpError } from "../../utils/httpError.js";
import {v4 as uuid} from "uuid";

// GET ALL loans
const getAllLoans = async function(req, res) {
    try {
        const loans = JSON.parse(await fs.readFile(req.dbs.loans, 'utf-8'));
        res.send(loans);
    } catch (err) {
        res.status(404).send(err.message);
    }
}

// GET loan byID
const getLoanByID = async function(req, res) {
    try {
        const loans = JSON.parse(await fs.readFile(req.dbs.loans, 'utf-8'));
        const loanByID = loans.find(l => l.ID === req.params.ID);
        if (!loanByID) {
            throw new HttpError ('loan not found', 404);
        } else {
            res.send(loanByID);
        }
    } catch (err) {
        res.status(404).send(err.message);
    }
}

// CREATE loan
const createLoan = async function (req, res) {
    try {
        const loans = JSON.parse(await fs.readFile(req.dbs.loans, 'utf-8'));
        const books = JSON.parse(await fs.readFile(req.dbs.books, 'utf-8'));
        const users = JSON.parse(await fs.readFile(req.dbs.users, 'utf-8'));
    
        const userExist = users.find(u => u.ID === req.body.userID)
        const bookExist = books.find(b => b.ID === req.body.bookID);
        const checkQty = books.find(b => b.qta_disponibile >= req.body.qta);
        const bookIndex = books.findIndex(b => b.ID === req.body.bookID);
    
        
        if (!bookExist) {
            throw new HttpError (`the book with ID: ${req.body.bookID} not exist`, 404);
        } else if (!userExist) {
            throw new HttpError (`the user with ID: ${req.body.userID} not exist`, 404);
        } else if (checkQty) {
            let updateQtyBook = bookExist.qta_disponibile - req.body.qta;
            const newLoan = { ID: uuid(), ...req.body, start_prestito: new Date().toISOString() };
            loans.push(newLoan);
            books[bookIndex] = {...bookExist, qta_disponibile: updateQtyBook};
            await fs.writeFile(req.dbs.books, JSON.stringify(books));
            await fs.writeFile(req.dbs.loans, JSON.stringify(loans));
            res.send(newLoan);
        } else {
            throw new HttpError ('the quantity request is not available', 400);
        }
        
    } catch (err) {
        res.status(404).send(err.message);
    }
}

// UPDATE loan by ID
const editLoanByID = async function(req, res) {
    try {
        const loans = JSON.parse(await fs.readFile(req.dbs.loans, 'utf-8'));
        const loanByID = loans.find(l => l.ID === req.params.ID);
        if (!loanByID) {
            throw new HttpError ('loan not found', 404);
        } else {
            const loanIndex = loans.findIndex(l => l.ID === req.params.ID);
            let newLoan = {...loanByID, ...req.body};
            loans[loanIndex] = newLoan;
            await fs.writeFile(req.dbs.loans, JSON.stringify(loans));
            res.send(newLoan);
        }
    } catch (err) {
        res.status(404).send(err.message);
    }
}

// DELETE loan
const deleteLoan = async function(req, res) {
    try {
        let loans = JSON.parse(await fs.readFile(req.dbs.loans, 'utf-8'));
        loans = loans.filter(l => l.ID !== req.params.ID);
        await fs.writeFile(req.dbs.loans, JSON.stringify(loans));
        res.send(`the loan with ID:${req.params.ID} was deleted`);
    } catch (err) {
        res.status(404).send(err.message);
    }
}

// UPDATE endLoan
const endLoan = async function(req, res) {
    try {
        const loans = JSON.parse(await fs.readFile(req.dbs.loans, 'utf-8'));
        const books = JSON.parse(await fs.readFile(req.dbs.books, 'utf-8'));
        const users = JSON.parse(await fs.readFile(req.dbs.users, 'utf-8'));
    
        let loanByID = loans.find(l => l.ID === req.params.ID);
        let bookByID = books.find(b => b.ID === req.body.bookID);
        let userByID = users.find(u => u.ID === req.body.userID);

        if (!loanByID) {
            throw new HttpError (`the loan with ID: ${req.params.ID} not exist`, 404);
        } else if (!bookByID) {
            throw new HttpError (`the book with ID: ${req.body.bookID} not exist`, 404);
        } else if (!userByID) {
            throw new HttpError (`the user with ID: ${req.body.usersID} not exist`, 404);
        } else {
            const loanIndex = loans.findIndex(l => l.ID === req.body.ID);
            const bookIndex = books.findIndex(b => b.ID === req.body.bookID);
        
            let newQty = req.body.qta + bookByID.qta_disponibile;
        
            bookByID = {...bookByID, qta_disponibile: newQty};
            loanByID = {...loanByID, ...req.body, endLoan: new Date().toISOString()};
        
            loans[loanIndex] = loanByID;
            books[bookIndex] = bookByID;
        
            await fs.writeFile(req.dbs.loans, JSON.stringify(loans));
            await fs.writeFile(req.dbs.books, JSON.stringify(books));
            res.send(loanByID);
        }
        
    } catch (err) {
        res.status(404).send(err.message);
    }
}   

export {
    getAllLoans,
    getLoanByID,
    createLoan,
    editLoanByID,
    deleteLoan,
    endLoan
};