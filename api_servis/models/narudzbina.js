'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class Narudzbina extends Model {
    static associate({ StavkaNarudzbine, Korisnik }) {
      this.hasMany(StavkaNarudzbine, { foreignKey: 'narudzbina_id', as: 'stavke' });
      this.belongsTo(Korisnik, { foreignKey: 'korisnik_id' });
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
    korisnik_id: {
      type: DataTypes.INTEGER,
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
