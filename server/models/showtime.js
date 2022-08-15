const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('showtime', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    startTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    cinemaId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'cinema',
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
    tableName: 'showtime',
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
        name: "FK_movieST",
        using: "BTREE",
        fields: [
          { name: "cinemaId" },
        ]
      },
    ]
  });
};
