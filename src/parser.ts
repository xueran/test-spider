/**
 * @file 内容解析分发
 */

import {htmlParser} from './parser/html-parser';
import {jsonParser} from './parser/json-parser';
import {textParser} from './parser/text-parser';
import {warning} from './logging';

export function parser(type: string, data: string): Array<string> {
    switch(type) {
        case 'html':
            return htmlParser(data);
        case 'json':
            return jsonParser(data);
        case 'text':
            return textParser(data);
        default:
            warning(`不合法的type ${type}`);
            return [];
    }
}
