'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class Narudzbina extends Model {
    static associate({ StavkaNarudzbine }) {
      this.hasMany(StavkaNarudzbine, { foreignKey: 'narudzbina_id', as: 'stavke' });
    }
  }

  Narudzbina.init({
    zakazano_vreme: {
      type: DataTypes.DATE,
      allowNull: false
    },
    status_narudzbine: {
      type: DataTypes.STRING,
      allowNull: false
    },
    adresa: {
      type: DataTypes.STRING,
      allowNull: false
    },
    telefon: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ime_prezime: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Narudzbina',
    tableName: 'Narudzbina',
    timestamps: false
  });

  return Narudzbina;
};
