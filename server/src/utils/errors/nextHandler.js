// eslint-disable-next-line no-unused-vars
module.exports = (error, req, res, next) => {
  console.log(error);
  const { message = 'An error occoured.', statusCode = 500, data = {} } = error;
  res.status(statusCode).json({ message, data });
};
