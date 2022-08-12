export function start_printf (): void {
  const log = console.log
  log('node-axle....     启动了...  🚀')
  log(`http://127.0.0.1:${process.env.NODE_ENV}/axle/`)
}
