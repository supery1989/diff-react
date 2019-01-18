## Popup 弹出框

模态对话框。

### 基本用法

::: demo
```js
open = () => {
  Popup.alert({
    title: 'Alert',
    message: '这是一条信息',
    onOk: () => {
      Toast({
        message: '提交了',
      })
    },
  })
}

render() {
  return (
    <Button text="消息对话框" onClick={this.open} />
  )
}
```
:::

### 确认对话框

::: demo 可通过icon属性自定义图标
```js
open = () => {
  Popup.confirm({
    title: 'Confirm',
    message: (<div>这是一条信息</div>),
  })
}

open2 = () => {
  Popup.confirm({
    title: '自定义图标',
    message: (<div>这是一条信息</div>),
    icon: 'user'
  })
}

render() {
  return (
    <div>
      <Button text="确认对话框" onClick={this.open} />
      <Button text="自定义图标" onClick={this.open2} />
    </div>
  )
}
```
:::

### 信息提示对话框

::: demo
```js
open = () => {
  Popup.success({
    title: 'Success',
    message: '这是一条信息'
  })
}

open2 = () => {
  Popup.warning({
    title: 'Warning',
    message: '这是一条信息'
  })
}

open3 = () => {
  Popup.info({
    title: 'Info',
    message: '这是一条信息'
  })
}

open4 = () => {
  Popup.error({
    title: 'Error',
    message: '这是一条信息'
  })
}

render() {
  return (
    <div>
      <Button text="Success" onClick={this.open} />
      <Button text="Warning" onClick={this.open2} />
      <Button text="Info" onClick={this.open3} />
      <Button text="Error" onClick={this.open4} />
    </div>
  )
}
```
:::

### 自定义按钮样式

取消按钮通过设置cancelBtnStyle自定义样式，确定按钮通过okBtnStyle自定义样式。

::: demo
```js
open = () => {
  Popup.confirm({
    title: '按钮变样了',
    message: '这是一条信息',
    cancelBtnStyle: {background: 'red'},
    okBtnStyle: {background: 'green'}
  })
}

render() {
  return (
    <Button text="消息对话框" onClick={this.open} />
  )
}
```
:::

### 自定义按钮属性

取消按钮通过设置cancelBtnProps自定义样式，确定按钮通过okBtnProps自定义样式。props参考按钮props。

::: demo
```js
open = () => {
  Popup.confirm({
    title: '按钮变样了',
    message: '这是一条信息',
    cancelBtnProps: {disabled: true},
    okBtnProps: {disabled: true},
  })
}

render() {
  return (
    <Button text="消息对话框" onClick={this.open} />
  )
}
```
:::

### 异步关闭

调用Popup组件会返回一个实例，异步操作中可以调用它的close方法手动关闭弹窗，失败时可以通过fail方法再次回调。同时使用confirmLoading可以设置按钮为加载中状态。

::: demo 设置confirmLoading后右上角按钮将会没有，同时加载中状态点击浮层也将不能关闭弹窗
```js
open = () => {
  const test = Popup({
    title: 'Alert',
    message: '这是一条信息',
    confirmLoading: true,
    top: 100,
    onOk: () => {
      setTimeout(() => {
        test.close()
      }, 3000)
    }
  })
}

open2 = () => {
  const test = Popup({
    title: 'Alert',
    message: '这是一条信息',
    confirmLoading: true,
    onOk: () => {
      setTimeout(() => {
        test.fail('失败')
      }, 3000)
    }
  })
}

render() {
  return (
    <div>
      <Button text="异步成功" onClick={this.open} />
      <Button text="异步失败" onClick={this.open2} />
    </div>
  )
}
```
:::

### 自定义弹窗样式

可以通过width、top简单设置，也可通过style、maskClosable进行复杂设置

::: demo
```js
open = () => {
  const test = Popup({
    title: 'Alert',
    message: '这是一条信息',
    width: 800
  })
}

open2 = () => {
  const test = Popup({
    title: 'Alert',
    message: '这是一条信息',
    top: 100
  })
}

open3 = () => {
  const test = Popup({
    title: 'Alert',
    message: '这是一条信息',
    style: {
      background: 'red'
    }
  })
}

render() {
  return (
    <div>
      <Button text="修改弹窗宽度" onClick={this.open} />
      <Button text="修改弹窗距离顶部距离" onClick={this.open2} />
      <Button text="修改弹窗背景色" onClick={this.open3} />
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
| okBtnText | 确定按钮的文本内容 | string | - | 确 定 |
| cancelBtnText | 取消按钮的文本内容 | string | - | 取 消 |
| showOkBtn | 是否显示确定按钮 | boolean | - | true |
| showCancelBtn | 是否显示取消按钮 | boolean | - | false |
| okBtnStyle | 自定义确定按钮的样式 | object | - | - |
| cancelBtnStyle | 自定义取消按钮的样式 | object | - | - |
| okBtnProps | 确定按钮的props | ButtonProps | - | - |
| cancelBtnProps | 取消按钮的props | ButtonProps | - | - |
| title | 弹出框标题 | string | - | - |
| closable | 是否显示右上角的关闭按钮 | boolean | - | true |
| message | 消息正文内容 | string/消息正文内容 | - | - |
| type | 弹窗类型，共内置了6种 | string | alert/confirm/success/warning/info/error | alert |
| icon | 自定义图标 | string | - | - |
| confirmLoading | 确定按钮 loading	| boolean | - | - |
| maskClosable | 点击蒙层是否可以关闭 | boolean | - | true |
| width | 弹出框宽度 | number | - | 400 |
| maskStyle | 遮罩样式 | object | - | - |
| top | 距离顶部距离，不设置默认垂直居中 | number | - | - |

### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| onClose | 关闭toast时触发的事件 | — |
| onOk | 点击确定按钮回调 | — |
| onCancel | 点击遮罩层或右上角叉或取消按钮的回调 | — |
| fail | 异步失败时的手动方法，可用于显示错误信息 | — |
| close | 手动关闭弹窗方法 | — |
