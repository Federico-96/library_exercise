const { json } = require('express');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

// CREATE author
const createAuthors = function(req, res){
    const authors = JSON.parse(fs.readFileSync(req.dbs.authors));

    if(!!authors.find(a => a.email === req.body.email))  res.status(400).send('email already eist');
    
    ID = uuidv4();
    const newAuthor = {...req.body, ID};
    authors.push(newAuthor);
    fs.writeFileSync(req.dbs.authors, JSON.stringify(authors));
    res.send(newAuthor);
}

// GET ALL authors
const getAllAuthors = function(req, res) {
    const authors = JSON.parse(fs.readFileSync(req.dbs.authors, 'utf-8'));
    res.send(authors);
}

// GET author by ID
const getAuthorByID = function(req, res) {
    const authors = JSON.parse(fs.readFileSync(req.dbs.authors, 'utf-8'));
    res.json(authors.find(u => u.ID === req.params.ID));
}


// UPDATE authors by ID
const editAuthorByID = function(req, res) {
    const authors = JSON.parse(fs.readFileSync(req.dbs.authors, 'utf-8'));
    let authorID = authors.find(u => u.ID === req.params.ID);
    authorID = {...authorID, ...req.body};
    let authorIndex = authors.findIndex((u => u.ID == authorID.ID))
    authors[authorIndex] = authorID;
    fs.writeFileSync(req.dbs.authors, JSON.stringify(authors));
    res.send(authors[authorIndex]);
}

// DELETE authors by ID
const deleteAuthorByID = function(req, res) {
    let authors = JSON.parse(fs.readFileSync(req.dbs.authors, 'utf-8'));
    authors = authors.filter(u => u.ID !== req.params.ID);
    fs.writeFileSync(req.dbs.authors, JSON.stringify(authors))
    res.send(`the Author with ID:${req.params.ID} was deleted`)
}

module.exports = {
    getAllAuthors,
    getAuthorByID,
    createAuthors,
    editAuthorByID,
    deleteAuthorByID
}