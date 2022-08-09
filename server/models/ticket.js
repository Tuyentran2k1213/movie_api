const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ticket', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'user',
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
    cinemaId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'cinema',
        key: 'id'
      }
    },
    seatId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'seat',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'ticket',
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
        name: "FK_ticketUser",
        using: "BTREE",
        fields: [
          { name: "userId" },
        ]
      },
      {
        name: "FK_ticketMovie",
        using: "BTREE",
        fields: [
          { name: "movieId" },
        ]
      },
      {
        name: "FK_ticketCinema",
        using: "BTREE",
        fields: [
          { name: "cinemaId" },
        ]
      },
      {
        name: "FK_ticketSeat",
        using: "BTREE",
        fields: [
          { name: "seatId" },
        ]
      },
    ]
  });
};
