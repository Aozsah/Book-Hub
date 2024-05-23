const commentController = require('../controllers/comment');

async function routes(fastify, options) {
  fastify.post('/comments/:bookId', commentController.addComment);
  fastify.get('/books/:bookId/comments', commentController.getCommentsByBook);
}

module.exports = routes;
