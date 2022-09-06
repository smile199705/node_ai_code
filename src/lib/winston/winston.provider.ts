import { Provider } from '@nestjs/common'
import { WINSTON_PROVIDER } from './constants'
import { WinstonService } from './winston.service'

export const WinstonProvider: Provider = {
    provide: WINSTON_PROVIDER,
    useFactory: (config): WinstonService => {
        return new WinstonService(config)
    }
}
