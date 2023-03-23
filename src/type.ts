
import safeGet from "@fengqiaogang/safe-get";
import antdMessage from "ant-design-vue/lib/message/index";

import type { VueNode } from "ant-design-vue/lib/_util/type";
import type { ConfigOnClose, MessageArgsProps, MessageType } from "ant-design-vue/lib/message/index";

export type AntdMessage = typeof antdMessage;
type MessageFunction = (content: VueNode | MessageArgsProps, duration?: number, onClose?: ConfigOnClose) => MessageType;

export class Message {
  loading?: MessageFunction;
  success?: MessageFunction;
  error?: MessageFunction;
  private value?: AntdMessage;
  constructor(success?: MessageFunction, error?: MessageFunction, loading?: MessageFunction) {
    this.setSuccess(success);
    this.setError(error);
    this.setLoading(loading);
  }
  setMessage (value: AntdMessage) {
    this.value = value;
  }
  getMessage (): AntdMessage {
    if (this.value) {
      return this.value;
    }
    if (safeGet<AntdMessage>(antdMessage, "default")) {
      return safeGet<AntdMessage>(antdMessage, "default")!;
    }
    return antdMessage;
  }
  setSuccess(value?: MessageFunction) {
    if (value && typeof value === "function") {
      this.success = value;
    } else if (antdMessage?.success && typeof antdMessage.success === "function"){
      this.success = antdMessage.success;
    } else {
      this.success = safeGet<MessageFunction>(antdMessage, "default.success");
    }
  }
  setError(value?: MessageFunction) {
    if (value && typeof value === "function") {
      this.error = value;
    } else if (antdMessage?.error && typeof antdMessage.error === "function"){
      this.error = antdMessage.error;
    } else {
      this.error = safeGet<MessageFunction>(antdMessage, "default.error");
    }
  }
  setLoading(value?: MessageFunction) {
    if (value && typeof value === "function") {
      this.loading = value;
    } else if (antdMessage?.loading && typeof antdMessage.loading === "function"){
      this.loading = antdMessage.loading;
    } else {
      this.loading = safeGet<MessageFunction>(antdMessage, "default.loading");
    }
  }
}