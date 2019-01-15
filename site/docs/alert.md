## Alert 警告

用于页面中展示重要的提示信息。

### 基本用法

页面中的非浮层元素，不会自动消失。

::: demo Alert 组件提供四种主题，由`type`属性指定，默认值为`info`。
```js
render() {
  return (
    <div className="demo-alert">
      <Alert title="成功提示的文案" type="success" />
      <Alert title="消息提示的文案" type="info" />
      <Alert title="警告提示的文案" type="warning" />
      <Alert title="错误提示的文案" type="error" />
    </div>
  )
}
```
:::

### 自定义关闭按钮

自定义关闭按钮为文字或其他符号。

::: demo 在 Alert 组件中，你可以设置是否可关闭，关闭按钮的文本以及关闭时的回调函数。`closable`属性决定是否可关闭，接受`boolean`，默认为`true`。你可以设置`closeText`属性来代替右侧的关闭图标，注意：`closeText`必须为文本。设置`onClose`事件来设置关闭时的回调。
```js
render() {
  return (
    <div>
      <Alert title="不可关闭的 alert" type="success" closable={false} />
      <Alert title="自定义 close-text" type="info" closeText="知道了" />
      <Alert title="设置了回调的 alert" type="warning" onClose={() => alert('Hello World!')}/>
    </div>
  )
}
```
:::

### 带有 icon

表示某种状态时提升可读性。

::: demo 通过设置`showIcon`属性来显示 Alert 的 icon，这能更有效地向用户展示你的显示意图。
```js
render() {
  return (
    <div>
      <Alert title="成功提示的文案" type="success" showIcon />
      <Alert title="消息提示的文案" type="info" showIcon />
      <Alert title="警告提示的文案" type="warning" showIcon />
      <Alert title="错误提示的文案" type="error" showIcon />
    </div>
  )
}
```
:::

### 带有辅助性文字介绍

包含标题和内容，解释更详细的警告。

::: demo 除了必填的`title`属性外，你可以设置`desc`属性来帮助你更好地介绍，我们称之为辅助性文字。辅助性文字只能存放单行文本，会自动换行显示。
```js
render() {
  return (
    <Alert
      type="success"
      title="带辅助性文字介绍"
      desc="这是一段带辅助性文字介绍……这是一段带辅助性文字介绍……这是一段带辅助性文字介绍……这是一段带辅助性文字介绍……这是一段带辅助性文字介绍……这是一段带辅助性文字介绍……这是一段带辅助性文字介绍……这是一段带辅助性文字介绍……这是一段带辅助性文字介绍……这是一段带辅助性文字介绍……" />
  )
}
```
:::

### 带有 icon 和辅助性文字介绍

::: demo 最后，这是一个同时具有 icon 和辅助性文字的样例。
```js
render() {
  return (
    <div>
      <Alert title="成功提示的文案" type="success" desc="文字说明文字说明文字说明文字说明文字说明文字说明"  showIcon />
      <Alert title="消息提示的文案" type="info" desc="文字说明文字说明文字说明文字说明文字说明文字说明" showIcon />
      <Alert title="警告提示的文案" type="warning" desc="文字说明文字说明文字说明文字说明文字说明文字说明" showIcon />
      <Alert title="错误提示的文案" type="error" desc="文字说明文字说明文字说明文字说明文字说明文字说明" showIcon />
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
| **title** | 标题，**必选参数** | string | — | — |
| type | 主题 | string | success/warning/info/error | info |
| desc | 辅助性文字 | string | — | — |
| closable | 是否可关闭 | boolean | — | true |
| closeText | 关闭按钮自定义文本 | string | — | — |
| showIcon | 是否显示图标 | boolean | — | false |


### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| onClose | 关闭alert时触发的事件 | — |
