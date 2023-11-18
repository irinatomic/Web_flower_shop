'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class CvetUProizvodu extends Model {
    static associate({ Proizvod, Cvet }) {
      this.belongsTo(Proizvod, { foreignKey: 'proizvod_id' });
      this.belongsTo(Cvet, { foreignKey: 'cvet_id' });
    }
  }

  CvetUProizvodu.init({
    kolicina: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cvet_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    proizvod_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'CvetUProizvodu',
    tableName: 'CvetUProizvodu'
  });

  return CvetUProizvodu;
};
