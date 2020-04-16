const request = require('supertest');
const createApp = require('../../index');

describe('api route test', () => {
  const mockStore = new Map();
  const mockDb = {
    save: (key, val) => mockStore.set(key, val),
    get: (key) => mockStore.get(key),
  };
  const mockLogger = { error: () => {} };
  const app = createApp(mockDb, mockLogger);
  const validPalindromes = [
    'race car',
    '1221',
    'a man a plan a canal panama',
    'bob',
    'A but tuba',
    'A Santa at Nasa',
    'A Santa dog lived as a devil God at NASA',
  ];
  const invalidPalindromes = ['bank', 'offi, ce', 'race car.'];

  beforeEach(() => {
    mockStore.clear();
  });

  it('should validate missing field in body on /api/submitEntry', async () => {
    const missingFieldBody = { name: 'john' };
    const res = await request(app)
      .post('/api/submitEntry')
      .send(missingFieldBody);

    expect(res.status).toEqual(400);
    expect(res.body).toEqual({
      error:
        '[{"msg":"Invalid value","param":"word","location":"body"},{"msg":"word should not be empty","param":"word","location":"body"}]',
    });
  });

  it('should validate wrong field data type in body on /api/submitEntry', async () => {
    const wrongDataTypeBody = { name: 'john', word: 5 };
    const res = await request(app)
      .post('/api/submitEntry')
      .send(wrongDataTypeBody);

    expect(res.status).toEqual(400);
    expect(res.body).toEqual({
      error:
        '[{"value":5,"msg":"Invalid value","param":"word","location":"body"}]',
    });
  });

  it.each(invalidPalindromes)(
    'should return error for the invalid palindrome "%s" on /api/submitEntry',
    async (invalidPalindrome) => {
      const res = await request(app)
        .post('/api/submitEntry')
        .send({ name: 'bob', word: invalidPalindrome });

      expect(res.status).toEqual(400);
      expect(res.body).toEqual({
        error: 'Invalid palindrome',
      });
    },
  );

  it.each(validPalindromes)(
    'should return a score for the valid palindrome "%s" is submitted on /api/submitEntry',
    async (palindrome) => {
      const mockEntry = { name: 'john', word: palindrome };
      const res = await request(app).post('/api/submitEntry').send(mockEntry);
      expect(res.body).toEqual({
        points: palindrome.replace(/\s/g, '').length,
      });
    },
  );

  it('should return top 5 scores on /api/getScores', async () => {
    await Promise.all(
      validPalindromes.map((palindrome) => request(app)
        .post('/api/submitEntry')
        .send({ name: 'bob', word: palindrome })),
    );

    const res = await request(app).get('/api/getScores');
    expect(res.body).toEqual([
      { name: 'bob', points: 31 },
      { name: 'bob', points: 21 },
      { name: 'bob', points: 12 },
      { name: 'bob', points: 8 },
      { name: 'bob', points: 7 },
    ]);
  });
});
