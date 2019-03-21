## Progress 进度条

用于展示操作进度，告知用户当前状态和预期。

### 基本用法

::: demo
```js
state = {
  percentage: 50
}
togglePer(type) {
  const { percentage } = this.state
  let temp = percentage
  if (type === 'add' && percentage < 100) {
    temp += 10
  } else if (type === 'cut' && percentage > 0) {
    temp -= 10
  }
  this.setState({
    percentage: temp
  })
}
render() {
  return (
    <Row>
      <Col span={12}>
        <Progress percentage={this.state.percentage} status='active' />
      </Col>
      <Col span={12}>
        <Button.Group>
          <Button onClick={this.togglePer.bind(this, 'add')}>增加</Button>
          <Button onClick={this.togglePer.bind(this, 'cut')}>减少</Button>
        </Button.Group>
      </Col>
    </Row>
  )
}
```
white
:::

### 各种状态

::: demo
```js
render() {
  return (
    <div>
      <div className='demo-section'>
        <Progress percentage={100} />
      </div>
      <div className='demo-section'>
        <Progress percentage={20} status="error" />
      </div>
      <div className='demo-section'>
        <Progress percentage={0} />
      </div>
      <div className='demo-section'>
        <Progress percentage={20} status="active" />
      </div>
    </div>
  )
}
```
white
:::

### 设置进度条宽度

::: demo
```js
render() {
  return (
    <div>
      <div className='demo-section'>
        <Progress percentage={100} strokeWidth={20} />
      </div>
      <div className='demo-section'>
        <Progress percentage={20} status="error" strokeWidth={20} />
      </div>
      <div className='demo-section'>
        <Progress percentage={0} strokeWidth={20} />
      </div>
      <div className='demo-section'>
        <Progress percentage={20} status="active" strokeWidth={20} />
      </div>
    </div>
  )
}
```
white
:::

### 百分比内显

::: demo
```js
render() {
  return (
    <div>
      <div className='demo-section'>
        <Progress textInside percentage={100} strokeWidth={20} />
      </div>
      <div className='demo-section'>
        <Progress textInside percentage={20} status="error" strokeWidth={20} />
      </div>
      <div className='demo-section'>
        <Progress textInside percentage={0} strokeWidth={20} />
      </div>
      <div className='demo-section'>
        <Progress textInside percentage={20} status="active" strokeWidth={20} />
      </div>
    </div>
  )
}
```
white
:::

### 不显示进度文字

::: demo
```js
render() {
  return (
    <div>
      <div className='demo-section'>
        <Progress showText={false} percentage={20} status="active" />
      </div>
    </div>
  )
}
```
white
:::

### 环形进度条

::: demo
```js
render() {
  return (
    <Row>
      <Col span={6}>
        <Progress type='circle' percentage={100} />
      </Col>
      <Col span={6}>
        <Progress type='circle' percentage={20} status="error" />
      </Col>
      <Col span={6}>
        <Progress type='circle' percentage={0} />
      </Col>
      <Col span={6}>
        <Progress type='circle' width={100} percentage={20} />
      </Col>
    </Row>
  )
}
```
white
:::

### 仪表盘

::: demo
```js
render() {
  return (
    <Row>
      <Col span={6}>
        <Progress type='dashboard' percentage={100} />
      </Col>
      <Col span={6}>
        <Progress type='dashboard' percentage={20} status="error" />
      </Col>
      <Col span={6}>
        <Progress type='dashboard' percentage={0} />
      </Col>
      <Col span={6}>
        <Progress type='dashboard' percentage={20} />
      </Col>
    </Row>
  )
}
```
white
:::

### 自定义轨道颜色

::: demo
```js
render() {
  return (
    <Row>
      <Col span={8}>
        <Progress percentage={30} color="yellow" trailColor="blue" />
      </Col>
      <Col span={8}>
        <Progress type='circle' percentage={30} color="yellow" trailColor="blue" />
      </Col>
      <Col span={8}>
        <Progress type='dashboard' percentage={30} color="yellow" trailColor="blue" />
      </Col>
    </Row>
  )
}
```
white
:::

### 自定义缺口方向及度数

::: demo
```js
render() {
  return (
    <Row>
      <Col span={6}>
        <Progress type='dashboard' gapDegree={15} gapPosition='top' percentage={100} />
      </Col>
      <Col span={6}>
        <Progress type='dashboard' gapPosition='bottom' percentage={20} status="error" />
      </Col>
      <Col span={6}>
        <Progress type='dashboard' gapPosition='left' percentage={0} />
      </Col>
      <Col span={6}>
        <Progress type='dashboard' gapPosition='right' percentage={20} />
      </Col>
    </Row>
  )
}
```
white
:::

### 自定义文字格式

::: demo
```js
handleFormat(val) {
  return `进度${val}%`
}
render() {
  return (
    <Row>
      <Col span={6}>
        <Progress type='circle' percentage={5} format={this.handleFormat.bind(this)} />
      </Col>
      <Col span={6}>
        <Progress type='dashboard' percentage={5} format={this.handleFormat.bind(this)} status="error" />
      </Col>
      <Col span={12}>
        <Progress percentage={60} strokeWidth={15} textInside format={this.handleFormat.bind(this)} status="error" />
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
| status | 进度条状态 | string | success/error/active | — |
| strokeWidth | 设置进度条宽度，单位px | number | — | 6 |
| percentage | 百分比 | number | 0-100 | 0 |
| textInside | 进度条显示文字内置在进度条内（只在 type=line 时可用） | boolean | — | false |
| showText | 是否显示进度条文字内容 | boolean | — | true |
| color | 进度条背景色（会覆盖 status 状态颜色） | string | — | — |
| trailColor | 进度条轨道背景色 | string | — | #bfcbd9 |
| type | 指定进度条类型 | string | line/circle/dashboard | line |
| width | 圆形进度条画布宽度(只在type=circle时可用) | number | — | 120 |
| gapDegree | 圆形进度条缺口角度(只在type=circle时可用) | number | 0-360 | 0 |
| gapPosition | 圆形进度条缺口位置(只在type=circle时可用) | string | top/right/bottom/left | top |

### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| format | 自定义进度信息内容 | (percent) => percent + '%' |
