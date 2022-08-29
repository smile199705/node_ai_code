import { Injectable } from '@nestjs/common'
import { ApiRequest } from '../../utils/axios_http'
import { throws } from 'assert'

@Injectable()
export class UserService {
  public async testDemo (): Promise<any> {
    try {
      const res = await ApiRequest.httpRequest({ baseURL: 'http://10.111.1.65:308012', url: '/node/live/rank_switch_info' })
      return res
    } catch (e) {
      console.log(e, '==================')
    }
  }
}
