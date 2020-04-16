const isPalindrome = require("../../utils/isPalindrome");

const validPalindromes = [
  "race car",
  "1221",
  "a man a plan a canal panama",
  "bob",
  "A but tuba",
  "A Santa at Nasa",
  "A Santa dog lived as a devil God at NASA",
];
const invalidPalindromes = ["bank", "offi, ce", "race car."];

describe("isPalindrome test", () => {
  it.each(validPalindromes)(
    'should return true for the valid palindrome: "%s"',
    (palindrome) => {
      expect(isPalindrome(palindrome)).toEqual(true);
    }
  );

  it.each(invalidPalindromes)(
    'should return false for the invalid palindrome: "%s"',
    (invalidPalindrome) => {
      expect(isPalindrome(invalidPalindrome)).toEqual(false);
    }
  );
});
