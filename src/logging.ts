/**
 * @file log日志
 */

import chalk from 'chalk';
import {resolve} from 'path';
import {writeFileSync} from 'fs';

const ERROR_LOG_PATH: string = resolve(__dirname, '../log/error.log');
const INFO_LOG_PATH: string = resolve(__dirname, '../log/log.log');

function log(msg: string) {
    console.log(msg);
}

/**
 * 日志写入
 * @param msg 日志信息
 * @param path 日志文件路径
 */
function writeLog(msg: string, path: string) {
    writeFileSync(path, msg, {
        flag: 'a'
    });
}

/**
 * 警告日志
 * @param text 日志文本
 */
export function warning(text: string) {
    let msg = `[warning] ${text}\n`;
    writeLog(msg, ERROR_LOG_PATH);
    log(chalk.yellow(msg));
}

/**
 * 错误日志
 * @param text 日志文本
 */
export function error(text: string) {
    let msg = `[error] ${text}\n`;
    writeLog(msg, ERROR_LOG_PATH);
    log(chalk.red(msg));
}

/**
 * 常规日志
 * @param text 日志文本
 */
export function info(text: string) {
    let msg = `[info] ${text}\n`;
    writeLog(msg, INFO_LOG_PATH);
    log(chalk.green(msg));
}
