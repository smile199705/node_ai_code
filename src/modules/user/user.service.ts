import { Injectable } from '@nestjs/common'
import { ApiRequest } from '../../utils/axios_http'

@Injectable()
export class UserService {
  public async testDemo (): Promise<any> {
    const res = await ApiRequest.httpRequest({ baseURL: 'http://10.111.1.65:30801', url: '/node/live/rank_switch_info' })
    console.log('测试测试。。。')
    return res
  }
}
