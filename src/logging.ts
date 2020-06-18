/**
 * @file log
 */

import chalk from 'chalk';
import {resolve} from 'path';
import {writeFileSync} from 'fs';

const ERROR_LOG_PATH: string = resolve(__dirname, '../log/error.log');
const INFO_LOG_PATH: string = resolve(__dirname, '../log/log.log');

function log(msg: string) {
    console.log(msg);
}

function writeLog(msg: string, path: string) {
    writeFileSync(path, msg, {
        flag: 'a'
    });
}

export function warning(text: string) {
    let msg = `[warning] ${text}\n`;
    writeLog(msg, ERROR_LOG_PATH);
    log(chalk.yellow(msg));
}

export function error(text: string) {
    let msg: string = `[error] ${text}\n`;
    writeLog(msg, ERROR_LOG_PATH);
    log(chalk.red(msg));
}

export function info(text: string) {
    let msg: string = `[info] ${text}\n`;
    writeLog(msg, INFO_LOG_PATH);
    log(chalk.green(msg));
}
