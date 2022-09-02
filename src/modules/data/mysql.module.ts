
import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'

import * as nconf from 'nconf'
nconf.argv().env().file({ file: 'configMap.json' })
// nconf.argv
@Module({
    imports: [
        TypeOrmModule.forRoot({
            name: 'db_axle',
            type: 'mysql',
            host: nconf.get('db:axle:host'),
            port: nconf.get('db:axle:port'),
            username: nconf.get('db:axle:username'),
            password: nconf.get('db:axle:password'),
            database: 'axle',
            autoLoadEntities: true
        })
    ]
})

export class MysqlModule {}
