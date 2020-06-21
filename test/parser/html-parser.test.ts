import {htmlParser} from '../../src/parser/html-parser';

test('should return [] if content is empty', () => {
    expect(htmlParser('').length).toBe(0);
});

test('should return string[]', () => {
    let content = '<!DOCTYPE html><body class="">' + 
        '<li><span class="item-id">m91782365780</span></li>' + 
        '<li><span class="item-id">m91781946464</span></li>' + 
        '</body><html></html>';
    expect(htmlParser(content).length).toBe(2);
    expect(htmlParser(content).indexOf('m91782365780')).toBe(0);
});
