import { Body, Controller, Get, Inject, Logger, LoggerService, Param, Post, Query, UsePipes } from '@nestjs/common'
// import { PinoLogger } from 'nestjs-pino';
import { UserService } from './user.service'
import { TestDto } from '../../pipes/user/testDto'
import { WINSTON_MODULE_PROVIDER } from 'nest-winston'
// import { Console } from '../../loggers/loggers'

@Controller('user')
export class UserController {
  constructor (
      // @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: LoggerService,
      @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
      private readonly userService: UserService,
  ) {}

  @Post('test')
  // @UsePipes(ValidationPipe)
  public async test (@Body() testDto: TestDto): Promise<any> {
    const res = await this.userService.testDemo()
    this.logger.log('', res)
    // Console.log('info', res)
    return res
  }

}
