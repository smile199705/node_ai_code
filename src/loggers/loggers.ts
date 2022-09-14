import * as winston from 'winston'
const { combine, printf, timestamp, ms, prettyPrint } = winston.format
import { utilities as nestWinstonModuleUtilities } from 'nest-winston'
import * as DailyRotateFile from 'winston-daily-rotate-file'
import * as path from 'path'
import { CONFIG } from './constants'

import { request } from 'express'
import * as moment from 'moment'
// eslint-disable-next-line prefer-const
const { loggerPath, level, maxSize, blankSpace, desFields, shorten } = CONFIG
const shortenFields = Symbol.for('loggers#shorten')
const desensitize = Symbol.for('loggers#desensitize')
const levelArr = ['info', 'warn', 'error', 'debug']

const Printf = winston.format.printf(info => {
    const now = Date.now()
    const { level: customLevel, message } = info
    console.log(customLevel, '===-=-------')
    if (customLevel.search(customLevel) !== -1) {
        info.level = 'info'
    }
    // if (shorten.length > 0) {
    //     content = this[shortenFields](content)
    // }
    // if (desFields.length > 0) {
    //     content = this[desensitize](content)
    // }
    // 如blankSpace为true,则日志的输出格式为隔行输出
    // if (blankSpace) {
    //     return content + '\n'
    // }
    // 如blankSpace为true,则日志的输出格式为隔行输出
    // info.content = {
    //     timestamp: now,
    //     stripTime: moment(now).format('YYYY-MM-DD HH:mm:ss.SSS'),
    //     content: info
    // }
    // if (blankSpace) {
    //     return content + '\n'
    // }
    return JSON.stringify(info)
})

// 控制台打印
export const Console = new winston.transports.Console({
    format: combine(
        timestamp(), ms(),
        Printf,
        nestWinstonModuleUtilities.format.nestLike('axle', {
        })
    )
})
// info类型文件
export const FileInfo = new DailyRotateFile({
    level,
    filename: path.join(loggerPath, '/default-%DATE%.log'),
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    createSymlink: true,
    symlinkName: 'default.log',
    maxSize: maxSize
})
// error类型文件
export const FileError = new DailyRotateFile({
    level,
    filename: path.join(loggerPath, '/error-%DATE%.log'),
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    createSymlink: true,
    symlinkName: 'error.log',
    maxSize: '200m'
})
