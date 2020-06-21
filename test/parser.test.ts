import {parser} from '../src/parser';

test('should return [] if type is invalid', () => {
    expect(parser('list', '').length).toBe(0);
});

test('type=html should return string[] and length=2', () => {
    let content = '<!DOCTYPE html><body class="">' + 
        '<li><span class="item-id">m91782365780</span></li>' + 
        '<li><span class="item-id">m91781946464</span></li>' + 
        '</body><html></html>';
    expect(parser('html', content).length).toBe(2);
});

test('type=json should return string[] and length=2', () => {
    let content = '{"status":0,"list":["m91782367011","m91782365780"]}';    
    expect(parser('json', content).length).toBe(2);
});

test('type=text should return string[] and length=2', () => {
    let content = 'm91782367011\nm91782365780';    
    expect(parser('text', content).length).toBe(2);
});
