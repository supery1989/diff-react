## Affix 固钉

将元素固定在特定区域。

### 基本用法

::: demo
```js
render() {
  return (
    <Row>
      <Col span={12}>
        <div style={{ display:'inline-block', padding: '5px 10px', height: '20px', background: '#1890ff', color: '#fff' }}>静静的看着</div>
      </Col>
      <Col span={12}>
        <Affix offsetTop={200} target="demo-content"><div style={{ display:'inline-block', padding: '5px 10px', height: '20px', background: '#1890ff', color: '#fff' }}>距离顶部200</div></Affix>
      </Col>
    </Row>
  )
}
```
:::

### 设置回调

::: demo
```js
state = {
  text: '我固定了',
}

onChange(type) {
  this.setState({
    text: type === 'fixed' ? '我开始飘了' : '我又固定了'
  })
}

render() {
  return (
    <Row>
      <Col span={12}>
        <Affix offsetTop={150} target="demo-content" onChange={this.onChange.bind(this)}><div style={{ display:'inline-block', padding: '5px 10px', height: '20px', background: '#f5222d', color: '#fff' }}>{this.state.text}</div></Affix>
      </Col>
      <Col span={12}>
        <div style={{ display:'inline-block', padding: '5px 10px', height: '20px', background: '#f5222d', color: '#fff' }}>静静的看着</div>
      </Col>
    </Row>
  )
}
```
:::

### 距离底部固定

::: demo
```js
render() {
  return (
    <Row>
      <Col span={12}>
        <div style={{ display:'inline-block', padding: '5px 10px', height: '20px', background: '#1890ff', color: '#fff' }}>静静的看着</div>
      </Col>
      <Col span={12}>
        <Affix offsetBottom={100} target="demo-content"><div style={{ display:'inline-block', padding: '5px 10px', height: '20px', background: '#1890ff', color: '#fff' }}>距离底部100</div></Affix>
      </Col>
    </Row>
  )
}
```
:::

### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| className | 容器类名 | string | — | — |
| style | 指定样式 | object | — | — |
| wrapperClassName | 占位容器的类名 | string | @ | @ |
| zIndex | 固钉的z-index | number | @ | 9 |
| offsetBottom | 距离窗口底部指定偏移量后触发 | number | @ | @ |
| offsetTop | number | 距离窗口顶部指定偏移量后触发 | @ | 0 |
| target | 设置 Affix 需要监听其滚动事件的元素，需为id值 | string | @ | window |

### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| onChange | 固定状态改变时触发的回调函数 | (type: 'fixed' | 'static') => void |
