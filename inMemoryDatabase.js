const store = new Map();

function save(key, val) {
  store.set(key, val);
}

function get(key) {
  return store.get(key);
}

module.exports = { save, get };
