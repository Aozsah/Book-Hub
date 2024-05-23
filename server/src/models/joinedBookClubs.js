const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const JoinedBookClubs = sequelize.define('JoinedBookClubs', {
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
    bookClubId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'bookClubs',
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
    tableName: 'joinedBookClubs',
    timestamps: true,
  });

  JoinedBookClubs.associate = (models) => {
    JoinedBookClubs.belongsTo(models.User, { foreignKey: 'userId' });
    JoinedBookClubs.belongsTo(models.BookClub, { foreignKey: 'bookClubId' });
  };

  return JoinedBookClubs;
};
