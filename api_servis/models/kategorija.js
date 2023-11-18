'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class Kategorija extends Model {
    static associate({Proizvod}) {
      this.hasMany(Proizvod, {foreignKey: 'kategorija_id'});
    }
  }

  Kategorija.init({
    naziv: {
      type: DataTypes.STRING(75),
      unique: true,
  	  allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Kategorija',
    tableName: 'Kategorija'
  });

  return Kategorija;
};