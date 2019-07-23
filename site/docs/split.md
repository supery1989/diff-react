## Split 面板分割

可将一块内容，分割为可以拖拽调整宽度或高度的区域。

### 基本用法

::: demo
```js
render() {
  return (
    <Split style={{ height: 100, border: '1px solid #d5d5d5', borderRadius: 3 }}>
      <div style={{ width: '20%', minWidth: 30 }}>左侧面板</div>
      <div style={{ width: '80%' }}>右侧面板</div>
    </Split>
  )
}
```
white
:::

### 垂直分割

::: demo
```js
render() {
  return (
    <Split mode="v" style={{ height: 200, border: '1px solid #d5d5d5', borderRadius: 3 }}>
      <div style={{ height: '50%' }}>上面面板</div>
      <div style={{ height: '50%' }}>下面面板</div>
    </Split>
  )
}
```
white
:::

### 线条形式

::: demo
```js
render() {
  return (
    <Row gutter={20}>
      <Col span={12}>
        <Split style={{ height: 100, border: '1px solid #d5d5d5', borderRadius: 3 }} lineBar>
          <div style={{ width: '20%', minWidth: 30 }}>左侧面板</div>
          <div style={{ width: '40%' }}>中间面板</div>
          <div style={{ width: '40%' }}>右侧面板</div>
        </Split>
      </Col>
      <Col span={12}>
        <Split mode="v" style={{ height: 200, border: '1px solid #d5d5d5', borderRadius: 3 }} lineBar>
          <div style={{ height: '50%' }}>上面面板</div>
          <div style={{ height: '50%' }}>下面面板</div>
        </Split>
      </Col>
    </Row>
  )
}
```
white
:::

### 嵌套使用

::: demo
```js
render() {
  return (
    <Split style={{ height: 200, border: '1px solid #d5d5d5', borderRadius: 3 }}>
      <Split mode="v">
        <div style={{ height: '50%' }}>上面面板</div>
        <Split mode='h' style={{ height: '50%' }}>
          <div>左下侧面板</div>
          <div>右下侧面板</div>
        </Split>
      </Split>
      <div style={{ flex: 1 }}>右侧面板</div>
    </Split>
  )
}
```
white
:::

### 禁用拖拽

::: demo
```js
render() {
  return (
    <Split style={{ height: 100, border: '1px solid #d5d5d5', borderRadius: 3 }} disable={[3]}>
      <div style={{ width: '20%', minWidth: 30 }}>左侧面板</div>
      <div style={{ width: '40%' }}>中间面板</div>
      <div style={{ width: '40%' }}>右侧面板</div>
    </Split>
  )
}
```
white
:::

### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| className | 容器类名 | string | — | — |
| style | 指定样式 | object | — | — |
| lineBar | 设置拖拽的工具条，为线条样式 | boolean | — | false |
| mode | 类型，可取值 | string | h/v | h |
| disable | 设置拖拽的工具条，禁用 | boolean/Array<number> | — | false |
| visiable | 设置拖拽的工具条，是否可见 | boolean/Array<number> | — | true

### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| onDragging | 拖拽宽度/高度变化回调函数，宽度或者高度根据 mode 参数来确定 | (preSize: number, nextSize: number, paneNumber: number) => void |
| onDragEnd | 拖拽结束的回调函数 | (preSize: number, nextSize: number, paneNumber: number) => void |
