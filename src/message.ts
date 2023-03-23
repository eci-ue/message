/**
 * @file 提示框
 * @author svon.me@gmail.com
 */

import { Message } from "./type";
import { confirm as alert } from "@ue/model";

import type { Component } from "vue";
import type { AntdMessage } from "./type";
import type { VueNode } from "ant-design-vue/lib/_util/type";
import type { ConfigOnClose, MessageArgsProps, MessageType } from "ant-design-vue/lib/message/index";


const message: Message = new Message();

export const setMessage = function(value: Message | AntdMessage) {
  message.setMessage(value as AntdMessage);
  if (value.success) {
    message.setSuccess(value.success);
  }
  if (value.error) {
    message.setError(value.error);
  }
  if (value.loading) {
    message.setLoading(value.loading);
  }
};

export const noConflict = function(): AntdMessage {
  return message.getMessage();
}

export const loading = function(content: VueNode | MessageArgsProps, duration?: number, onClose?: ConfigOnClose): MessageType | undefined {
  if (message.loading) {
    return message.loading(content, duration, onClose);
  }
};
export const success = function(content: VueNode | MessageArgsProps, duration?: number, onClose?: ConfigOnClose): MessageType | undefined {
  if (message.success) {
    return message.success(content, duration, onClose);
  }
};
export const error = function (content: VueNode | MessageArgsProps, duration?: number, onClose?: ConfigOnClose): MessageType | undefined {
  if (message.error) {
    return message.error(content, duration, onClose);
  }
};

/**
 * 确认提示框
 * @param value 提示内容或者组件 
 * @param props 如果提示内容为组件时传给组件的参数
 * @returns 
 */
export const confirm = function(value: string | Component | VueNode, props?: object): Promise<boolean> {
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
    alert<string | Component | VueNode>(value, config, props);
  })
};