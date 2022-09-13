import {
  Injectable,
  NestInterceptor,
  CallHandler,
  ExecutionContext
} from '@nestjs/common'
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs'
import { Log4jsService } from '../lib/log4js/log4js.service'
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
    return next.handle().pipe(map((data: any) => {
      if (data?.code) {
        return {
          // requestId: _context.switchToHttp().getRequest().requestId,
          data: data['data'] || data['message'],
          state: data['code'],
          msg: data['message'] || data?.data['message'] || ''
        }
      }
      return {
        // requestId: _context.switchToHttp().getRequest().requestId,
        data,
        state: 200,
        msg: '请求成功'
      }
    }))
  }
}
