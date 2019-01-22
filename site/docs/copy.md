## Copy 复制

将文本到剪切板。

### 基本用法

可以将准备复制的内容指定为value属性的值，即可复制

::: demo
```js
text = '复制了'
render() {
  return (
    <div>
      <div>{this.text}</div>
      <Copy value={this.text}><Button text="复制" /></Copy>
    </div>
  )
}
```
:::

### 复制动作的回调

::: demo
```js
text = '复制我'

onCopy = (result: object) => {
  if (result.success) {
    Popup({
      type: 'success',
      title: '复制成功'
    })
  } else {
    Popup({
      type: 'error',
      message: result.reason
    })
  }
}

render() {
  return (
    <div>
      <div>{this.text}</div>
      <Copy value={this.text} onCopy={this.onCopy}><Button text="复制" /></Copy>
    </div>
  )
}
```
:::

### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| className | 容器类名 | string | — | — |
| style | 指定样式 | object | - | - |
| value | 即将被复制的内容 | any | - | - |
| showStatus | 是否显示已复制状态 | boolean | - | true |

### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| onCopy | 复制动作的回调 | (reason: object) => void |
