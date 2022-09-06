import { Inject, Injectable, NestMiddleware } from '@nestjs/common'
import { WINSTON_PROVIDER } from '../lib/winston/constants'
import { WinstonService } from '../lib/winston/winston.service'
import { Request, Response, NextFunction } from 'express'
import { WinstonProvider } from '../lib/winston/winston.provider'

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor (@Inject(WINSTON_PROVIDER) private readonly winston: WinstonService) { // 注入winston的provider，方便调用
  }
  use (req: Request, res: Response, next: NextFunction) : any {
    // WinstonProvider
  }
}
