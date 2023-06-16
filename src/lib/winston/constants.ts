
export const WINSTON_PROVIDER = 'WINSTON_PROVIDER'
export const WINSTON_CONFIG = 'WINSTON_CONFIG'
export const CONFIG = {
	loggerPath: 'logs',
	maxSize: '800m',
	level: 'info',
	blankSpace: true, // 打印日志需要各行打印，建议开发环境修改成true，便于开发查看问题
	desFields: ['code'], // 需要脱敏的字段名
	shorten: []
}
