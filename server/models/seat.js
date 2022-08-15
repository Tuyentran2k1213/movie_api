const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('seat', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    type: {
      type: DataTypes.STRING(115),
      allowNull: true
    },
    showtimeId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'showtime',
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
    tableName: 'seat',
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
        name: "FK_showtimeSeat",
        using: "BTREE",
        fields: [
          { name: "showtimeId" },
        ]
      },
    ]
  });
};
