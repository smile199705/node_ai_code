import { Body, Controller, Get, Param, Post, Query, UsePipes } from '@nestjs/common'
// import { PinoLogger } from 'nestjs-pino';
import { UserService } from './user.service'
import { ValidationPipe } from '../../pipes/validation.pipe'
import { TestDto } from '../../pipes/user/testDto'

@Controller('user')
export class UserController {
  constructor (private readonly userService: UserService) {}

  @Post('test')
  // @UsePipes(ValidationPipe)
  public async test (@Body() testDto: TestDto): Promise<any> {
    // 参数解构
    const { name, age } = testDto
    console.log(name, age, 'test-------------')
    const res = await this.userService.testDemo()
    return res
  }

}
