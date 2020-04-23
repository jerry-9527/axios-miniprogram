/*
 * @Author: early-autumn
 * @Date: 2020-04-15 17:50:50
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-23 09:16:23
 */
import {
  InterceptorResolved,
  InterceptorRejected,
  Interceptor,
  InterceptorExecutor,
  InterceptorManager,
} from '../types';

/**
 * 拦截器管理器
 */
export default class InterceptorManagerStatic<T> implements InterceptorManager<T> {
  /**
   * 生成拦截器 id
   */
  private _id: number;

  /**
   * 拦截器集合
   */
  private _interceptors: Record<number, Interceptor<T>>;

  constructor() {
    this._id = 0;
    this._interceptors = {};
  }

  /**
   * 添加拦截器
   *
   * @param resolved 成功的回调函数
   * @param rejected 失败的回调函数
   */
  public use(resolved: InterceptorResolved<T>, rejected?: InterceptorRejected) {
    this._interceptors[++this._id] = {
      resolved,
      rejected,
    };

    return this._id;
  }

  /**
   * 删除拦截器
   *
   * @param id 拦截器 id
   */
  public eject(id: number): void {
    delete this._interceptors[id];
  }

  /**
   * 遍历所有拦截器
   *
   * @param executor 拦截器执行器
   * @param reverse  是否倒序遍历
   */
  public forEach(executor: InterceptorExecutor<T>, reverse?: 'reverse'): void {
    let interceptors: Interceptor<T>[] = Object.values(this._interceptors);

    if (reverse === 'reverse') {
      interceptors = interceptors.reverse();
    }

    interceptors.forEach(executor);
  }
}
