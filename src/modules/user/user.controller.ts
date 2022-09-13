import { Body, Controller, Get, Inject, Logger, LoggerService, Param, Post, Query, UsePipes } from '@nestjs/common'
// import { PinoLogger } from 'nestjs-pino';
import { UserService } from './user.service'
import { ValidationPipe } from '../../pipes/validation.pipe'
import { TestDto } from '../../pipes/user/testDto'
// import { info, Logger } from 'winston'
// import { LoggerMiddleware } from 'log4js'
import { LOG4JS_PROVIDER } from '../../lib/log4js/constants'
import { WINSTON_MODULE_PROVIDER } from 'nest-winston'
// import { Logger } from '../../lib/winston/logger'
// import { Logger } from '../../lib/winston/logger'

@Controller('user')
export class UserController {
  constructor (
      // @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: LoggerService,
      @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
      private readonly userService: UserService,
  ) {
    // logger = new Logger(UserController.name)
  }

  @Get('test')
  // @UsePipes(ValidationPipe)
  // public async test (@Query() testDto: TestDto): Promise<any> {
  public async test (): Promise<any> {
    // 参数解构
    // this.logger.info('hahha', testDto)
    const res = await this.userService.testDemo()
    // this.loggers.info('数据', res)
    // this.logger.info(res, 'ceshi')
    this.logger.error(res, '测试的数据')
    // console.log(res, '=====-=-=-------')
    return res
  }

}
