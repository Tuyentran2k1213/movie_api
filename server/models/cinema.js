const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('cinema', {
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
    address: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    image: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    cineplexId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'cineplex',
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
    tableName: 'cinema',
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
        name: "FK_cineplex",
        using: "BTREE",
        fields: [
          { name: "cineplexId" },
        ]
      },
    ]
  });
};
