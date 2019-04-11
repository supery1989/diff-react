## Popover 弹出框

通用的触发式弹层组件, 可以自定义定位算法、触发方式以及弹层显示方式。

### 基本用法

默认是hover激活。

::: demo
```js
render() {
  return (
    <div>
      <Popover content='这里是内容' title='标题'>
        <Button>hover激活</Button>
      </Popover>
      <Popover content='这里是内容' title='标题' trigger='click'>
        <Button>click激活</Button>
      </Popover>
      <Popover content='这里是内容' title='标题' trigger='focus'>
        <Button>focus激活</Button>
      </Popover>
    </div>
  )
}
```
:::

### 不显示箭头

::: demo
```js
render() {
  return (
    <Popover content='这里是内容' title='标题' arrow={false}>
      <Button>无箭头</Button>
    </Popover>
  )
}
```
:::

### 自定义浮窗宽度

默认最小宽度 100px。

::: demo 也可以通过 popClass 和 popStyle 来自定义浮窗样式
```js
render() {
  return (
    <Popover content='这里是内容' title='标题' width={200}>
      <Button>自定义宽度</Button>
    </Popover>
  )
}
```
:::

### 控制浮窗的显示

::: demo 
```js
state = {
  show: false
}
handleClick() {
  this.setState({
    show: !this.state.show
  })
}
render() {
  return (
    <div>
      <Button onClick={this.handleClick.bind(this)}>{this.state.show ? '关闭' : '打开'}</Button>
      <Popover content='这里是内容' title='标题' show={this.state.show}>
        <Button>由其他按钮控制显示/关闭</Button>
      </Popover>
    </div>
  )
}
```
:::

### 嵌套使用

通过嵌套可以增加很多高级功能，比如时间选择器、颜色选择器、dialog等。

::: demo 
```js
handleClick() {
  this.refs.pop.hide()
}
render() {
  return (
    <Popover ref='pop' trigger='click' width={150} content={
      <div>
        <p>确定删除吗？</p>
        <div style={{textAlign: 'right', margin: 0}}>
          <Button size='small' type='link' onClick={this.handleClick.bind(this)}>取消</Button>
          <Button type='primary' size='small' onClick={this.handleClick.bind(this)}>确定</Button>
        </div>
      </div>
    }>
      <Button>删除</Button>
    </Popover>
  )
}
```
:::

### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| className | 容器类名 | string | — | — |
| style | 指定样式 | object | — | — |
| popClass | 浮窗的类名 | string | — | — |
| popStyle | 指定浮窗的样式 | object | — | — |
| content | 显示的内容 | string/React.ReactNode | — | — |
| title | 显示的标题 | string/React.ReactNode | — | — |
| trigger | 触发方式 | string | hover/click/focus | hover |
| arrow | 是否显示箭头 | boolean | — | true |
| width | 自定义浮窗宽度 | number | — | 默认最小宽度100px |
| show | 是否显示浮窗 | boolean | — | false |
| placement | 浮窗出现的位置 | string | top/top-start/top-end/bottom/bottom-start/bottom-end/left/left-start/left-end/right/right-start/right-end | bottom |

### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| hide | 通过ref调用实例的hide方法，可以手动关闭弹出框 | () => void |
| onClose | 关闭弹出框的回调，变更content时会用到 | () => void |
