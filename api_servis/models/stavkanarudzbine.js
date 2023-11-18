'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class StavkaNarudzbine extends Model {
    static associate(models) {
      this.belongsTo(models.Proizvod, { foreignKey: 'proizvod_id' });
      this.belongsTo(models.Narudzbina, { foreignKey: 'narudzbina_id' });
    }
  }

  StavkaNarudzbine.init({
    kolicina: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    jedinicna_cena: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    proizvod_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    narudzbina_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'StavkaNarudzbine',
    tableName: 'StavkaNarudzbine'
  });

  return StavkaNarudzbine;
};
