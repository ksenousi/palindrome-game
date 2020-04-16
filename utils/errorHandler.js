function handleErrors(err, req, res, next) {
  const { logger } = req.app.locals.config;
  logger.error(err);

  res.status(err.status).json({ error: err.message });
}

module.exports = handleErrors;
