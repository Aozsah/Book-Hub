const readBooksController = require('../controllers/readBooks');

async function routes(fastify, options) {
  fastify.get('/users/:userId/read-books', readBooksController.getReadBooksByUser);
  fastify.post('/read-books', readBooksController.addReadBook);
  fastify.get('/books/:bookId/users', readBooksController.getUsersByBookId); 
}

module.exports = routes;
