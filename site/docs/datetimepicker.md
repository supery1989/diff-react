## DateTimePicker 日期时间选择器

日期时间选择组件, 提供基础的日期和时间筛选功能。

### 基本用法

::: demo
```js
state = {
  moment: '',
  time: ''
}
handleChange(moment, time) {
  this.setState({
    moment,
    time
  })
}
render() {
  return (
    <div>
      <div className='demo-section'>选择的时间戳:{this.state.moment}</div>
      <div className='demo-section'>选择的日期:{this.state.time}</div>
      <DateTimePicker onChange={this.handleChange.bind(this)} />
    </div>
  )
}
```
:::

### 禁用部分日期

可以通过 min, max 实现。

::: demo
```js
state = {
  moment: '',
  time: ''
}
handleChange(moment, time) {
  this.setState({
    moment,
    time
  })
}
render() {
  return (
    <div>
      <div className='demo-section'>选择的时间戳:{this.state.moment}</div>
      <div className='demo-section'>选择的日期:{this.state.time}</div>
      <DateTimePicker onChange={this.handleChange.bind(this)} min={20190408} max={20190610} />
    </div>
  )
}
```
:::

### 禁用状态

::: demo
```js
render() {
  return <DateTimePicker disabled />
}
```
:::

### 可选择日期范围

::: demo
```js
state = {
  moment: '',
  time: ''
}
handleChange(moment, time) {
  this.setState({
    moment,
    time
  })
}
render() {
  return (
    <div>
      <div className='demo-section'>选择的开始时间戳:{this.state.moment[0]}</div>
      <div className='demo-section'>选择的开始日期:{this.state.time[0]}</div>
      <div className='demo-section'>选择的结束时间戳:{this.state.moment[1]}</div>
      <div className='demo-section'>选择的结束日期:{this.state.time[1]}</div>
      <DateTimePicker.Range onChange={this.handleChange.bind(this)} />
    </div>
  )
}
```
:::

### 自定义日期格式

::: demo
```js
render() {
  return (
    <DateTimePicker value={20191110} format='YYYY/MM/DD HH:mm:ss' />
  )
}
```
:::

### Attributes

与 DatePicker 相同，参照 DatePicker

### Events

与 DatePicker 相同，参照 DatePicker
