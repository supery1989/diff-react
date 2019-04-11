## YearPicker 年份选择器

年份选择组件, 提供基础的年份筛选功能。

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
      <div className='demo-section'>选择的年份:{this.state.time}</div>
      <YearPicker onChange={this.handleChange.bind(this)} />
    </div>
  )
}
```
:::

### 禁用部分年份

可以通过传入 disabledDate 函数来或者 min, max 实现，返回 true 表示禁用。

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
disabledDate(val) {
  return Moment.year(val) < 2017
}
render() {
  return (
    <div>
      <div className='demo-section'>选择的时间戳:{this.state.moment}</div>
      <div className='demo-section'>选择的年份:{this.state.time}</div>
      <YearPicker onChange={this.handleChange.bind(this)} disabledDate={this.disabledDate.bind(this)} />
      <YearPicker onChange={this.handleChange.bind(this)} min={20190408} max={20210610} />
    </div>
  )
}
```
:::

### 禁用状态

::: demo
```js
render() {
  return <YearPicker disabled />
}
```
:::

### 可选择年份范围

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
      <div className='demo-section'>选择的开始年份:{this.state.time[0]}</div>
      <div className='demo-section'>选择的结束时间戳:{this.state.moment[1]}</div>
      <div className='demo-section'>选择的结束年份:{this.state.time[1]}</div>
      <YearPicker.Range onChange={this.handleChange.bind(this)} />
    </div>
  )
}
```
:::

### 自定义年份格式

::: demo
```js
render() {
  return (
    <YearPicker value={20191110} format='YY' />
  )
}
```
:::

### Attributes

与 DatePicker 相同，参照 DatePicker

### Events

与 DatePicker 相同，参照 DatePicker
