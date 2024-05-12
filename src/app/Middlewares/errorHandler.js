// MIDDLEWARE - Error Handler (OBRIGATÓRIO O USO DE 4 ARGUMENTOS, PARA QUE O EXPRESS RECONHEÇA QUE É UM MIDDLEWARE.)

module.exports = (error, request, response, next) => {
  console.log(error);
  response.sendStatus(500);
};
