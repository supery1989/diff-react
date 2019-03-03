## Tooltip 文字提示

简单的文字气泡提示框。

### 基本用法

::: demo
```js
render() {
  return (
    <Tooltip content='tooltip'>文字提示</Tooltip>
  )
}
```
:::

### 位置

::: demo
```js
render() {
  return (
    <div className='demo-tooltip'>
      <div style={{marginLeft: '70px', whiteSpace: 'nowrap'}}>
        <Tooltip content='tooltip' placement='topLeft'><Button text='上左' /></Tooltip>
        <Tooltip content='tooltip' placement='top'><Button text='上边' /></Tooltip>
        <Tooltip content='tooltip' placement='topRight'><Button text='上右' /></Tooltip>
      </div>
      <div style={{width: '70px', float: 'left'}}>
        <Tooltip content='tooltip' placement='leftTop'><Button text='左上' /></Tooltip>
        <Tooltip content='tooltip' placement='left'><Button text='左边' /></Tooltip>
        <Tooltip content='tooltip' placement='leftBottom'><Button text='左下' /></Tooltip>
      </div>
      <div style={{width: '70px', marginLeft: '304px'}}>
        <Tooltip content='tooltip' placement='rightTop'><Button text='右上' /></Tooltip>
        <Tooltip content='tooltip' placement='right'><Button text='右边' /></Tooltip>
        <Tooltip content='tooltip' placement='rightBottom'><Button text='右下' /></Tooltip>
      </div>
      <div style={{marginLeft: '70px', clear: 'both', whiteSpace: 'nowrap'}}>
        <Tooltip content='tooltip' placement='bottomLeft'><Button text='下左' /></Tooltip>
        <Tooltip content='tooltip' placement='bottom'><Button text='下边' /></Tooltip>
        <Tooltip content='tooltip' placement='bottomRight'><Button text='下右' /></Tooltip>
      </div>
    </div>
    
  )
}
```
:::

### 触发方式

::: demo
```js
render() {
  return (
    <div>
      <Tooltip content='tooltip' trigger='click'><Button text='点击' /></Tooltip>
      <Tooltip content='tooltip'><Button text='滑过' /></Tooltip>
      <Tooltip content='tooltip' trigger='focus'><Button text='聚焦' /></Tooltip>
    </div>
    
  )
}
```
:::

### 延时显示/隐藏

::: demo
```js
render() {
  return (
    <Tooltip content='tooltip' mouseEnterDelay={1} mouseLeaveDelay={1}>文字提示</Tooltip>
  )
}
```
:::

### 更多内容

::: demo
```js
render() {
  return (
    <Tooltip content={<div>第一行<br/>第二行</div>}>文字提示</Tooltip>
  )
}
```
:::

### 更多主题

::: demo
```js
render() {
  return (
    <Tooltip content='tooltip' theme='light'>文字提示</Tooltip>
  )
}
```
:::

### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| className | 容器类名 | string | — | — |
| style | 指定样式 | object | — | — |
| content| 提示的内容 | string/React.ReactNode | - | - |
| placement | Tooltip 的出现位置 | string | leftTop/left/leftBottom/topLeft/top/topRight/rightTop/right/rightBottom/bottomLeft/bottom/bottomRight | topLeft |
| show | 是否显示提示 | boolean | - | false |
| trigger | 显示的触发方式 | string | hover/click/focus | hover |
| mouseEnterDelay | 延迟显示提示框的时间，单位秒 | number | - | - |
| mouseLeaveDelay | 延迟关闭提示框的时间，单位秒 | number | - | - |
| theme | 提示框的主题 | string | dark/light | dark |
