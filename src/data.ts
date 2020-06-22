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

    /**
     * 写入文件
     * @param filename 文件名称
     * @param text 写入内容文本
     * @param flag flag
     */
    private write(filename: string, text: string, flag: string = 'a') {
        const path = FILE_PATH_MAP[filename];
        writeFileSync(path, text, {
            flag: flag
        });
    }

    /**
     * 判断是否为新内容
     * @param text 文本内容
     */
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

    /**
     * 清空output内容
     */
    private clean() {
        this.write('output', '', 'w');
    }

    /**
     * 获取新增diff内容
     * @param itemsList 内容list
     */
    getDiff(itemsList: Array<string>): string {
        let me = this;
        let ret: string[] = itemsList.filter(id => {
            return me.isNew(id);
        });
        return ret.join('\n');
    }

    /**
     * 存储
     * @param text 需要存储的文本
     */
    restore(text: string): Promise<void> {
        return Promise.resolve()
            .then(() => this.clean())
            .then(() => this.write('existence', text))
            .then(() => this.write('output', text))
            .then(() => info('发现新内容，存储成功'))
            .catch((err: Error) => {
                error(`存储失败 ${err.stack}`);
            });
    }
}
