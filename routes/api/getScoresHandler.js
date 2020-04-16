const createError = require('http-errors');

function getScoresHandler(req, res, next) {
  try {
    const { database } = req.app.locals.config;

    res.json((database.get('sortedScores') || []).slice(0, 5));
  } catch (err) {
    return void next(createError.InternalServerError(err.message));
  }
}

module.exports = getScoresHandler;
