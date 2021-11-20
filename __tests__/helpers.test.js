const { format_date, format_plural, format_url } = require('../utils/helpers.js');

test('format_Date() returns a date string', () => {
    const date = new Date('2021-11-20 01:30:03');

    expect(format_date(date)).toBe('11/20/2021');
});

test('format_plural() returns a plural word', () => {
    expect(format_plural('Lion', 1)).toBe('Lion');
    expect(format_plural('Kid', 2)).toBe('Kids');
})

test('format_url() returns a simplified url string', () => {
    const url1 = format_url('http://test.com/page/1');
    const url2 = format_url('https://www.coolstuff.com/abcdefg/');
    const url3 = format_url('https://www.google.com?q=hello');

    expect(url1).toBe('test.com');
    expect(url2).toBe('coolstuff.com');
    expect(url3).toBe('google.com');
});