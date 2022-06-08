import { Module } from '@nestjs/common';
import { UserModule } from './modules';

@Module({
  imports: [UserModule],
})
export class AppModule {}
