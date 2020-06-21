/**
 * @file 入口文件
 */

import {init} from './init';

let type = process.argv[2] || 'html';

init({
    type: type
});
