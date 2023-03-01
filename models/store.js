"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Store extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ Employee }) {
            // define association here
            this.hasMany(Employee);
        }
    }
    Store.init(
        {
            title: DataTypes.STRING,
            code: DataTypes.STRING,
            address: DataTypes.TEXT,
            phone: DataTypes.INTEGER,
            active: DataTypes.BOOLEAN,
            deleted: DataTypes.BOOLEAN,
        },
        {
            sequelize,
            modelName: "Store",
        }
    );
    return Store;
};
