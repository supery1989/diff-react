## 快速上手

### 安装

使用 npm 的方式安装

```shell
npm i dru --save
```

### 使用

```js
import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'dru';

ReactDOM.render(<Button type='primary'>Hello dru</Button>, document.getElementById('app'));
```

#### 组件冲突

重新取一个名字

```js
import { Button as CustomButton } from 'dru';
```