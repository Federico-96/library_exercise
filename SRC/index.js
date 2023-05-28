const express = require('express');
const server = express();
const usersRouters = require('./routers/users/users.router.js');
const authorsRouters = require('./routers/authors/authors.router.js');
const booksRouters = require('./routers/books/books.router.js')
const loansRouters = require('./routers/loans/loans.router.js')

server.use(express.json());
server.use(require('./middleware/utils.middleware.js'));


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
 * all'inserimento di uno user o autore controlla se esiste già con la stessa mail
 * 
 * all'inserimento di un nuovo libbro dovrai controllare se l'autore esiste, altrimenti rispondi 404 author not found
 * 
 * parte prestito
 * controllare se la qta del prestito è disponibile, se non disponibile rispondere errore 400 <inventati un messagio in inglese>
 * 
 * il fine prestito sarà un endpoint dedicata, /endPrestito, che setterà :
 *         1) endPrestito con la data del fine prestito 
 *         2) ripristinerà qta_disponibile
 */