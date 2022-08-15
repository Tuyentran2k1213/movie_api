const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('cinema_movie', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    cinemaId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'cinema',
        key: 'id'
      }
    },
    movieId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'movie',
        key: 'id'
      }
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'cinema_movie',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "FK_cinema",
        using: "BTREE",
        fields: [
          { name: "cinemaId" },
        ]
      },
      {
        name: "FK_movie",
        using: "BTREE",
        fields: [
          { name: "movieId" },
        ]
      },
    ]
  });
};
