import {info, warning, error} from '../src/logging';
import {resolve} from 'path';
import {readFileSync} from 'fs';

function readLog(name: string) {
    return readFileSync(resolve(__dirname, `../log/${name}.log`)).toString();
}

test('warning log', () => {
    let text: string = 'this is a warning log';
    warning(text);
    expect(readLog('error')).toContain(`[warning] ${text}`);
});

test('error log', () => {
    let text: string = 'this is a error log';
    error(text);
    expect(readLog('error')).toContain(`[error] ${text}`);
});

test('info log', () => {
    let text: string = 'this is a info log';
    info(text);
    expect(readLog('log')).toContain(`[info] ${text}`);
});
