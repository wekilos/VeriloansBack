"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Loan extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.belongsTo(models.Store);
            this.belongsTo(models.Employee);
            this.belongsTo(models.Custumer);
            this.hasMany(models.LoanProduct);
            this.hasMany(models.Note);
            this.hasMany(models.Transaction);
        }
    }
    Loan.init(
        {
            code: DataTypes.STRING,
            discount: DataTypes.FLOAT,
            total: DataTypes.FLOAT,
            amount_price: DataTypes.FLOAT,
            amount_price_month: DataTypes.FLOAT,
            credit_month: DataTypes.INTEGER,
            check_numbers: DataTypes.TEXT,
            check_numbers_price: DataTypes.TEXT,
            is_draft: DataTypes.BOOLEAN,
            is_closed: DataTypes.BOOLEAN,
            // StoreId: DataTypes.INTEGER,
            // EmployeeId: DataTypes.INTEGER,
            // CustumerId: DataTypes.INTEGER,
            active: DataTypes.BOOLEAN,
            deleted: DataTypes.BOOLEAN,
        },
        {
            sequelize,
            modelName: "Loan",
        }
    );
    return Loan;
};
