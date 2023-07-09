//Accounts: This table stores information about the bank accounts connected by users.
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Account extends Model {}

Account.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    account_id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    available: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    current: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    iso_currency_code: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    limit: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    unofficial_currency_code: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mask: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    official_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    balance: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    item_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'item',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'account',
    hooks: {
      beforeBulkCreate: async (accounts) => {
        const newAccounts = [];
        for (const account of accounts) {
          account.balance = account.available || account.current || 0;
          newAccounts.push(account);
        }
        return newAccounts;
      },
      beforeCreate: async (account) => {
        account.balance = account.available || account.current || 0;
        return account;
      },
    },
  }
);

module.exports = Account;
