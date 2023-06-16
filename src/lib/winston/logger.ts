import { WinstonService } from './winston.service'
// eslint-disable-next-line @typescript-eslint/no-require-imports
const httpContext = require('express-http-context')
import * as moment from 'moment'

export class Logger extends WinstonService {
	constructor () {
		super()
	}
}
