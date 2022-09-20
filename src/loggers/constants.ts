// config/log4js.ts

import * as path from 'path'
const baseLogPath = './logs' // 日志要写入哪个目录

const log4jsConfig = {
    appenders: {
        console: {
            type: 'console' // 会打印到控制台
        },
        access: {
            type: 'dateFile', // 会写入文件，并按照日期分类
            filename: `${baseLogPath}/access.log`, // 日志文件名，会命名为：default.20220920.log
            alwaysIncludePattern: true,
            pattern: 'yyyyMMdd',
            daysToKeep: 60,
            numBackups: 3,
            category: 'http',
            keepFileExt: true // 是否保留文件后缀
        },
        app: {
            type: 'dateFile',
            filename: `${baseLogPath}/default.log`,
            alwaysIncludePattern: true,
            layout: {
                type: 'pattern',
                pattern:
                    '{"level":"%p","category":"%c","host":"%h","datetime":"%d","pid":"%z","data":\'%m\'}'
            },
            // 日志文件按日期（天）切割
            pattern: 'yyyyMMdd',
            daysToKeep: 60,
            // maxLogSize: 10485760,
            numBackups: 3,
            keepFileExt: true
        },
        errorFile: {
            type: 'dateFile',
            filename: `${baseLogPath}/error.log`,
            alwaysIncludePattern: true,
            layout: {
                type: 'pattern',
                pattern:
                    '{"level":"%p","category":"%c","host":"%h","datetime":"%d","pid":"%z","data":\'%m\'}'
            },
            // 日志文件按日期（天）切割
            pattern: 'yyyyMMdd',
            daysToKeep: 60,
            // maxLogSize: 10485760,
            numBackups: 3,
            keepFileExt: true
        },
        errors: {
            type: 'logLevelFilter',
            level: 'ERROR',
            appender: 'errorFile'
        }
    },
    categories: {
        default: {
            appenders: ['console', 'app', 'errors'],
            level: 'INFO'
        },
        info: { appenders: ['console', 'app', 'errors'], level: 'info' },
        access: { appenders: ['console', 'app', 'errors'], level: 'info' },
        http: { appenders: ['access'], level: 'DEBUG' }
    },
    pm2: true, // 使用 pm2 来管理项目时，打开
    pm2InstanceVar: 'INSTANCE_ID' // 会根据 pm2 分配的 id 进行区分，以免各进程在写日志时造成冲突
}

const CONFIG = {
    loggerPath: 'logs',
    maxSize: '800m',
    level: 'info',
    blankSpace: true, // 打印日志需要各行打印，建议开发环境修改成true，便于开发查看问题
    desFields: [], // 需要脱敏的字段名
    shorten: []
}

export default log4jsConfig
export const config = CONFIG
