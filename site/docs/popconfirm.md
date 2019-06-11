## Popconfirm 气泡确认框

弹出气泡式的确认框。

### 基本用法

::: demo
```js
onCancel() {
  Toast('取消')
}

onConfirm() {
  Toast('确认')
}

render() {
  return (
    <Popconfirm onCancel={this.onCancel.bind(this)} onConfirm={this.onConfirm.bind(this)}><Button type='link'>删除</Button></Popconfirm>
  )
}
```
:::

### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| className | 容器类名 | string | — | — |
| style | 指定样式 | object | — | — |
| cancelText | 取消按钮文字 | string | — | 取消 |
| okText | 确认按钮文字 | string | — | 确认 |
| okType | 确认按钮类型 | string | primary/link/default/success/info/warning/danger | primary |
| icon | 自定义弹出气泡 Icon 图标 | string | — | warningcircle |
| title | 确认框的描述 | string/ReactNode | — | — |
| placement | 浮窗出现的位置 | string | top/top-start/top-end/bottom/bottom-start/bottom-end/left/left-start/left-end/right/right-start/right-end | top |

### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| onConfirm | 点击确认的回调 | () => void |
| onCancel | 点击取消的回调 | () => void |
