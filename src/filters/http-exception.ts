
import winston, { Logger } from 'winston'
// eslint-disable-next-line @typescript-eslint/no-require-imports
const moment = require('moment')
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus
} from '@nestjs/common'
import { Request, Response } from 'express'
// import { CommonLogger } from '../logger'
@Catch() // 捕获所有异常
export class HttpExceptionFilter implements ExceptionFilter<Error> {
  constructor (private readonly logger: winston.Logger) {
  }

  /**
   * 异常处理
   * @param exception 异常
   * @param host 主机
   */
  public catch (exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()
    const status =
      exception instanceof HttpException ?
        exception.getStatus() :
        HttpStatus.INTERNAL_SERVER_ERROR

    const nowDate = moment().format('YYYY-MM-DD HH:mm:ss')
    const errorResponse = {
      state: status,
      msg: exception.name,
      data: {
        path: request.url,
        date: nowDate,
        msg: exception.stack
      }
    }
    // this.logger.error(
    //   `【${nowDate}】${request.method} ${request.url} query:${JSON.stringify(request.query)} params:${JSON.stringify(request.params)} body:${JSON.stringify(request.body)}`,
    //   JSON.stringify(errorResponse)
    // )
    response.status(status).json(errorResponse)
  }
}
