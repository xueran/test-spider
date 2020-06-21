/**
 * @file 数据存取操作
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

    private write(filename: string, text: string, flag: string = 'a'): Promise<void> {
        const path = FILE_PATH_MAP[filename];

        return new Promise((resolve, reject) => {
            if (!path) {
                error(`no such file ${filename}`);
                reject();
                return;
            }
            writeFileSync(path, text, {
                flag: flag
            });
            resolve();
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
        return this.write('output', '', 'w');
    }

    getDiff(itemsList: Array<string>): string {
        let me = this;
        let ret: string[] = itemsList.filter(id => {
            return me.isNew(id);
        });
        return ret.join('\n');
    }

    restore(text: string): Promise<void> {
        return this.clean().then(() => {
            return this.write('existence', text);
        }).then(() => {
            return this.write('output', text);
        }).then(() => {
            info('发现新内容，存储成功');
        }).catch((err: Error) => {
            error(`存储失败 ${err.stack}`);
        });
    }
}