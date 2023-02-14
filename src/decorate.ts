/**
 * @file 消息装饰器
 * @author svon.me@gmail.com
 * @description 根据某些场景做一些处理
 */

import * as message from "./message";
/**
 * 异常提示
 * @param tips 提示内容，为空时提示 error.message 或者默认值
 */
export const $error = function (tips?: string) {
  return function (target: any, methodName: string, descriptor: PropertyDescriptor) {
    const app = descriptor.value;
    descriptor.value = async function (...args: any[]) {
      try {
        // 监听程序逻辑
        return await app.apply(this, args);
      } catch (e) {
        // 提示异常信息
        // @ts-ignore
        const value = (e?.message) || tips;
        message.error(value || "Network error");
        // 继续向上暴露异常
        return Promise.reject(e);
      }
    };
  };
};

/**
 * 成功信息提示
 * @param tips 提示内容，为空时装饰器不生效
 */
export const $success = function (tips?: string) {
  return function (target: any, methodName: string, descriptor: PropertyDescriptor) {
    if (tips) {
      const app = descriptor.value;
      descriptor.value = async function (...args: any[]) {
        // 等待程序执行完毕
        const value = await app.apply(this, args);
        // 提示成功信息
        message.success(tips);
        return value;
      };
    }
  };
};
