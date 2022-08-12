import { Injectable } from '@nestjs/common'
import { ApiRequest } from '../../utils/axios_http'

@Injectable()
export class UserService {
  public async testDemo() {
    const res = await ApiRequest.get('/node/live/rank_switch_info', {})
    return res
  }
}
