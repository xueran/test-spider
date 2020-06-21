import {Data} from '../src/data';
import {writeFileSync, readFileSync} from 'fs';
import {resolve} from 'path';

function writeData(text: string, filename: string = 'existence') {
    writeFileSync(resolve(__dirname, `../data/${filename}.data`), text, {
        flag: 'w'
    });
}

describe('test constructor', () => {
    writeData('123');

    const data = new Data();
    it('should contain text 123', () => {
        expect(data.existData).toContain('123');
    });
});

describe('test diff', () => {
    writeData('123\nabc\n456');

    const data = new Data();
    it('should return empty string', () => {
        let list = ['123', 'abc'];
        expect(data.getDiff(list)).toEqual('');
    });

    it('should return string with 789', () => {
        let list = ['123', '789'];
        expect(data.getDiff(list)).toContain('789');
    });

    it('should not contain empty string', () => {
        let list = ['123', ''];
        expect(data.getDiff(list)).toEqual('');
    });
});

describe('text restore', () => {
    writeData('123');
    writeData('123', 'output');

    let text = '789';
    const data = new Data();
    it('output.data file should should write success', () => {
        expect.assertions(2);
        return data.restore(text).then(() => {
            let output = readFileSync(resolve(__dirname, '../data/output.data')).toString();
            expect(output).toContain('789');
            expect(output).not.toContain('123');
        });
    });

    it('existence.data file should write success', () => {
        expect.assertions(2);
        return data.restore(text).then(() => {
            let existence = readFileSync(resolve(__dirname, '../data/existence.data')).toString();
            expect(existence).toContain('789');
            expect(existence).toContain('123');
        });
    });

    // it('restore error with catch', () => {
    //     expect.assertions(1);
    //     return data.restore(text).catch((e) => {
    //         expect(e).toContain('存储失败');
    //     });
    // });
});
