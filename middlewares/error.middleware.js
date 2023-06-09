function error(error, req, res, next) {
  console.log(error);
  res.status(error.status).json({ message: error.message, ...error });
}

export default error;
