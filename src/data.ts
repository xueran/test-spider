/**
 * @file 操作数据
 */

import {resolve} from 'path';
import {writeFileSync, readFileSync} from 'fs';
import {warning, error, info} from './logging';

const FILE_PATH_MAP = {
    'output': resolve(__dirname, '../data/output.data'),
    'existence': resolve(__dirname, '../data/existence.data')
}

export class Data {
    existData: string;

    constructor() {
        this.existData = readFileSync(FILE_PATH_MAP['existence']).toString();
    }

    private write(filename: string, text: string, flag: string = 'a'): boolean {
        const path = FILE_PATH_MAP[filename];
        if (!path) {
            error(`no such file ${filename}`);
            return false;
        }
        writeFileSync(path, text, {
            flag: flag
        });
        return true;
    }

    isNew(text: string): boolean {
        if (!text) {
            warning('is empty string');
            return false;
        }
        if (this.existData.indexOf(text) === -1) {
            return true;
        }
        return false;
    }

    updateExist(text: string): boolean {
        return this.write('existence', text);
    }

    clean(): boolean {
        return this.write('output', '', 'w');
    }

    restore(text: string): boolean {
        if (this.clean()) {
            return this.write('output', text);
        }
        return false;
    }
}
