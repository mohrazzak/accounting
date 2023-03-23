const { DataTypes } = require('sequelize');
const db = require('../../config/db');

const Product = db.define('Products', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  modelId: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  price: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  values: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
});

module.exports = Product;
