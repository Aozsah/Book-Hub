const bookControllers = require('../controllers/book');

async function routes(fastify, options) {
  fastify.get('/books', bookControllers.getAllBooks);
  fastify.post('/bookadd', bookControllers.createBook);
  fastify.get('/book/:id', bookControllers.getBookById);
  fastify.delete('/book/:id', bookControllers.deleteBook);
  
}

module.exports = routes;
