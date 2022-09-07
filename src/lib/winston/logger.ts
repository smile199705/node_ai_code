import { WinstonService } from './winston.service'


export class Logger extends WinstonService {
    constructor (options) {
        super(options)
    }
}
