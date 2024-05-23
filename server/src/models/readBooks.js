const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const ReadBooks = sequelize.define('ReadBooks', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users', 
        key: 'id',
      },
    },
    bookId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'books', 
        key: 'id',
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'createdat',
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updatedat',
    },
  }, {
    tableName: 'readBooks',
    timestamps: true,
  });

  ReadBooks.associate = (models) => {
    ReadBooks.belongsTo(models.User, { foreignKey: 'userId' });
    ReadBooks.belongsTo(models.Book, { foreignKey: 'bookId' });
  };

  return ReadBooks;
};
