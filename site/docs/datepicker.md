## DatePicker 日期选择器

日期选择组件, 提供基础的日期筛选功能。

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
      <DatePicker onChange={this.handleChange.bind(this)} />
    </div>
  )
}
```
:::

### 禁用部分日期

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
  return Moment.date(val) < 10
}
render() {
  return (
    <div>
      <div className='demo-section'>选择的时间戳:{this.state.moment}</div>
      <div className='demo-section'>选择的日期:{this.state.time}</div>
      <DatePicker onChange={this.handleChange.bind(this)} disabledDate={this.disabledDate.bind(this)} />
      <DatePicker onChange={this.handleChange.bind(this)} min={20190408} max={20190610} />
    </div>
  )
}
```
:::

### 禁用状态

::: demo
```js
render() {
  return <DatePicker disabled />
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
      <DatePicker.Range onChange={this.handleChange.bind(this)} />
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
    <DatePicker value={20191110} format='YYYY/MM/DD' />
  )
}
```
:::

### 共同的 Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| className | 容器类名 | string | — | — |
| style | 指定样式 | object | — | — |
| min | 可选日期的最小值 | date/时间戳/YYYYMMDD | — | — |
| max | 可选日期的最大值 | date/时间戳/YYYYMMDD | — | — |
| showNow | 是否显示今天按钮 | boolean | — | true |
| nowText | 今天按钮文案 | string | — | 此刻 |
| confirmText | 确认按钮文案 | string | — | 确认 |
| width | 时间文本框宽度 | number | — | 200 |
| disabled | 是否禁用状态 | boolean | — | false |
| format | 显示和返回值格式 | string | — | HH:mm:ss |
| showError | 是否显示错误提示 | boolean | — | true |

### 共同的 Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| disabledDate | 日期禁用函数 | () => {} |
| onBeforeClear | 用户点击清除icon前的回调函数，返回 true 表示可以清除，false 表示不能清除 | () => boolean |
| onBeforeConfirm | 用户点击确认前的回调函数，返回 true 表示可以确认，false 表示不能确认 | () => boolean |

### DatePicker Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| value | 文本框的值 | date/时间戳/YYYYMMDD | — | — |
| placeholder | 文本框的占位 | string | — | 请选择时间 |

### DatePicker Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| onChange | 选择日期回调函数 | (moment: 时间戳, time: 格式化后的时间) => void |

### DatePicker.Range Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| wrapperClassName | 容器类名 | string | — | — |
| wrapperStyle | 指定容器样式 | object | — | — |
| placeholder | picker文本框占位 | string[] | — | ['开始时间', '结束时间'] |
| value | picker文本框的值 | date/时间戳/YYYYMMDD[] | — | — |
| toText | picker文本框之间的说明 | string/React.ReactNode | — | 至 |

### DatePicker.Range Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| onChange | 选择日期回调函数 | (moment: 时间戳[开始, 结束], time: 格式化后的时间[开始, 结束]) => void |
