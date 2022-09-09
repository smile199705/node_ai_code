import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common'
import { UserModule } from './modules'
import { ConfigModule, ConfigService } from '@nestjs/config'
// import { WinstonModule } from 'nest-winston'
import * as winston from 'winston'
import * as Joi from '@hapi/joi'
import * as path from 'path'
import { MysqlModule } from './modules/data'
import { transports } from 'winston'
// eslint-disable-next-line @typescript-eslint/no-require-imports
const httpContext = require('express-http-context')
import { WinstonModule } from './lib/winston/winston.module'
const { clientName, serverName } = httpContext.get('context')


@Module({
  imports: [
    ConfigModule.forRoot({
      encoding: 'utf-8',
      envFilePath: [],
      expandVariables: true,
      ignoreEnvVars: true,
      load: [],
      validationSchema: Joi.object({
        H3_APM_SERVER_URL: Joi.string().default(''),
        H3_LATEINOS_REPORT_URL: Joi.string().default(''),
        SERVE_LISTENER_PORT: Joi.number().default(3002),
        HTTP_TIMEOUT: Joi.number().default(5000),
        HTTP_MAX_REDIRECTS: Joi.number().default(5),
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test', 'provision')
          .default('development')
      })
    }),
    MysqlModule,
    UserModule
    // WinstonModule.forRoot({})
    // WinstonModule.forRoot({
    //   transports: [
    //     new winston.transports.Console(),
    //     new winston.transports.File({ filename: '/logs/default.log' })
    //   ]
    // })
  ]
  // providers: [
  //   {
  //     provide: Logger,
  //     useClass: CommonLogger
  //   }
  // ]
})
export class AppModule {}
