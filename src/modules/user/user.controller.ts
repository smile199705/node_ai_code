import { Controller, Get } from '@nestjs/common'
// import { PinoLogger } from 'nestjs-pino';
import { UserService } from './user.service' // 日志处理模块，较轻量，自定义丰富，性能高

@Controller('user')
export class UserController {
  constructor (private readonly userService: UserService) {}

  @Get('test')
  public async test (): Promise<any> {
    console.log('这是测试')
    const res = await this.userService.testDemo()
    return res
  }

}
