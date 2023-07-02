// const { json } = require('express');
// const fs = require('fs');
// const fsProm = require('fs/promises');
// const { v4: uuidv4 } = require('uuid');
// const HttpError = require('../../utils/httpError.js')

import {fsProm} from "fs/promises";
import { HttpError } from "../../utils/httpError";
import { uuid } from 'uuidv4';

// CREATE author
const createAuthors = async function(req, res){
    try {
        const authors = JSON.parse(await fsProm.readFile(req.dbs.authors, 'utf-8'));

        // if(!!authors.find(a => a.email === req.body.email))  res.status(400).send('email already eist');
        if(!!authors.find(a => a.email === req.body.email))  throw new HttpError('email already eist', 500);
        
        ID = uuid();
        const newAuthor = {...req.body, ID};
        authors.push(newAuthor);
        await fsProm.writeFile(req.dbs.authors, JSON.stringify(authors));
        res.send(newAuthor);
    } catch (err) {
        res.status(err.statusCode).send(err.message)
    }

}

// GET ALL authors
const getAllAuthors = async function(req, res) {
        try {
           const authorsString = await fsProm.readFile(req.dbs.authors, 'utf-8')
           res.send(JSON.parse(authorsString))
        } catch (err) {
            res.status(404).send(err.message);
        }

}

// GET author by ID
const getAuthorByID = async function(req, res) {
    try {
        const authors = JSON.parse(await fsProm.readFile(req.dbs.authors, 'utf-8'));
        res.json(authors.find(u => u.ID === req.params.ID));
    } catch (error) {
        res.status(404).send(error.message);
    }
}


// UPDATE authors by ID
const editAuthorByID = async function(req, res) {

    try {
        const authors = JSON.parse(await fsProm.readFile(req.dbs.authors, 'utf-8'));
        let authorID = authors.find(u => u.ID === req.params.ID);
        authorID = {...authorID, ...req.body};
        let authorIndex = authors.findIndex((u => u.ID == authorID.ID))
        authors[authorIndex] = authorID;
        await fsProm.writeFile(req.dbs.authors, JSON.stringify(authors));
        res.send(authors[authorIndex]);
    } catch (error) {
        res.status(404).send(error.message);
    }
}

// DELETE authors by ID
const deleteAuthorByID = async function(req, res) {
    try {
        let authors = JSON.parse(await fsProm.readFile(req.dbs.authors, 'utf-8'));
        authors = authors.filter(u => u.ID !== req.params.ID);
        await fs.writeFileSync(req.dbs.authors, JSON.stringify(authors))
        res.send(`the Author with ID:${req.params.ID} was deleted`)
    } catch (error) {
        res.status(404).send(error.message);
    }
}

export {
    getAllAuthors,
    getAuthorByID,
    createAuthors,
    editAuthorByID,
    deleteAuthorByID
};