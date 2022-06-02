import { Controller } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino'
import { UserService } from "./user.service"; // 日志处理模块，较轻量，自定义丰富，性能高

@Controller('user')
export class UserController {
    constructor(
        public readonly logger: PinoLogger,
        private readonly userService: UserService,
    ) {
        logger.setContext(UserController.name)
    }

    // public async login()

}
