const { StatusCodes } = require('http-status-codes');
const { responser } = require('../../utils');
const Product = require('./product.model');

function getAllProducts(req, res, next) {
  try {
    const products = Product.findAll();
    return responser(res, StatusCodes.ACCEPTED, { products });
  } catch (error) {
    return next(error);
  }
}

module.exports = { getAllProducts };
