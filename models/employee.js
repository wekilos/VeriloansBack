"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Employee extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ EmployeeStatus, Store, Transaction }) {
            // define association here
            this.belongsTo(EmployeeStatus);
            this.belongsTo(Store);
            this.hasMany(Transaction);
        }
    }
    Employee.init(
        {
            password: DataTypes.STRING,
            username: DataTypes.STRING,
            firstname: DataTypes.STRING,
            phone: DataTypes.BIGINT,
            active: DataTypes.BOOLEAN,
            deleted: DataTypes.BOOLEAN,
            // EmployeeStatusId: DataTypes.INTEGER,
            // StoreId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Employee",
        }
    );
    return Employee;
};
