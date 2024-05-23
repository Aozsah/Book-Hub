const joinedBookClubsController = require('../controllers/joinedBookClubs');

async function routes(fastify, options) {
  fastify.post('/joined-bookclubs', joinedBookClubsController.addJoinedBookClub);
  fastify.get('/users/:userId/joined-bookclubs', joinedBookClubsController.getJoinedBookClubsByUser);
  fastify.get('/bookclubs/:bookClubId/joined-users', joinedBookClubsController.getJoinedUsersByBookClub);
};
module.exports = routes;
