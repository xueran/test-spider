/**
 * @file log
 */

import chalk from 'chalk';
import {resolve} from 'path';
import {writeFile} from 'fs';

const ERROR_LOG_PATH: string = resolve(__dirname, '../log/error.log');
const INFO_LOG_PATH: string = resolve(__dirname, '../log/log.log');

function log(msg: string) {
    console.log(msg);
}

async function writeLog(msg: string, path: string) {
    writeFile(path, msg, {
        flag: 'a'
    }, err => {
        if (err) {
            throw err;
        }
    });
}

export async function warning(text: string) {
    let msg = `[warning] ${text}\n`;
    await writeLog(msg, ERROR_LOG_PATH);
    log(chalk.yellow(msg));
}

export async function error(text: string) {
    let msg: string = `[error] ${text}\n`;
    await writeLog(msg, ERROR_LOG_PATH);
    log(chalk.red(msg));
}

export async function info(text: string) {
    let msg: string = `[info] ${text}\n`;
    await writeLog(msg, INFO_LOG_PATH);
    log(chalk.green(msg));
}
