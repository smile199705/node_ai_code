import * as chalk from 'chalk'
export function start_printf (): void {
  const log = console.log
  log(chalk.red.bold(' 🚀 node-axle....     启动了... 🙏 '))
  log(chalk.red.bold(' 🍷  '))
  log(chalk.red.bold(`http://127.0.0.1:${process.env.SERVE_LISTENER_PORT}/${process.env.NODE_ENV}/axle/`))
}
