## Slider 滑块输入条

通过拖动滑块在一个固定区间内进行选择。

### 基本用法

::: demo
```js
render() {
  return (
    <Slider value={20} />
  )
}
```
white
:::

### 不显示进度条

::: demo
```js
render() {
  return (
    <Slider value={20} progress={false} />
  )
}
```
white
:::

### 自定义滑动条颜色

::: demo
```js
render() {
  return (
    <Slider value={20} progress='#000' />
  )
}
```
white
:::

### 范围选择

::: demo
```js
render() {
  return (
    <Slider value={[20, 60]} />
  )
}
```
white
:::

### 禁用

::: demo
```js
render() {
  return (
    <Slider value={20} disabled />
  )
}
```
white
:::

### 关闭提示

::: demo
```js
render() {
  return (
    <Slider value={20} tooltip={false} />
  )
}
```
white
:::

### 标记刻度

::: demo
```js
render() {
  return (
    <Row gutter={20}>
      <Col span={12}>
        <Slider value={1.5} min={0} max={2} step={0.5} marks dots />
      </Col>
      <Col span={12}>
        <Slider min={-10} max={30} step={2} value={8} marks={{
            [-10]: '-10°C',
            [-2]: '-2°C',
            0: {
              style: { color: '#af00ff' },
            },
            30: {
              style: { color: '#ff7c00' },
              label: <strong>30°C</strong>,
            }
          }} dots renderMarks={(mark) => `${mark}°C`} />
      </Col>
    </Row>
  )
}
```
white
:::

### 垂直模式

::: demo
```js
render() {
  return (
    <Row gutter={20}>
      <Col span={12}>
        <Slider value={10} mode='v' style={{ height: '200px' }} />
      </Col>
      <Col span={12}>
        <Slider style={{ height: '200px' }} mode='v' min={-10} max={30} step={2} value={8} marks={{
            [-10]: '-10°C',
            [-2]: '-2°C',
            0: {
              style: { color: '#af00ff' },
            },
            30: {
              style: { color: '#ff7c00' },
              label: <strong>30°C</strong>,
            }
          }} dots renderMarks={(mark) => `${mark}°C`} />
      </Col>
    </Row>
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
| min | 最小值 | number | — | 0 |
| max | 最大值 | number | — | 100 |
| value | 选择的数值，为数组时即可开启范围选择，并且指定范围 | number/Array[number] | — | 0 |
| mode | 滑块方向 | string | 'v'/'h' | h |
| progress | 显示滑动的进度条，设为 false 不显示进度条，设为为颜色值，将进度条设为不同的颜色 | boolean/string | — | true |
| disabled | 是否禁用 | boolean | — | false |
| step | 设置或返回每次拖动滑块控件时的递增量 | number | — | 1 |
| marks | 刻度标记,每个标签可以单独设置样式，当值为 Boolean 值时表示是否显示刻度 | boolean/object | — | — |
| tooltip | 是否显示提示 | boolean | — | true |
| dots | 显示 step 间断点 | boolean | — | false |

### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| onChange | 值改变时的回调 | (value: any) => void |
| renderMarks |刻度标记渲染 | (value: number) => void |
