import { Logger } from 'nestjs-pino'
import moment from 'moment'

import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus
} from '@nestjs/common'
import { Request, Response } from 'express'
@Catch()
export class HttpExceptionFilter implements ExceptionFilter<Error> {
  constructor (private readonly logger: Logger) {
    console.log()
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
      msg: exception.message,
      data: {
        error: exception.name,
        date: nowDate,
        path: request.url
      }
    }
    this.logger.error(
      `【${nowDate}】${request.method} ${request.url} query:${JSON.stringify(
        request.query
      )} params:${JSON.stringify(request.params)} body:${JSON.stringify(
        request.body
      )}`,
      JSON.stringify(errorResponse),
      'HttpExceptionFilter'
    )

    response.status(status).json(errorResponse)
  }
}
