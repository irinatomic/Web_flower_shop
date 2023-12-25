'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class Korisnik extends Model {
    static associate({ Narudzbina }) {
      this.hasMany(Narudzbina, { foreignKey: 'korisnik_id', as: 'narudzbine' })
    }
  }

  Korisnik.init({
    ime: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    lozinka: {
      type: DataTypes.STRING,
      allowNull: false
    },
    admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: "Not an email address"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Korisnik',
    tableName: 'Korisnik',
    timestamps: false
  });

  return Korisnik;
};