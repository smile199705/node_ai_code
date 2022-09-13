import { Inject, Injectable, NestMiddleware } from '@nestjs/common'
import { WINSTON_PROVIDER } from '../lib/winston/constants'
// import * as logger from '../lib/winston/winston.service'
import { Request, Response, NextFunction } from 'express'
import { WinstonProvider } from '../lib/winston/winston.provider'
import { WinstonService } from '../lib/winston/winston.service'
import { Logger } from '../lib/winston/logger'

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
