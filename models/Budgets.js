//Budgets: This table stores information about the monthly budgets set by users.
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Budget extends Model {}

Budget.init(
{
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    start_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    end_date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    },
    amount: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
        model: 'user',
        key: 'id',
        },
    },
},
{
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'budget',
}
);

module.exports = Budget;
