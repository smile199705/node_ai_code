import { Injectable } from '@nestjs/common'
import { ApiRequest } from '../../utils/axios_http'
import { rethrow } from '@nestjs/core/helpers/rethrow'


@Injectable()
export class UserService {
  public async testDemo (): Promise<any> {
      const res = await ApiRequest.httpRequest({ baseURL: 'http://10.111.1.65:30801', url: '/node/live/rank_switch_info' })
      // return rethrow('横说竖说')
      return res
  }
}
