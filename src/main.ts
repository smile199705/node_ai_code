import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

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
  await app.listen(3000);
}
bootstrap();
