<h1 align="center">@ue/message</h1>

<div align="center">
  <h3>基于 Ant Design 而封装的消息提示框</h3>
  <p>简单配置，快速开发</p>
</div>

## 安装

```
pnpm install @ue/message --registry http://npm.jslion.xyz/
```

**使用**

```
import { success, error } from "@ue/message";
```

## 案例

```
import { success } from "@ue/message";

const onClick = function() {
  success("Successfully!");
}
```

```
import { $success, $error } from "@ue/message";

class Test {
  @$error()
  @$success("Successfully!")
  message() {
    if (...) {
      // todo success
      return;
    } else {
      throw new Error("error: xxxx");
    }
  }
}
```
