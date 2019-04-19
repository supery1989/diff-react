## Input 输入框

通过鼠标或键盘输入内容。

### 基本用法

::: demo
```js
render() {
  return (
    <Input placeholder='请输入内容' />
  )
}
```
:::

### 禁用状态

::: demo
```js
render() {
  return (
    <Input disabled placeholder='请输入内容' />
  )
}
```
:::

### 不同尺寸

::: demo
```js
render() {
  return (
    <div className='demo-input-box'>
      <Input className='demo-input' size='large' placeholder='请输入内容' />
      <Input className='demo-input' placeholder='请输入内容' />
      <Input className='demo-input' size='small' placeholder='请输入内容' />
      <Input className='demo-input' size='mini' placeholder='请输入内容' />
    </div>
  )
}
```
:::

### 带图标的输入框

::: demo
```js
render() {
  return (
    <div className='demo-input-box'>
      <Input className='demo-input' prefix='user' placeholder='请输入内容' />
      <Input className='demo-input' suffix='user' placeholder='请输入内容' />
    </div>
  )
}
```
:::

### 前置/后置标签

::: demo
```js
render() {
  return (
    <div className='demo-input-box'>
      <Input className='demo-input' prepend='http://' append='.com' placeholder='请输入内容' />
      <Input className='demo-input' prepend={
        <Icon type='user' />
      } placeholder='请输入内容' />
      <Input className='demo-input' suffix='user' append='.com' placeholder='请输入内容' />
      <Input className='demo-input' prefix='user' append='.com' placeholder='请输入内容' />
    </div>
  )
}
```
:::

### 获取文本框的值

::: demo
```js
onChange = (value) => {
  console.dir(value)
}

render() {
  return (
    <Input placeholder='请输入内容' onChange={this.onChange} />
  )
}
```
:::

### 密码框

类型type设置为password为密码框类型输入框，此时默认具有通过按钮切换是否可以可视密码功能。

::: demo
```js
render() {
  return (
    <Input type='password' onEnter={() => alert('enter')} />
  )
}
```
:::

### 回车事件的回调

::: demo
```js
handleEnter = (value) => {
  alert(value)
}

render() {
  return (
    <Input onEnter={this.handleEnter} />
  )
}
```
:::

### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| className | 容器类名 | string | — | — |
| style | 指定样式 | object | — | — |
| disabled | 是否禁用输入框 | boolean | - | false |
| placeholder | 输入框占位文本 | string | - | - |
| size | 输入框的尺寸 | string | large/default/small/mini | default |
| prefix | 输入框前置图标 | string | - | - |
| suffix | 输入框前置图标 | string/boolean | - | - |
| prepend | 设置前置标签 | string/ReactNode | - | - |
| append | 设置后置标签 | string/ReactNode | - | - |
| clearable | 是否显示清空按钮 | boolean | - | true |
| trim | 是否自动清除首尾空格 | boolean | - | true |
| readOnly | 是否只读 | boolean | - | false |

除表格所列属性外，还支持所有原生输入框属性，比如maxLength、minLength、placeholder、autoComplete、name、id、max、min、autoFocus等

### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| onChange | 输入框内容变化时的回调 | (value) => void |
| onEnter | 按下回车的回调 | （value） => void |
| onKeyDown | 键盘事件的回调 | （value） => void |
| onBlur | 输入框失焦时的回调 | (event) => void |
| onClick | 输入框点击时的回调 | (event) => void |
| onClear | 输入框清空按钮点击时的回调 | (event) => void |
| clear | 用于手动调用清空文本框内容 | () => void |
