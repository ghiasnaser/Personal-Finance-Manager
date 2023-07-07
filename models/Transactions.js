//Transactions: This table stores details about individual financial transactions.
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Transaction extends Model {}

Transaction.init(
  {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    description:{
        type: DataTypes.STRING,
        allowNull:true,
    },
    merchant:{
        type: DataTypes.STRING,
        allowNull:true,
    },
    account_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'account',
          key: 'id',
        },
    },
    category_id:{
        type: DataTypes.INTEGER,
        references: {
          model: 'category',
          key: 'id',
        },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'transaction',
  }
);

module.exports = Transaction;
