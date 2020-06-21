import {textParser} from '../../src/parser/text-parser';

test('should return [] if content is empty', () => {
    expect(textParser('').length).toBe(0);
});

test('should return string[]', () => {
    let content = 'm91782367011\nm91782365780';
    expect(textParser(content).length).toBe(2);
    expect(textParser(content).indexOf('m91782367011')).toBe(0);
});
