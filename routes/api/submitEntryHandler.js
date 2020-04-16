const createError = require('http-errors');
const { validationResult } = require('express-validator');
const isPalindrome = require('../../utils/isPalindrome');
const insertIntoSortedArray = require('../../utils/insertIntoSortedArray');

function submitEntryHandler(req, res, next) {
  try {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      return void next(
        createError.BadRequest(JSON.stringify(validationErrors.array())),
      );
    }

    const entry = req.body;
    if (!isPalindrome(entry.word)) {
      return void next(createError.BadRequest('Invalid palindrome'));
    }

    const score = {
      name: entry.name,
      points: entry.word.replace(/\s/g, '').length,
    };

    const { database } = req.app.locals.config;

    const sortedScores = database.get('sortedScores') || [];
    insertIntoSortedArray(sortedScores, score, (a, b) => a.points - b.points);
    database.save('sortedScores', sortedScores);

    res.json({ points: score.points });
  } catch (err) {
    return void next(createError.InternalServerError(err.message));
  }
}

module.exports = submitEntryHandler;
