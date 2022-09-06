import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

/**
 * 定义好基础拦截器后，我们需要改造我们传入的插入的类型，因为axios提供的AxiosRequestConfig是不允许我们传入拦截器的，
 * 所以说我们自定义了RequestConfig，让其继承与AxiosRequestConfig。
 */

export interface RequestInterceptors {
  // 请求拦截（最先执行）
  requestInterceptors?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  requestInterceptorsCatch?: (error: any) => any;

  // 响应拦截（最后执行）
  responseInterceptors?: <T = AxiosResponse>(config: T) => T;
  responseInterceptorsCatch?: (error: any) => any;
}

export interface RequestConfig extends AxiosRequestConfig {
  interceptors?: RequestInterceptors;
}
