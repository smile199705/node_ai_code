import { DynamicModule, Module } from '@nestjs/common'
import { WinstonProvider } from './winston.provider'
import { WINSTON_CONFIG } from './constants'

@Module({
  providers: [WinstonProvider],
  exports: [WinstonProvider]
})
export class WinstonModule {
  public static withConfig (config): DynamicModule {
    const providers = [{ provide: WINSTON_CONFIG, useValue: config }]
    return {
      module: WinstonModule,
      providers: providers,
      exports: providers
    }
  }
}
