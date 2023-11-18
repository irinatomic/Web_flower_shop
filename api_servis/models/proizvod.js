'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class Proizvod extends Model {
    static associate({Kategorija, Cvet, StavkaNarudzbine}) {
      this.belongsTo(Kategorija, {foreignKey: "kategorija_id", as: "kategorija"});
      this.hasMany(StavkaNarudzbine, {foreignKey: "jelo_id", as: "stavke"});
      this.belongsToMany(Cvet, {through: "CvetUProizvodu", foreignKey: "proizvod_id", as: "cvetovi"});
    }
  }

  Proizvod.init({
    naziv: {
      type: DataTypes.STRING(75),
      unique: true,
  	  allowNull: false
    },
    opis: {
      type: DataTypes.STRING(255),
      allowNull: false
    
    },
    cena: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    kategorija_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Proizvod',
    tableName: 'Proizvod'
  });

  return Proizvod;
};