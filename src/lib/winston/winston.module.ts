import { DynamicModule, Global, Module } from '@nestjs/common'
import { WinstonProvider } from './winston.provider'
import { WINSTON_PROVIDER } from './constants'

@Global()
@Module({
  providers: [WinstonProvider],
  exports: [WinstonProvider]
})
export class WinstonModule {
  public static forRoot (config): DynamicModule {
    const providers = [{ provide: WINSTON_PROVIDER, useValue: config }] // 这是用LOG4JS_CONFIG常量做为传入的config的key,方便调用， 与provider中的一一对应
    return {
      module: WinstonModule,
      providers: providers,
      exports: providers
    }
  }
}
