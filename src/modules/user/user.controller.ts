import { Body, Controller, Get, Param, Post, Query, UsePipes } from '@nestjs/common'
// import { PinoLogger } from 'nestjs-pino';
import { UserService } from './user.service'
import { ValidationPipe } from '../../pipes/validation.pipe'
import { TestDto } from '../../pipes/user/testDto'
import { info } from 'winston'
import { Logger } from '../../lib/winston/logger'

@Controller('user')
export class UserController {
  constructor (
      private readonly logger: Logger,
      private readonly userService: UserService,
  ) {
    // logger = new Logger(UserController.name)
  }

  @Post('test')
  // @UsePipes(ValidationPipe)
  public async test (@Body() testDto: TestDto): Promise<any> {
    // 参数解构
    const { name, age } = testDto
    console.log(name, age, '=========')
    this.logger.info('hahha', new Error('这是错误'))
    const res = await this.userService.testDemo()
    this.logger.info('数据', res)
    console.log(res, '=====-=-=-------')
    return res
  }

}
