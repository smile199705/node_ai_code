import { Injectable } from '@nestjs/common'
import { WinstonConfig } from './winston.config'
import * as winston from 'winston'
const { combine, printf } = winston.format
import * as DailyRotateFile from 'winston-daily-rotate-file'
import * as path from 'path'
import { NextFunction, Request, Response } from 'express'
import { transports } from 'winston'
import { CONFIG } from './constants'

const shorten = Symbol('CommonLogger#shorten')
const desensitize = Symbol('CommonLogger#desensitize')
const setMask = Symbol('CommonLogger#setMask')
const buildRegEx = Symbol('CommonLogger#buildRegEx')
const composeProcess = Symbol('CommonLogger#composeProcess')

@Injectable()
export class WinstonService {
    private desFields: any
    private shortenFields: any
    // private logger
    private logger: winston.Logger
    constructor () {
        // const loggerConfig = Object.assign(WinstonConfig, options)
        const { loggerPath, maxSize, level, blankSpace, desFields, shorten } = CONFIG
        this.desFields = desFields
        this.shortenFields = shorten
        // if (!serverName) {
        //     throw new Error(`当前系统的名称 serverName:${serverName} 不能为空!`)
        // }

        /**
         * @defaultLog 设置默认的日志输出
         */
        const transportDefault = new (winston.transports.DailyRotateFile)({
            level,
            filename: path.join(loggerPath, '/default-%DATE%.log'),
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            createSymlink: true,
            symlinkName: 'default.log',
            maxSize
            // maxFiles: '30d'
        })

        /**
         * @errorLog 设置error类型的日志输出
         */
        const transportError = new (winston.transports.DailyRotateFile)({
            level: 'error',
            filename: path.join(loggerPath, '/error-%DATE%.log'),
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            createSymlink: true,
            symlinkName: 'error.log',
            maxSize
            // maxFiles: '30d'
        })

        /**
         * @customFormat 自定义输出日志格式
         */
        const customFormat = printf((info) => {
            const { level: customLevel, message } = info
            const logObj = {
                level: customLevel,
                ...message
            }

            let content = JSON.stringify(logObj)
            if (this.shortenFields.length > 0) {
                // @ts-ignore
                content = this[shorten](content)
            }
            if (this.desFields.length > 0) {
                content = this[desensitize](content)
            }

            // 如blankSpace为true,则日志的输出格式为隔行输出
            if (blankSpace) {
                return content + '\n'
            }

            return content
        })

        /**
         * @loggerObject 最终的 "logger" 日志对象
         */
        this.logger = winston.createLogger({
            defaultMeta: { service: 'node-axle' },
            format: combine(
                customFormat
            ),
            transports: [transportDefault, transportError, new transports.Console()]
        })
    }

    // debug
    public debug (content, e): void {
        const cont = this[composeProcess](content, e)
        this.logger.debug(cont)
    }

    // info
    public info (content, e): void {
        const cont = this[composeProcess](content, e)
        this.logger.info(cont)
    }

    // warn
    public warn (content, e): void {
        const cont = this[composeProcess](content, e)
        this.logger.warn(cont)
    }

    // error
    public error (content, e): void {
        const cont = this[composeProcess](content, e)
        this.logger.error(cont)
    }
}
