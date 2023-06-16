import * as winston from 'winston'
const { combine, printf, timestamp, ms, prettyPrint, colorize, json } = winston.format
import { utilities as nestWinstonModuleUtilities } from 'nest-winston'
import * as DailyRotateFile from 'winston-daily-rotate-file'
import * as path from 'path'
import { config } from './constants'

import { request } from 'express'
import * as moment from 'moment'
import { createLogger } from 'winston'
// eslint-disable-next-line prefer-const
const { loggerPath, level, maxSize, blankSpace, desFields, shorten } = config
const shortenFields = Symbol.for('loggers#shorten')
const desensitize = Symbol.for('loggers#desensitize')
const levelArr = ['info', 'warn', 'error', 'debug']

// @ts-ignore
const Printf = winston.format.printf(info => {
	info.timestamp = moment().format('YYYY-MM-DD HH:mm:ss.SSS')
	return JSON.stringify(info)
})
// 控制台打印
export const Console = new winston.transports.Console({
	format: combine(
		timestamp({
			format: moment().format('YYYY-MM-DD HH:mm:ss.SSS')
		}),
		Printf,
		colorize({
			colors: {
				error: 'red',
				info: 'green',
				warn: 'yellow'
			}

		}),
		json(),
		nestWinstonModuleUtilities.format.nestLike('axle', {
		})
	)
})
// 所有类型文件
export const FileInfo = new DailyRotateFile({
	level,
	filename: path.join(loggerPath, '/default-%DATE%.log'),
	format: combine(
		colorize({
			colors: {
				error: 'red',
				info: 'green',
				warn: 'yellow'
			}
		}),
		json(),
		Printf
	),
	datePattern: 'YYYY-MM-DD',
	zippedArchive: true,
	createSymlink: true,
	symlinkName: 'default.log',
	maxSize: maxSize
})
// error类型文件
export const FileError = new DailyRotateFile({
	level: 'error',
	filename: path.join(loggerPath, '/error-%DATE%.log'),
	datePattern: 'YYYY-MM-DD',
	format: combine(
		json(),
		Printf
	),
	zippedArchive: true,
	createSymlink: true,
	symlinkName: 'error.log',
	maxSize: '200m'
})

// export const logger = createLogger({
//     transports: [
//         Console,
//         FileInfo,
//         FileError
//     ]
// })

// export const printfLogger = Printf

