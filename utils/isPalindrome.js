module.exports = function isPalindrome(str) {
  const withoutWhitespace = str.toLowerCase().replace(/\s/g, '');
  return withoutWhitespace === withoutWhitespace.split('').reverse().join('');
};
