/**
 * @file 提示框
 * @author svon.me@gmail.com
 */

import { confirm as alert } from "@ue/model";
import message from "ant-design-vue/lib/message/index";

import type { Component } from "vue";

const loading = message.loading;
const success = message.success;
const error = message.error;

/**
 * 确认提示框
 * @param value 提示内容或者组件 
 * @param props 如果提示内容为组件时传给组件的参数
 * @returns 
 */
export const confirm = function(value: string | Component, props?: object): Promise<boolean> {
  return new Promise(function(resolve) {
    const config = {
      title: 'Confirm',
      width: 400,
      onCancel: function() {
        resolve(false);
      },
      onOk: function() {
        resolve(true);
      }
    };
    alert<string | Component>(value, config, props);
  })
};

export {
  error,
  loading,
  success,
}