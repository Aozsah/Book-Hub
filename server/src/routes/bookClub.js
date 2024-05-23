const bookClubControllers = require('../controllers/bookClub');

async function routes(fastify, options) {
  fastify.get('/bookclubs', bookClubControllers.getAllBookClubs);
  fastify.post('/bookclubadd', bookClubControllers.createBookClub);
  fastify.get('/bookclub/:id', bookClubControllers.getBookClubById);
  fastify.delete('/bookclub/:id', bookClubControllers.deleteBookClub);
  fastify.put('/bookclub/:id', bookClubControllers.updateBookClub); 
}

module.exports = routes;
