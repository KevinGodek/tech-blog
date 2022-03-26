const { formatDate } = require('../utils/helpers');
test('formatDate() returns a date string', () => {
    const date = new Date('2020-03-20 16:12:03');
    expect(formatDate(date)).toBe('3/20/2020');
});