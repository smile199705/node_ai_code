import { Inject, Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response } from 'express'
import { Logger } from '../loggers/log4js'

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
	use (req: Request, res: Response, next: () => void) {
		const code = res.statusCode // 响应状态码
		next()
		// 组装日志信息
		const logFormat = `Method: ${req.method} \n Request original url: ${req.originalUrl} \n IP: ${req.ip} \n Status code: ${code} \n`
		// 根据状态码，进行日志类型区分
		if (code >= 500) {
			Logger.error(logFormat)
		} else if (code >= 400) {
			Logger.warn(logFormat)
		} else {
			Logger.access(logFormat)
			Logger.log(logFormat)
		}

	}
}

// 函数式中间件
export function logger (req: Request, res: Response, next: () => any) {
	const code = res.statusCode // 响应状态码
	next()
	// 组装日志信息
	const logFormat = `{ "url": "${req.originalUrl}", "method": "${req.method}", "ip": "${req.ip}", "header": ${JSON.stringify(req.headers)} , "params": "${JSON.stringify(req.params)}", "query": "${JSON.stringify(req.query)}", "body": "${JSON.stringify(req.body)}" }`
	// 根据状态码，进行日志类型区分
	if (code >= 500) {
		Logger.error(logFormat)
	} else if (code >= 400) {
		Logger.warn(logFormat)
	} else {
		Logger.access(logFormat)
		Logger.log(logFormat)
	}
}
