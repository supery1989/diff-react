## NumberInput 数字输入框

仅允许输入标准的数字值，可定义范围

### 基本用法

::: demo
```js
render() {
  return (
    <Row gutter={15}>
      <Col span={8}><NumberInput value={1} showType={false} onChange={(value) => console.dir(value)} /></Col>
      <Col span={8}><NumberInput value={1} onChange={(value) => console.dir(value)} /></Col>
      <Col span={8}><NumberInput value={1} showType='count' onChange={(value) => console.dir(value)} /></Col>
    </Row>
  )
}
```
:::

### 禁用状态

::: demo
```js
render() {
  return (
    <Row gutter={15}>
      <Col span={8}><NumberInput value={1} disabled showType={false} onChange={(value) => console.dir(value)} /></Col>
      <Col span={8}><NumberInput value={1} disabled onChange={(value) => console.dir(value)} /></Col>
      <Col span={8}><NumberInput value={1} disabled showType='count' onChange={(value) => console.dir(value)} /></Col>
    </Row>
  )
}
```
:::

### 设置精度

::: demo
```js
render() {
  return (
    <Row gutter={15}>
      <Col span={8}><NumberInput value={1} decimal={2} showType={false} onChange={(value) => console.dir(value)} /></Col>
      <Col span={8}><NumberInput value={1} decimal={2} onChange={(value) => console.dir(value)} /></Col>
      <Col span={8}><NumberInput value={1} decimal={2} showType='count' onChange={(value) => console.dir(value)} /></Col>
    </Row>
  )
}
```
:::

### 设置步数

::: demo
```js
render() {
  return (
    <Row gutter={15}>
      <Col span={8}><NumberInput value={1} decimal={2} step={2} showType onChange={(value) => console.dir(value)} /></Col>
      <Col span={8}><NumberInput value={1} step={3} onChange={(value) => console.dir(value)} /></Col>
      <Col span={8}><NumberInput value={1} step={4} showType='count' onChange={(value) => console.dir(value)} /></Col>
    </Row>
  )
}
```
:::

### 设置范围

::: demo
```js
render() {
  return (
    <Row gutter={15}>
      <Col span={8}><NumberInput value={1} min={-2} max={2} onChange={(value) => console.dir(value)} /></Col>
      <Col span={8}><NumberInput value={1} min={-2} max={2} decimal={2} onChange={(value) => console.dir(value)} /></Col>
      <Col span={8}><NumberInput value={1} min={-2} max={2} showType='count' onChange={(value) => console.dir(value)} /></Col>
    </Row>
  )
}
```
:::

### 格式化展示

::: demo
```js
render() {
  return (
    <Row gutter={15}>
      <Col span={12}><NumberInput value={1} showType={false} onChange={(value) => console.dir(value)} formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} parser={value => value.replace(/\$\s?|(,*)/g, '')} /></Col>
      <Col span={12}><NumberInput value={1} onChange={(value) => console.dir(value)}  formatter={value => `${value}%`} parser={(value) => value.replace('%', '')} /></Col>
    </Row>
  )
}
```
:::

### NumberInput Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| className | 容器类名 | string | — | — |
| style | 指定样式 | object | — | — |
| decimal | 数值精度 | number | — | — |
| showType | 文本框按钮样式 | string | step/count/boolean | step |
| step | 每次改变步数，可以为小数 | number | — | — |

此外继承全部Input Attributes

### NumberInput Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| formatter | 指定输入框展示值的格式 | (value: string/number) => void |
| parser | 指定从 formatter 里转换回数字的方式，和 formatter 搭配使用 | (value: string/number) => void |

此外继承全部Input Events
