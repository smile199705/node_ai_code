
// import winston, { Logger } from 'winston'
// eslint-disable-next-line @typescript-eslint/no-require-imports
// import winston from 'winston'

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
import { Log4jsService } from '../lib/log4js/log4js.service'
// import { CommonLogger } from '../logger'
@Catch() // 捕获所有异常
export class HttpExceptionFilter implements ExceptionFilter<Error> {
  constructor () {
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
      msg: exception.name,
      data: {
        path: request.url,
        date: nowDate,
        msg: exception.stack
      }
    }

    // console.log(request, '#################')
    // //@ts-ignore
    // const requestId = request?.requestId || 'HTTP_NO'
    // this.log4js.logError(`【requestId: ${requestId}】\n message: ${
    //     exception.message
    // } \n stack: ${exception.stack} \n ${'='.repeat(20)}
    //     `)
    // Object.assign(errorResponse, requestId)
    response.status(status).json(errorResponse)
  }
}
