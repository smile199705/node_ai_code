import { DynamicModule, Global, Module } from '@nestjs/common'
import { log4jsProvider } from './log4js.provider'
import { Log4jsConfig } from './log4js.config'
import { LOG4JS_CONFIG } from './constants'



/**
 * 目前仅支持将用户请求写入日志，基于 log4js
 */
@Global()
@Module({
    providers: [log4jsProvider],
    exports: [log4jsProvider]
})
export class Log4jsModule {
    public static withConfig (config: Log4jsConfig): DynamicModule {
        const providers = [{ provide: LOG4JS_CONFIG, useValue: config }] // 这是用LOG4JS_CONFIG常量做为传入的config的key,方便调用， 与provider中的一一对应

        return {
            module: Log4jsModule,
            providers: providers,
            exports: providers
        }
    }
}
