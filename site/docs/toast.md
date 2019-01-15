## Toast 消息提示

全局展示操作反馈信息。

### 基本用法

从顶部出现，3 秒后自动消失。

::: demo 
```js
open = ()=> {
  Toast("这是一条消息")
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

用来显示「成功、警告、消息、错误」类的操作反馈。

::: demo 当需要自定义更多属性时，Toast 也可以接收一个对象为参数。比如，设置type字段可以定义不同的状态，默认为info。此时正文内容以message的值传入。同时，我们也为 Toast 的各种 type 注册了方法，可以在不传入type字段的情况下像open4那样直接调用。
```js
open1() {
  Toast({
    message: '这是一条成功消息',
    type: 'success'
  });
}

open2() {
  Toast({
    message: '这是一条警告消息',
    type: 'warning'
  });
}

open3() {
  Toast('这是一条消息提示');
}

open4() {
  Toast.error('这是一条错误消息');
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

### 可以关闭

可以添加关闭按钮。

::: demo 设置showClose字段可以添加关闭按钮。
```js
open = () => {
  Toast({
    type: 'success',
    message: '这是一个可以关闭的消息',
    during: 0,
    showClose: true,
    onClose: () => {
      alert('close')
    }
  })
}

render() {
  return (
    <div>
      <Button onClick={this.open} text="我有回调" />
    </div>
  )
}
```
:::

### 指定消息提示位置

可以自己设定消息提示出现的位置

::: demo 可通过设置position属性来指定toast的位置，可选top，bottom，middle三种内置，也可以使用如'top: 50px'形式键值对进行设置
```js
open = pos => {
  Toast({
    type: 'success',
    message: '这是一个消息',
    during: 0,
    showClose: true,
    position: pos
  })
}

open2 = () => {
  Toast({
    type: 'success',
    message: '这是哪里',
    during: 0,
    showClose: true,
    position: 'top: 50px',
  })
}

render() {
  return (
    <div>
      <Button onClick={this.open.bind(this, 'bottom')} text="出现在页面底部" />
      <Button onClick={this.open.bind(this, 'middle')} text="出现在页面中间" />
      <Button onClick={this.open2} text="自己指定位置" />
    </div>
  )
}
```
:::

### 自定义指示符

使用自定义指示符。

::: demo 通过设置custom可以使用自定义指示符。
```js
open = () => {
  Toast({
    type: 'success',
    message: '这是一个消息',
    during: 0,
    showClose: true,
    custom: (<Icon type="user" />)
  })
}

render() {
  return (
    <div>
      <Button onClick={this.open} text="自定义指示符" />
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
| type | 主题 | string | success/warning/info/error | info |
| message | 消息文字 | string/ReactElement | - | - |
| during | 自动关闭的延时, 单位毫秒。设为 0 则不会自动关闭 | number | — | 3000 |
| showClose | 是否显示关闭按钮 | boolean | — | false |
| position | 消息提示的位置 | top/bottom/middle/自定义css键值对 | — | top |
| custom | 自定义图标 | ReactNode | - | - |

### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| onClose | 关闭toast时触发的事件 | — |