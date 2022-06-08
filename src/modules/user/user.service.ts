import { Injectable } from '@nestjs/common';
import { ApiRequest } from '../../utils/axios_http';

@Injectable()
export class UserService {
  public async testDemo() {
    console.log(ApiRequest, '=========');
    const res = await ApiRequest.get('/node/live/rank_switch_info', {});
    console.log(res, '这是返回数据');
    return res;
  }
}
