## Notification 通知

全局展示通知提醒信息。

### 基本用法

基本用法。

::: demo
```js
open = ()=> {
  Notification({
    title: '可以自动关闭',
    message: '3秒后可以自动关闭',
  })
}

open2 = ()=> {
  Notification({
    title: '不能自动关闭',
    message: '这是提示文案',
    during: 0
  })
}

render() {
  return (
    <div>
      <Button onClick={this.open} text="自动关闭" />
      <Button onClick={this.open2} text="手动关闭" />
    </div>
  )
}
```
:::

### 关闭时的回调

消息关闭时可以通过onClose指定回调事件。

::: demo
```js
open = ()=> {
  Notification({
    title: '标题名称',
    message: '这是提示文案',
    onClose: ()=> {
      alert('close')
    }
  })
}
render() {
  return (
    <div>
      <Button onClick={this.open} text="打开消息提示" />
    </div>
  )
}
```
:::


### 不同类型

用来显示「成功、警告、消息、错误」类的系统消息。

::: demo 当需要自定义更多属性时，Notification 也可以接收一个对象为参数。比如，设置type字段可以定义不同的状态。此时正文内容以message的值传入。同时，我们也为 Notification 的各种 type 注册了方法，可以在不传入type字段的情况下像open4那样直接调用。
```js
open1() {
  Notification({
    title: '成功',
    message: '这是一条成功消息',
    type: 'success'
  });
}

open2() {
  Notification({
    title: '警告',
    message: '这是一条警告消息',
    type: 'warning'
  });
}

open3() {
  Notification({
    title: '消息',
    message: '这是一条消息提示',
    type: 'info',
  });
}

open4() {
  Notification.error({
    title: '错误',
    message: '这是一条错误消息'
  });
}
render() {
  return (
    <div>
      <Button onClick={this.open1} text="Success" />
      <Button onClick={this.open2} text="Warning" />
      <Button onClick={this.open3} text="Info" />
      <Button onClick={this.open4} text="Error" />
    </div>
  )
}
```
:::

### 指定消息提示位置

可以自己设定消息提示出现的位置

::: demo 可通过设置position属性来指定Notification的位置，可选topLeft topRight bottomLeft bottomRight三种内置，也可以使用如'top: 50px'形式键值对进行设置
```js
open = pos => {
  Notification({
    type: 'success',
    title: pos,
    message: '这是一个消息',
    position: pos
  })
}

open2 = () => {
  Notification({
    type: 'success',
    title: '自定义位置',
    message: '这是哪里',
    position: 'top: 50px;left: 100px;',
  })
}

render() {
  return (
    <div>
      <Button onClick={this.open.bind(this, 'topLeft')} text="出现在页面左上角" />
      <Button onClick={this.open.bind(this, 'topRight')} text="出现在页面右上角" />
      <Button onClick={this.open.bind(this, 'bottomLeft')} text="出现在页面左下角" />
      <Button onClick={this.open.bind(this, 'bottomRight')} text="出现在页面有下角" />
      <Button onClick={this.open2} text="自己指定位置" />
    </div>
  )
}
```
:::

### 自定义图标

使用自定义图标。

::: demo 通过设置custom可以使用自定义图标。
```js
open = () => {
  Notification({
    title: '自定义图标',
    message: '这是一个消息',
    custom: (<Icon type="user" />)
  })
}

render() {
  return (
    <div>
      <Button onClick={this.open} text="自定义图标" />
    </div>
  )
}
```
:::

### 自定义按钮

使用自定义按钮。

::: demo 通过设置btn可以使用自定义按钮。
```js
open = () => {
  const btn = (
    <Button type="primary" size="small" text="关闭" onClick={() => alert('custom')} />
  );

  Notification({
    type: 'success',
    title: '自定义关闭按钮',
    message: '这是一个消息',
    btn,
  })
}

render() {
  return (
    <div>
      <Button onClick={this.open} text="自定义关闭按钮" />
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
| title | 标题 | string | - | - |
| message | 消息文字 | string/ReactElement | - | - |
| during | 自动关闭的延时, 单位毫秒。设为 0 则不会自动关闭 | number | — | 3000 |
| type | 主题 | string | success/warning/info/error | info |
| custom | 自定义图标 | ReactNode | - | - |
| position | 消息弹出的位置 | topLeft/topRight/bottomLeft/bottomRight/自定义css键值对 | — | topRight |
| btn | 自定义按钮 | ReactNode | - | - |

### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| onClose | 关闭toast时触发的事件 | — |
