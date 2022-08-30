import {
  Injectable,
  NestInterceptor,
  CallHandler,
  ExecutionContext
} from '@nestjs/common'
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs'
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
