const EntryModel = {
  name: {
    isString: true,
    isLength: {
      errorMessage: 'name should not be empty',
      options: { min: 1 },
    },
  },
  word: {
    isString: true,
    isLength: {
      errorMessage: 'word should not be empty',
      options: { min: 1 },
    },
  },
};

// since this model should never be modified at runtime it's better to freeze it
module.exports = Object.freeze(EntryModel);
