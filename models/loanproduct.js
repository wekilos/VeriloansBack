"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class LoanProduct extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.belongsTo(models.Product);
            this.belongsTo(models.Loan);
        }
    }
    LoanProduct.init(
        {
            quantity: DataTypes.FLOAT,
            summary: DataTypes.FLOAT,
            // ProductId: DataTypes.INTEGER,
            // LoanId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "LoanProduct",
        }
    );
    return LoanProduct;
};
