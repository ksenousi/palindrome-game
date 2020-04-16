const insertIntoSortedArray = require("../../utils/insertIntoSortedArray");

const inputAndExpecationTable = [
  [
    [1, 2, 3],
    [3, 2, 1],
  ],
  [
    [7, 6, 5],
    [7, 6, 5],
  ],
  [
    [20, 2, 3, 2, 7, 15, 5],
    [20, 15, 7, 5, 3, 2, 2],
  ],
];

describe("insertIntoSortedArray test", () => {
  it.each(inputAndExpecationTable)(
    "should insert items in the correct locations",
    (randomOrder, expectedOrder) => {
      const randomEntries = randomOrder.map((num) => ({
        points: num,
      }));

      const expectedEntries = expectedOrder.map((num) => ({
        points: num,
      }));

      const testArray = [];
      randomEntries.forEach((entry) =>
        insertIntoSortedArray(testArray, entry, (a, b) => a.points - b.points)
      );

      expect(testArray).toEqual(expectedEntries);
    }
  );
});
