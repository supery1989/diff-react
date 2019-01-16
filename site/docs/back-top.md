## BackTop 返回顶部

返回页面顶部的操作按钮。

### 基本用法

::: demo target设置需要监听其滚动事件的元素，值为id，默认为window对象
```js
render() {
  return (
    <div>
      <p>滚动滚动条，看右下角，显示返回顶部按钮。</p>
      <BackTop target="demo-content" />
    </div>
  )
}
```
:::

### 不固定位置

::: demo
```js
render() {
  return (
    <BackTop fixed={false} target="demo-content" />
  )
}
```
:::

### 不使用动画

不使用动画会瞬间返回顶部

::: demo
```js
render() {
  return (
    <BackTop fixed={false} useAnimate={false} target="demo-content" />
  )
}
```
:::

### 自定义组件出现时机

通过设置showBelow可以设置组件出现的时机

::: demo
```js
render() {
  return (
    <BackTop fixed={false} showBelow={500} target="demo-content" />
  )
}
```
:::

### 改变形状

通过设置rectangle可以指定形状为方形

::: demo
```js
render() {
  return (
    <BackTop fixed={false} rectangle target="demo-content" />
  )
}
```
:::

### 自定义图标

::: demo
```js
render() {
  return (
    <BackTop fixed={false} icon="arrowup" target="demo-content" />
  )
}
```
:::

### 点击回调事件

::: demo
```js
render() {
  return (
    <BackTop fixed={false} onClick={() => alert("click")} target="demo-content" />
  )
}
```
:::

### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| className | 容器类名 | string | — | — |
| style | 指定样式 | object | - | - |
| target | 设置需要监听其滚动事件的元素，值为元素id | string/window | - | window |
| fixed | 位置是否固定 | boolean | - | true | 
| useAnimate | 是否使用动画 | boolean | - | true |
| showBelow | 滚动距离多少时显示组件，单位像素 | number | - | 100 |
| rectangle | 形状是否为方形 | boolean | - | false |
| during | 使用动画时的滚动速度 | number | - | 450 |
| icon | 自定义图标，值取自图标组件 | string | - | up |

### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| onClick | 点击按钮的回调函数 | (event) => void |
