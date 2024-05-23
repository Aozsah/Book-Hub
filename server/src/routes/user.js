const userControllers = require('../controllers/user');

async function routes(fastify, options) {
  fastify.get('/users', userControllers.getAllUsers);
  fastify.get('/users/:id', userControllers.getUserById); 
  fastify.post('/login', userControllers.login);
  fastify.post('/register', userControllers.register);
  fastify.put('/users/:id/profilePicture', userControllers.updateProfilePicture);
  fastify.put('/users/:id/description', userControllers.updateUserDescription); 
}

module.exports = routes;
