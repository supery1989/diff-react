## Badge 标记

一般出现在通知图标或头像的右上角，用于显示需要处理的消息条数，通过醒目视觉形式吸引用户处理。

### 基本用法

::: demo
```js
render() {
  return (
    <Badge count={9}><Icon type='shop' style={{fontSize: '24px'}} /></Badge>
  )
}
```
:::

### 小红点

::: demo
```js
render() {
  return (
    <div>
      <div className='demo-section'>
        <Badge count={9} dot><Icon type='shop' style={{fontSize: '24px'}} /></Badge>
      </div>
      <div className='demo-section'>
        <Badge count={9} dot>消息</Badge>
      </div>
    </div>
  )
}
```
:::

### 设置最大信息数

::: demo
```js
render() {
  return (
    <Badge count={101} maxCount={99}><Icon type='shop' style={{fontSize: '24px'}} /></Badge>
  )
}
```
:::

### 显示0

::: demo
```js
render() {
  return (
    <Badge count={0} showZero><Icon type='shop' style={{fontSize: '24px'}} /></Badge>
  )
}
```
:::

### 独立标记

::: demo
```js
render() {
  return (
    <div>
      <div className='demo-section'>
        <span>消息</span>
        <Badge dot />
      </div>
      <div className='demo-section'>
        <span>消息</span>
        <Badge count={88} />
      </div>
    </div>
  )
}
```
:::

### 自定义显示内容

::: demo
```js
render() {
  return (
    <Badge count='new'><Icon type='shop' style={{fontSize: '24px'}} /></Badge>
  )
}
```
:::

### 点击回调

::: demo
```js
handleClick() {
  Toast('被点击了')
}

render() {
  return (
    <Badge count='new' onClick={this.handleClick.bind(this)}><Icon type='shop' style={{fontSize: '24px'}} /></Badge>
  )
}
```
:::

### Badge Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| className | 容器类名 | string | — | — |
| style | 指定样式 | object | — | — |
| wrapperClass | 包裹的容器类名 | string | @ | @ |
| dot | 是否小圆点 | boolean | @ | false |
| count | number/string | 标记显示的内容 | @ | @ |
| showZero | 消息数为0时是否显示 | boolean | @ | false |
| maxCount | 最大完全显示消息条数 | number | @ | 99 |

### Badge Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| onClick | 标记点击回调 | () => void |
