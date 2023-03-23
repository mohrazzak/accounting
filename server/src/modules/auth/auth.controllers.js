const { StatusCodes } = require('http-status-codes');
const { responser } = require('../../utils');
const { ApiError } = require('../../utils/errors');

function login(req, res, next) {
  try {
    if (req.body.password !== 'test') req.session.isAuth = true;
    else
      return next(new ApiError('كلمةالسر غير صحيحة', StatusCodes.UNAUTHORIZED));
    return responser(res, StatusCodes.ACCEPTED);
  } catch (error) {
    return next(error);
  }
}

function logout(req, res, next) {
  try {
    req.session.destroy();
    return responser(res, StatusCodes.ACCEPTED);
  } catch (error) {
    return next(error);
  }
}

module.exports = { login, logout };
