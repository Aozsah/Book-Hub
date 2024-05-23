const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const BookClub = sequelize.define('BookClub', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    bookclubimg: { 
      type: DataTypes.STRING,
      allowNull: true,
    },
    meetinglink: { 
      type: DataTypes.STRING,
      allowNull: true,
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
    tableName: 'bookclubs',
    timestamps: true,
  });

  return BookClub;
};
