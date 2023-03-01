"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Transaction extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.belongsTo(models.Loan);
            this.belongsTo(models.Employee);
        }
    }
    Transaction.init(
        {
            emount_price: DataTypes.FLOAT,
            is_prepayment: DataTypes.BOOLEAN,
            type: DataTypes.STRING,
            note: DataTypes.TEXT,
            // LoanId: DataTypes.INTEGER,
            // EmployeeId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Transaction",
        }
    );
    return Transaction;
};
