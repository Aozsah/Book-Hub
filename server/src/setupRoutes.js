const userRoutes = require("./routes/user");
const bookClubRoutes = require("./routes/bookClub");
const bookRoutes = require("./routes/book");

function setupRoutes(fastify) {
  [userRoutes, bookClubRoutes, bookRoutes].forEach(routes => {
    routes.forEach(route => {
      fastify.route(route);
    });
  });
}

module.exports = setupRoutes;
