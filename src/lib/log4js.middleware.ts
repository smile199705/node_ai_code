import { Inject, Injectable, NestMiddleware } from '@nestjs/common'
import { LOG4JS_PROVIDER } from './log4js/constants'
import { Log4jsService } from './log4js/log4js.service'
import { Request, Response, NextFunction } from 'express'

@Injectable()
export class Log4jsMiddleware implements NestMiddleware {
  constructor (@Inject(LOG4JS_PROVIDER) private readonly log4js: Log4jsService) {} // 注入log4js的provider，方便调用
  use (req: Request, res: Response, next: NextFunction) {
    this.log4js.useLogger(req, res, next)
    // next()
  }
}
