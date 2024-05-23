const sequelize = require('../config/sequelizeConfig');
const defineUser = require('./user');
const defineBookClub = require('./bookClub');
const defineBook = require('./book');
const defineReadBooks = require('./readBooks');
const defineJoinedBookClubs = require('./joinedBookClubs');
const defineComment = require('./comment'); 

// Modelleri tanımla
const User = defineUser(sequelize);
const BookClub = defineBookClub(sequelize);
const Book = defineBook(sequelize);
const ReadBooks = defineReadBooks(sequelize);
const JoinedBookClubs = defineJoinedBookClubs(sequelize);
const Comment = defineComment(sequelize); 

// Modeller arasında ilişkileri tanımla
User.associate = (models) => {
  User.hasMany(models.ReadBooks, { foreignKey: 'userId' });
  User.hasMany(models.JoinedBookClubs, { foreignKey: 'userId' });
  User.hasMany(models.Comment, { foreignKey: 'userId' }); 
};

Book.associate = (models) => {
  Book.hasMany(models.ReadBooks, { foreignKey: 'bookId' });
  Book.hasMany(models.Comment, { foreignKey: 'bookId' }); 
};

BookClub.associate = (models) => {
  BookClub.hasMany(models.JoinedBookClubs, { foreignKey: 'bookClubId' });
};

ReadBooks.associate = (models) => {
  ReadBooks.belongsTo(models.User, { foreignKey: 'userId' });
  ReadBooks.belongsTo(models.Book, { foreignKey: 'bookId' });
};

JoinedBookClubs.associate = (models) => {
  JoinedBookClubs.belongsTo(models.User, { foreignKey: 'userId' });
  JoinedBookClubs.belongsTo(models.BookClub, { foreignKey: 'bookClubId' });
};

Comment.associate = (models) => {
  Comment.belongsTo(models.User, { foreignKey: 'userId' });
  Comment.belongsTo(models.Book, { foreignKey: 'bookId' });
};


const db = {
  sequelize,
  User,
  BookClub,
  Book,
  ReadBooks,
  JoinedBookClubs,
  Comment, 
};


Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
