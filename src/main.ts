import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { start_printf } from './utils/start_printf'
import { HttpExceptionFilter } from './filters'
import { Logger } from 'nestjs-pino'
import { ConfigService } from '@nestjs/config'

async function bootstrap () {
  /**
   * 使用Nest的工厂函数创建了AppModel
   */
  const app = await NestFactory.create(AppModule, {
    cors: false // 关闭cors
    // logger: false, // 关闭内置logger
  })

  /**
   * 设置全局路由前缀
   */
  app.setGlobalPrefix('axle')

   // 全局异常捕捉过滤器
    const logger = app.get(Logger)
    app.useGlobalFilters(new HttpExceptionFilter(logger))
  const configService = app.get(ConfigService)
  await app.listen(configService.get('SERVE_LISTENER_PORT'))

}
bootstrap().then(() => {
  start_printf()
})
