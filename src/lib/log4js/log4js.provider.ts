import { Provider } from '@nestjs/common'

import { LOG4JS_PROVIDER, LOG4JS_CONFIG } from './constants'
import { Log4jsConfig } from './log4js.config'
import { Log4jsService } from './log4js.service'

export const log4jsProvider: Provider = {
	provide: LOG4JS_PROVIDER,
	useFactory: (config: Log4jsConfig): Log4jsService => {
		return new Log4jsService(config)
	},
	inject: [{ token: LOG4JS_CONFIG, optional: true }] // 这里引入 的是key为LOG4JS_CONFIG的服务
}
