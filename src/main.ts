import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { start_printf } from './utils/start_printf'
import { HttpExceptionFilter } from './filters'
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston'
import { ConfigService } from '@nestjs/config'
import { ValidationPipe } from './pipes'
import { TransformInterceptor } from './interceptor/transform.interceptor'
// import { LoggerMiddleware } from './middleware/logger.middleware'

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
  app.useGlobalPipes(new ValidationPipe())

  // 日志中间件
  // app.use(new LoggerMiddleware().use)

  // 设置响应拦截器
  app.useGlobalInterceptors(new TransformInterceptor())

  // 全局的logger
  const nestWinston = app.get(WINSTON_MODULE_NEST_PROVIDER)
  app.useLogger(nestWinston)
   // 全局异常捕捉过滤器， 异常拦截写入日志
  app.useGlobalFilters(new HttpExceptionFilter(nestWinston.logger))
  const configService = app.get(ConfigService)
  // 端口号
  await app.listen(configService.get('SERVE_LISTENER_PORT'))

}
bootstrap().then(() => {
  start_printf()
})
