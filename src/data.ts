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

    private write(filename: string, text: string, flag: string = 'a') {
        const path = FILE_PATH_MAP[filename];
        if (!path) {
            error(`no such file ${filename}`);
            return;
        }
        writeFileSync(path, text, {
            flag: flag
        });
    }

    private isNew(text: string): boolean {
        if (!text) {
            warning('is empty string');
            return false;
        }
        if (this.existData.indexOf(text) === -1) {
            return true;
        }
        return false;
    }

    private clean() {
        this.write('output', '', 'w');
    }

    getDiff(itemsList): string {
        let me = this;
        let ret: string[] = itemsList.filter(id => {
            return me.isNew(id);
        });
        return ret.join('\n');
    }

    restore(text: string) {
        return Promise.resolve()
            .then(() => this.clean())
            .then(() => this.write('existence', text))
            .then(() => {
                this.write('output', text);
                info('发现新内容，存储成功');
            })
            .catch((err: Error) => {
                error(`存储失败 ${err.stack}`);
            });
    }
}
