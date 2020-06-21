import {jsonParser} from '../../src/parser/json-parser';

test('should return [] if content is empty', () => {
    expect(jsonParser('').length).toBe(0);
});

test('should return [] if data.list is not exist', () => {
    let content = '{"status":0}';
    expect(jsonParser(content).length).toBe(0);
});

test('should return string[]', () => {
    let content = '{"status":0,"list":["m91782367011","m91782365780"]}';
    expect(jsonParser(content).length).toBe(2);
    expect(jsonParser(content).indexOf('m91782367011')).toBe(0);
});
