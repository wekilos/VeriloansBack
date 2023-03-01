"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class EmployeeStatus extends Model {
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
    EmployeeStatus.init(
        {
            title: DataTypes.STRING,
            active: DataTypes.BOOLEAN,
            deleted: DataTypes.BOOLEAN,
        },
        {
            sequelize,
            modelName: "EmployeeStatus",
        }
    );
    return EmployeeStatus;
};
