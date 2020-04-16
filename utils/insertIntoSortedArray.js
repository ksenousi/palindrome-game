module.exports = function insertIntoSortedArray(sortedArray, item, compareFn) {
  // could use binary insert if array is too long to make insertion O(log(n)) instead of O(n)
  const index = sortedArray.findIndex(x => compareFn(x, item) <= 0);
  if (index >= 0) {
    sortedArray.splice(index, 0, item);
  } else {
    sortedArray.push(item);
  }
};
