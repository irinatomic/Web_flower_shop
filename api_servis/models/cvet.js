'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class Cvet extends Model {
    static associate(models) {
      this.hasMany(models.CvetUProizvodu, { foreignKey: 'cvet_id' });
    }
  }

  Cvet.init({
    naziv: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Cvet',
    tableName: 'Cvet'

  });

  return Cvet;
};
