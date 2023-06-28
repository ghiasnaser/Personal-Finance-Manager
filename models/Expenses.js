// Expenses: This table tracks the expenses associated with a specific budget.
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Expenses extends Model {}

Expenses.init(
  {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    budget_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'budget',
          key: 'id',
        },
    },
    transaction_id:{
        type: DataTypes.INTEGER,
        references: {
          model: 'transaction',
          key: 'id',
        },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'expenses',
  }
);

module.exports = Expenses;
