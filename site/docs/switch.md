## Switch 开关

开关选择器。

### 基本用法

::: demo
```js
render() {
  return (
    <Switch checked />
  )
}
```
:::

### 禁用状态

::: demo
```js
render() {
  return (
    <Switch disabled />
  )
}
```
white
:::

### 自定义显示内容

::: demo
```js
render() {
  return (
    <div>
      <Switch checkedChildren='开' unCheckedChildren='关' />
      <Switch checkedChildren='on' unCheckedChildren='off' style={{ marginLeft: '15px' }} />
      <Switch checkedChildren={<Icon type='check' />} unCheckedChildren={<Icon type='close' />} style={{ marginLeft: '15px' }} />
    </div>
  )
}
```
:::

### 三种尺寸

::: demo
```js
render() {
  return (
    <div>
      <Switch checkedChildren='开' unCheckedChildren='关' size='large' />
      <Switch checkedChildren='on' unCheckedChildren='off' style={{ marginLeft: '15px' }} />
      <Switch checkedChildren={<Icon type='check' />} unCheckedChildren={<Icon type='close' />} style={{ marginLeft: '15px' }} size='small' />
    </div>
  )
}
```
:::

### 加载中状态

::: demo
```js
render() {
  return (
    <div>
      <Switch loading checked />
      <Switch disabled loading style={{ marginLeft: '15px' }} />
    </div>
  )
}
```
:::

### 更改背景色

::: demo
```js
render() {
  return (
    <div>
      <Switch unColor='red' color='green' checkedChildren='on' unCheckedChildren='off' />
    </div>
  )
}
```
:::

### 回调事件

::: demo
```js
handleChange(value) {
  Toast(value)
}

render() {
  return (
    <div>
      <Switch checkedChildren='on' unCheckedChildren='off' onChange={this.handleChange.bind(this)} />
      <Switch checkedChildren='on' unCheckedChildren='off' checkedValue='on' unCheckedValue='off' onChange={this.handleChange.bind(this)} style={{ marginLeft: '15px' }} />
    </div>
  )
}
```
:::

### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| className | 容器类名 | string | — | — |
| style | 指定样式 | object | — | — |
| checked | 指定当前是否选中 | boolean | - | false |
| disabled | 是否禁用 | boolean | - | false |
| autoFocus | 组件自动获取焦点 | boolean | - | false |
| loading | 加载中的开关 | boolean | - | false |
| color | 开关打开时的背景色 | string | - | #1890ff |
| unColor | 开关关闭时的背景色 | string | - | #d8d4d4 |
| size | 开关的尺寸 | large/default/small | - | default |
| checkedChildren| 选中时的内容 | string/React.ReactNode | - | - |
| unCheckedChildren| 未选中时的内容 | string/React.ReactNode | - | - |
| checkedValue | 开关打开时的值 | boolean/string/number | - | true |
| unCheckedValue | 开关关闭时的值 | boolean/string/number | - | false |

### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| onChange | 开关状态发生变化时的回调函数 | (value) => void |
| onMouseUp | 鼠标弹起时的回调函数 | (event) => void |
| blur | 移除焦点 | - |
| focus | 获取焦点 | - |
