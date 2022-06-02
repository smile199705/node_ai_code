import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm'
import { UserController } from './user.controller'
import { UserService } from './user.service'

@Module({
    // 数据模型
    imports: [
        // TypeOrmModule.forFeature()
    ],
    controllers: [UserController],
    providers: [UserService]
})
export class UserModule {}
