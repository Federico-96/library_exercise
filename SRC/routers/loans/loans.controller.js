const { json } = require('express');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

// GET ALL loans
const getAllLoans = function(req, res) {
    const loans = JSON.parse(fs.readFileSync(req.dbs.loans, 'utf-8'));
    res.send(loans);
}

// GET loan byID
const getLoanByID = function(req, res) {
    const loans = JSON.parse(fs.readFileSync(req.dbs.loans, 'utf-8'));
    loanByID = loans.find(l => l.ID === req.params.ID);
    res.send(loanByID);
}

// CREATE loan
const createLoan = function (req, res) {
    const loans = JSON.parse(fs.readFileSync(req.dbs.loans, 'utf-8'));
    const books = JSON.parse(fs.readFileSync(req.dbs.books, 'utf-8'));

    const bookExist = books.find(b => b.ID === req.body.bookID);
    const checkQty = books.find(b => b.qta_disponibile >= req.body.qta);
    const bookIndex = books.findIndex(b => b.ID === req.body.bookID);

    let updateQtyBook = bookExist.qta_disponibile - req.body.qta;

    if (!bookExist) {
        res.send(`the book with ID:${books.ID} not exist`);
    } else if (checkQty) {
        newLoan = { ID: uuidv4(), ...req.body };
        loans.push(newLoan);
        books[bookIndex] = {...bookExist, qta_disponibile: updateQtyBook.toString()};
        fs.writeFileSync(req.dbs.books, JSON.stringify(books));
        fs.writeFileSync(req.dbs.loans, JSON.stringify(loans));
        res.send(newLoan);
    } else {
        res.send('the quantity request is not available');
    }
}

// UPDATE loan by ID
const editLoanByID = function(req, res) {
    const loans = JSON.parse(fs.readFileSync(req.dbs.loans, 'utf-8'));
    const loanByID = loans.find(l => l.ID === req.params.ID);
    const loanIndex = loans.findIndex(l => l.ID === req.params.ID);
    let newLoan = {...loanByID, ...req.body};
    loans[loanIndex] = newLoan;
    fs.writeFileSync(req.dbs.loans, JSON.stringify(loans));
    res.send(newLoan);
}

// DELETE loan
const deleteLoan = function(req, res) {
    let loans = JSON.parse(fs.readFileSync(req.dbs.loans, 'utf-8'));
    loans = loans.filter(l => l.ID !== req.params.ID);
    fs.writeFileSync(req.dbs.loans, JSON.stringify(loans));
    res.send(`the loan with ID:${req.params.ID} was deleted`);
}

// UPDATE endLoan
const endLoan = function(req, res) {
    const loans = JSON.parse(fs.readFileSync(req.dbs.loans, 'utf-8'));
    const books = JSON.parse(fs.readFileSync(req.dbs.books, 'utf-8'));

    let loanByID = loans.find(l => l.ID === req.body.ID);
    let bookByID = books.find(b => b.ID === req.body.bookID);

    const loanIndex = loans.findIndex(l => l.ID === req.body.ID);
    const bookIndex = books.findIndex(b => b.ID === req.body.bookID);

    let newQty = req.body.qta + bookByID.qta_disponibile;

    bookByID = {...bookByID, qta_disponibile: newQty.toString()};
    loanByID = {...loanByID, ...req.body};

    loans[loanIndex] = loanByID;
    books[bookIndex] = bookByID;

    fs.writeFileSync(req.dbs.loans, JSON.stringify(loans));
    fs.writeFileSync(req.dbs.books, JSON.stringify(books));
    res.send(loanByID);
}   

module.exports = {
    getAllLoans,
    getLoanByID,
    createLoan,
    editLoanByID,
    deleteLoan,
    endLoan
}