import { Body, Controller, Get, Inject, Param, Post, Query } from '@nestjs/common'
import { UserService } from './user.service'
import { TestDto } from '../../pipes/user/testDto'
import { Logger } from '../../loggers/log4js'

@Controller('user')
export class UserController {
  constructor (
      private readonly userService: UserService,
  ) {}
  @Get('test')
  public async test (@Query() testDto: TestDto): Promise<any> {
    const res = await this.userService.testDemo()
    // Logger.warn('测试的')
    return res
  }

}
