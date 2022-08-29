import { Module } from '@nestjs/common'
import { UserModule } from './modules'
import { ConfigModule, ConfigService } from '@nestjs/config'
import * as Joi from '@hapi/joi'
import { LoggerModule } from 'nestjs-pino'
import { pinoHttpOption } from '../config/development/pino.config'

@Module({
  imports: [
      LoggerModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => {
          return { pinoHttp: pinoHttpOption(configService.get('NODE_ENV')) }
        }
      }),
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
    UserModule
  ]
})
export class AppModule {}
