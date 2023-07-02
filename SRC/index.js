// const express = require('express');
// const usersRouters = require('./routers/users/users.router.js');
// const authorsRouters = require('./routers/authors/authors.router.js');
// const booksRouters = require('./routers/books/books.router.js')
// const loansRouters = require('./routers/loans/loans.router.js')

import {express} from 'express';
import {usersRouters} from './routers/users/users.router.js';
import {authorsRouters} from './routers/authors/authors.router.js';
import {booksRouters} from './routers/books/books.router.js';
import {loansRouters} from './routers/loans/loans.router.js';
import {utilsMiddleware} from './middleware/utils.middleware.js';

const server = express();

server.use(express.json());
server.use(utilsMiddleware());


server.use('/users', usersRouters);
server.use('/authors', authorsRouters);
server.use('/books', booksRouters);
server.use('/loans', loansRouters);



const PORT = 3000;
server.listen(PORT, () => {
    console.log(`server listen on address: http://localhost:${PORT}`)
});

/**
 * CRUD
 * 
 * C= Create= POST
 * R= Read= GET (GetAll & GetByID)
 * U= Update= PUT
 * D= Delete= DELETE
 * 
 */


/**
 *  calcolare l'end Date da backend e salvarla in formato utc. Utilizza o la classe Date di JS o la libreria moment.
 */



