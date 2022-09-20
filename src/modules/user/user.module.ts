import { Module } from '@nestjs/common'
// import { TypeOrmModule } from '@nestjs/typeorm'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { WinstonProvider } from '../../lib/winston/winston.provider'
import { WinstonService } from '../../lib/winston/winston.service'
import { Logger } from '../../lib/winston/logger'

@Module({
  controllers: [UserController],
  providers: [UserService, Logger]
})
export class UserModule {}
