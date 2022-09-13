import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { start_printf } from './utils/start_printf'
import { HttpExceptionFilter } from './filters'
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston'
import { ConfigService } from '@nestjs/config'
import { ValidationPipe } from './pipes'
import { TransformInterceptor } from './interceptor/transform.interceptor'
// import { Logger, loggers } from 'winston'
// import { LoggerMiddleware } from './middleware/logger.middleware'
import { WinstonProvider } from './lib/winston/winston.provider'
import { WINSTON_PROVIDER } from './lib/winston/constants'
import { Logger } from 'winston'
import { LOG4JS_PROVIDER } from './lib/log4js/constants'
// import { Logger } from '@nestjs/common'

async function bootstrap () {
  /**
   * 使用Nest的工厂函数创建了AppModel
   */
  const app = await NestFactory.create(AppModule, {
    cors: false, // 关闭cors
    logger: false // 使用winston代替内置logger
  })

  /**
   * 设置全局路由前缀
   */
  // app.setGlobalPrefix(`${process.env.NODE_ENV}/axle`)
  app.setGlobalPrefix('axle')

  // 设置全局参数管道
  // app.useGlobalPipes(new ValidationPipe())

  // 设置响应拦截器
  app.useGlobalInterceptors(new TransformInterceptor())
  // app.useGlobalInterceptors(new TransformInterceptor(app.get(LOG4JS_PROVIDER)))

  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER))
  // app.use(new LoggerMiddleware(Logger).use)
   // 全局异常捕捉过滤器
  // const logger = app.get(Logger)
  // app.useGlobalFilters(new HttpExceptionFilter(app.get(LOG4JS_PROVIDER)))
  const configService = app.get(ConfigService)
  // 端口号
  await app.listen(configService.get('SERVE_LISTENER_PORT'))

}
bootstrap().then(() => {
  start_printf()
})
