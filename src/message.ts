/**
 * @file 提示框
 * @author svon.me@gmail.com
 */

import { confirm as alert } from "@ue/model";

import type { Component } from "vue";
import type { VueNode } from "ant-design-vue/lib/_util/type";
import type { ConfigOnClose, MessageArgsProps, MessageType } from "ant-design-vue/lib/message/index";

interface Message {
  loading: (content: VueNode | MessageArgsProps, duration?: number, onClose?: ConfigOnClose) => MessageType;
  success: (content: VueNode | MessageArgsProps, duration?: number, onClose?: ConfigOnClose) => MessageType;
  error: (content: VueNode | MessageArgsProps, duration?: number, onClose?: ConfigOnClose) => MessageType;
}

let message: Message;

export const setMessage = function(value: Message) {
  message = value;
};

export const loading = function(content: VueNode | MessageArgsProps, duration?: number, onClose?: ConfigOnClose) {
  return message?.loading(content, duration, onClose);
};
export const success = function(content: VueNode | MessageArgsProps, duration?: number, onClose?: ConfigOnClose) {
  return message?.success(content, duration, onClose);
};
export const error = function (content: VueNode | MessageArgsProps, duration?: number, onClose?: ConfigOnClose) {
  return message?.error(content, duration, onClose);
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