import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { UserModule } from './modules'
import { ConfigModule } from '@nestjs/config'
// import { WinstonModule } from 'nest-winston'
import * as winston from 'winston'
import * as DailyRotateFile from 'winston-daily-rotate-file'
import * as Joi from '@hapi/joi'
import * as path from 'path'
import { MysqlModule } from './modules/data'
import { WINSTON_MODULE_NEST_PROVIDER, WinstonModule } from 'nest-winston'
import { Console, FileError, FileInfo } from './loggers/loggers'
import { WinstonProvider } from './lib/winston/winston.provider'
// import { LoggerMiddleware } from './middleware/logger.middleware'

// const { combine, printf } = winston.format
// import httpContext from 'express-http-context'
// const { clientName, serverName } = httpContext.get('context')


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
        SERVE_LISTENER_PORT: Joi.number().default(3005),
        HTTP_TIMEOUT: Joi.number().default(5000),
        HTTP_MAX_REDIRECTS: Joi.number().default(5),
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test', 'provision')
          .default('development')
      })
    }),
    MysqlModule,
    UserModule
    // WinstonModule.forRoot({
    //   transports: [
    //       Console,
    //       FileInfo,
    //       FileError
    //   ]
    // })
  ]
  // providers: [WinstonProvider]
})
export class AppModule {}
