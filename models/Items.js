const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection'); // Replace with your Sequelize instance

class Item extends Model {}

Item.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    access_token: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    item_id: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,

    },
    institution_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    institution_name: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'item',
  }
);

module.exports = Item;
