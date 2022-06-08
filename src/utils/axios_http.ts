import axios, { AxiosResponse } from 'axios';
import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import type { RequestConfig, RequestInterceptors } from './types';
import * as qs from 'qs';
import { HttpCode, HttpException, HttpStatus } from '@nestjs/common';

/**
 * 拦截顺序:
 *    实例请求 --》 类请求 --》 实例响应 --》 类响应,这样就可以在实例拦截上作出一些不同的拦截
 */
interface IResponse {
  status: number;
  data: {
    type: 'success' | 'fail' | 'info';
    message: string;
    [key: string]: any;
  };
}

class Request {
  // axios实例
  static instance: Request;
  private request: AxiosInstance;
  interceptorsObj?: RequestInterceptors;

  // 单例模式，实现当前类，实例化一个对象
  public static getInstance(
    config: AxiosRequestConfig = {
      baseURL: 'http://10.111.1.65:30801',
      timeout: 5000,
    },
  ) {
    if (!this.instance) {
      // 无创建实例，则创建
      this.instance = new Request(config);
    }
    return this.instance;
  }
  constructor(config: AxiosRequestConfig) {
    this.request = axios.create(config);
    // this.interceptorsObj = config.interceptors;

    // 请求拦截器
    this.request.interceptors.request.use(
      // 全局请求拦截器
      (res: AxiosRequestConfig) => {
        // 成功
        console.log('全局请求拦截器');
        return res;
      },
      (error: any) => error,
    );

    /**
     * 实例拦截器
     */
    // 使用实例拦截器
    this.request.interceptors.request.use(
      this.interceptorsObj?.requestInterceptors,
      this.interceptorsObj?.requestInterceptorsCatch,
    );
    this.request.interceptors.response.use(
      this.interceptorsObj?.requestInterceptors,
      this.interceptorsObj?.requestInterceptorsCatch,
    );

    // 响应拦截器
    this.request.interceptors.response.use(
      // 因为返回的数据都在res.data下面，所以直接返回res.data
      (res: AxiosRequestConfig) => {
        return res.data ? res.data : res;
      },
      (error: any) => error,
    );
  }

  requestTest(config: AxiosRequestConfig) {
    return this.request.request(config);
  }

  public async get(
    path: string,
    query: { [key: string]: any },
  ): Promise<{ [key: string]: any }> {
    const url = (path += query ? `?${qs.stringify(query)}` : '');
    // let result = {};
    try {
      console.log(url);
      const res: IResponse = await this.request.get(url);
      return res;
    } catch (e) {
      console.log(e);
    }
    // return result;
  }

  public async post(
    path: string,
    data: { [key: string]: any },
  ): Promise<{ [key: string]: any }> {
    const url = path;
    let result = {};
    try {
      const { data: res }: IResponse = await this.request.post(
        url,
        qs.stringify(data),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'state-in-body': 'true',
          },
        },
      );
      result = res;
    } catch (e) {
      console.log(e);
    }
    return result;
  }
}

export const ApiRequest = Request.getInstance();
