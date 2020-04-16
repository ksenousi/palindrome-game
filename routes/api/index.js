const express = require('express');
const { checkSchema } = require('express-validator');
const EntryModel = require('../../models/entry.model');
const getScoresHandler = require('./getScoresHandler');
const submitEntryHandler = require('./submitEntryHandler');

const router = express.Router();

router.get('/getScores', getScoresHandler);
router.post('/submitEntry', checkSchema(EntryModel), submitEntryHandler);

module.exports = router;
