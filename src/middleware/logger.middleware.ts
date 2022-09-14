import { Inject, Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import * as winston from 'winston'
import * as moment from 'moment'
import { Logger } from 'winston'
// import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston'

// @Injectable()
// export class LoggerMiddleware implements NestMiddleware {
//   constructor (@Inject(WINSTON_PROVIDER) private readonly logger: WinstonService) { // 注入winston的provider，方便调用
//   }
//   use (req: Request, res: Response, next: NextFunction) : any {
//     // WinstonProvider
//     // next()
//     // this.logger.info()
//     // this.logger.useLogger(req, res, next())
//   }
// }
