import { Inject, Injectable } from '@nestjs/common'
import { ApiRequest } from '../../utils/axios_http'
import { rethrow } from '@nestjs/core/helpers/rethrow'
import { Logger } from '../../lib/winston/logger'


@Injectable()
export class UserService {
	constructor (@Inject(Logger) private readonly logger: Logger) {
	}
	public async testDemo (): Promise<any> {
		const res = await ApiRequest.httpRequest({ baseURL: 'http://10.111.1.169:32542', url: '/auto_send_reward/list', method: 'get', params: { start: 0, length: 10 } } )
		// this.logger.info(res)
		return res
	}
}
