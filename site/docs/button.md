## Button 按钮

用于开始一个即时操作。

### 基本用法

::: demo
```js
render() {
  return (
    <Button text="btn" />
  )
}
```
:::

### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| className | 容器类名 | string | — | — |
| style | 指定样式 | object | - | - |
| loading | 设置按钮载入状态 | boolean | - | false |
| type | 设置按钮类型 | string | default/primary/success/info/warning/danner/link | default |
| href | 点击跳转的地址，type为link时可设置 | string | — | - |
| target | 相当于 a 链接的 target 属性，href 存在时生效 | string | — | - |
| disabled | 按钮失效状态 | boolean | — | false |
| text | 按钮的文本 | string | - | - |
| size | 设置按钮大小，可选值为 small large 或者不设 | string | - | - |
| plain | 是否为朴素 | boolean | - | false |
| round | 是否圆角 | boolean | - | false |
| circle | 是否原型 | boolean | - | false |
| icon | 设置按钮的图标类型 | string | - | - |
| nativeType | 原生类型 | submit/reset | - | - |

### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| onClick | 点击按钮时的回调 | (event) => void |
| onMouseLeave | 鼠标离开按钮时的回调 | (event) => void |
