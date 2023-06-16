import * as chalk from 'chalk'
export function start_printf (): void {
	const log = console.log
	log(chalk.red.bold(' 🚀 axlejs_ai_code....     启动了... 🙏 '))
	log(chalk.red.bold(' 🍷 项目地址（github）： https://github.com/smile199705/axlejs_ai_code.git'))
	log()
	log(chalk.red.bold(`              http://127.0.0.1:${process.env.SERVE_LISTENER_PORT}/${process.env.NODE_ENV}/axle/`))
	log()
}
