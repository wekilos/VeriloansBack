'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Custumer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Custumer.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    patronymic: DataTypes.STRING,
    passport_id: DataTypes.STRING,
    passport_created_date: DataTypes.DATE,
    birthday: DataTypes.DATE,
    age: DataTypes.INTEGER,
    country: DataTypes.STRING,
    limit: DataTypes.INTEGER,
    type: DataTypes.STRING,
    phone: DataTypes.BIGINT,
    phone2: DataTypes.BIGINT,
    phone3: DataTypes.BIGINT,
    notes: DataTypes.TEXT,
    file: DataTypes.STRING,
    file2: DataTypes.STRING,
    file3: DataTypes.STRING,
    in_blacklist: DataTypes.BOOLEAN,
    registration: DataTypes.TEXT,
    registration2: DataTypes.TEXT,
    work_place: DataTypes.TEXT,
    active: DataTypes.BOOLEAN,
    deleted: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Custumer',
  });
  return Custumer;
};