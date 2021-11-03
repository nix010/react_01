
export const errorResponse = (res, errorMessage, status=400) => res.status(status).send({'errors': [errorMessage]})

export const authenticationMiddleware = (req, res, next) => {
  const { authorization } = req.headers;

  if(!authorization) {
    return errorResponse(res, 'Unauthorized', 403);
  }
  const [_, cred] = authorization.split(' ');
  if(!cred) {
    return errorResponse(res, 'Unauthorized', 403);
  }
  const [username, password] = cred.split(':');
  if(!(username === 'admin' && password === 'password')){
    return errorResponse(res, 'Unauthorized', 403);
  }
  next()
};
export const loggingMiddleware = (req, res, next) => {
  console.log(req.originalUrl);
  next()
};

export const errorHandlingMiddleware = (err, req, res, next) => {
  if (err){
    return errorResponse(res, 'Internal error', 500)
  } else{
    next()
  }
};
