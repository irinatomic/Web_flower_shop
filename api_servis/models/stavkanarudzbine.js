'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class StavkaNarudzbine extends Model {
    static associate({ Proizvod, Narudzbina }) {
      this.belongsTo(Proizvod, { foreignKey: 'proizvod_id' });
      this.belongsTo(Narudzbina, { foreignKey: 'narudzbina_id' });
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
    tableName: 'StavkaNarudzbine',
    timestamps: false
  });

  return StavkaNarudzbine;
};
