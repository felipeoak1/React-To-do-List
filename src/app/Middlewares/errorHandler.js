// MIDDLEWARE - Error Handler

module.exports = (error, request, response, next) => {
  console.log(error);
  response.sendStatus(500);
};
