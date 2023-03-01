"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Product extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.belongsTo(models.ProductUnit);
            this.hasMany(models.LoanProduct);
        }
    }
    Product.init(
        {
            name: DataTypes.STRING,
            code: DataTypes.STRING,
            price: DataTypes.FLOAT,
            credit_precentage: DataTypes.FLOAT,
            discount: DataTypes.FLOAT,
            active: DataTypes.BOOLEAN,
            deleted: DataTypes.BOOLEAN,
            // ProductUnitId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Product",
        }
    );
    return Product;
};
