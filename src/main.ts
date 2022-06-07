import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from "./filters";
import { Logger } from 'nestjs-pino'

async function bootstrap() {
  /**
   * 使用Nest的工厂函数创建了AppModel
   */
  const app = await NestFactory.create(AppModule, {
    cors: false, // 关闭cors
    logger: false, // 关闭内置logger
  });

  /**
   * 设置全局路由前缀
   */
  app.setGlobalPrefix('axle')

  // 全局异常捕捉过滤器
  const logger = app.get(Logger)
  app.useGlobalFilters(new HttpExceptionFilter(logger))
  await app.listen(3000);
}
bootstrap();
