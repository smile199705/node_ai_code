import * as moment from 'moment'
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus
} from '@nestjs/common'
import { Request, Response } from 'express'
import { Logger } from '../loggers/log4js'
@Catch() // 捕获所有异常
export class HttpExceptionFilter implements ExceptionFilter<Error> {
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
    const logFormat = `{ "url": "${request.originalUrl}", "method": "${request.method}", "ip": "${request.ip}", "status": ${status}, "response": ${exception.toString()}`
    Logger.info(logFormat)
    // Logger.access(logFormat)
    response.status(status).json(errorResponse)
  }
}
