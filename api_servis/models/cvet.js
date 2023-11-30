'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class Cvet extends Model {
    static associate({ CvetUProizvodu }) {
      this.hasMany(CvetUProizvodu, { foreignKey: 'cvet_id',  onDelete: 'RESTRICT'  });
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
    tableName: 'Cvet',
    timestamps: false
  });

  return Cvet;
};
