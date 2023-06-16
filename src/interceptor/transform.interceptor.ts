import {
	Injectable,
	NestInterceptor,
	CallHandler,
	ExecutionContext
} from '@nestjs/common'
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs'
import { Logger } from '../loggers/log4js'
// import { response } from 'express'
interface Response<T> {
  code?: number;
  data?: T;
  msg?: string;
}
@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
	public intercept (
		_context: ExecutionContext,
		next: CallHandler<T>
	): Observable<Response<T>> {
		const req = _context.getArgByIndex(1).req
		return next.handle().pipe(map((data: any) => {
			const logFormat = '{ "url": ' + `"${req.originalUrl}"` + ', "method":' + `"${req.method}"` + ', "ip":' + `"${req.ip}"` + ', "response": ' + `${JSON.stringify(data)}` + ' }'
			Logger.info(logFormat)
			Logger.access(logFormat)
			if (data?.code) {
				return {
					data: data['data'] || data['message'],
					state: data['code'],
					msg: data['message'] || data?.data['message'] || ''
				}
			}
			return {
				data,
				state: 200,
				msg: '请求成功'
			}
		}))
	}
}
