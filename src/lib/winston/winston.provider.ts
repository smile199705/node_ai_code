import { Provider } from '@nestjs/common'
import { WINSTON_CONFIG, WINSTON_PROVIDER } from './constants'
import { WinstonService } from './winston.service'
import { WinstonConfig } from './winston.config'

export const WinstonProvider: Provider = {
    provide: WINSTON_PROVIDER,
    useFactory: (): WinstonService => {
        return new WinstonService()
    },
    inject: [{ token: WINSTON_CONFIG, optional: true }] // 这里引入的是key为WINSTON_CONFIG的服务
}
