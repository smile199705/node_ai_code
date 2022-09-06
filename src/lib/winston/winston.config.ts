
export const WinstonConfig = {
    loggerPath: '/logs',
    maxSize: '800m',
    level: 'info',
    blankSpace: true, // 打印日志需要各行打印，建议开发环境修改成true，便于开发查看问题

    desFields: [], // 需要脱敏的字段名
    shorten: []
}
