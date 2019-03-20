## TimePicker 时间选择器

时间选择组件, 提供基础的时间、日期筛选功能。

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
      <div className='demo-section'>选择的时间:{this.state.time}</div>
      <TimePicker onChange={this.handleChange.bind(this)} />
    </div>
  )
}
```
:::

### 禁用部分时间

可以通过传入 disabledTime 函数来实现，返回 true 表示禁用。

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
disabledTime() {
  const disabledHour = val => val % 2 === 0
  const disabledMinute = val => val > 40
  const disabledSecond = val => val % 10 === 0
  return {
    disabledHour,
    disabledMinute,
    disabledSecond,
  }
}
render() {
  return (
    <div>
      <div className='demo-section'>选择的时间戳:{this.state.moment}</div>
      <div className='demo-section'>选择的时间:{this.state.time}</div>
      <TimePicker onChange={this.handleChange.bind(this)} disabledTime={this.disabledTime()} />
    </div>
  )
}
```
:::

### 禁用状态

::: demo
```js
render() {
  return <TimePicker disabled />
}
```
:::

### 可选择时间范围

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
disabledTime() {
  const disabledHour = val => val % 2 === 0
  const disabledMinute = val => val > 30
  const disabledSecond = val => val % 30 === 0
  return {
    disabledHour,
    disabledMinute,
    disabledSecond,
  }
}
render() {
  return (
    <div>
      <div className='demo-section'>选择的开始时间戳:{this.state.moment[0]}</div>
      <div className='demo-section'>选择的开始时间:{this.state.time[0]}</div>
      <div className='demo-section'>选择的结束时间戳:{this.state.moment[1]}</div>
      <div className='demo-section'>选择的结束时间:{this.state.time[1]}</div>
      <TimePicker.Range onChange={this.handleChange.bind(this)} />
    </div>
  )
}
```
:::

### 共同的 Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| className | picker面板类名 | string | — | — |
| style | picker面板指定样式 | object | — | — |
| hourStep | 显示的小时步长 | number | @ | 1 |
| minuteStep | 显示的分钟步长 | number | @ | 1 |
| secondStep | 显示的秒步长 | number | @ | 1 |
| min | 可选日期的最小值 | date/时间戳/YYYYMMDD | @ | @ |
| max | 可选日期的最大值 | date/时间戳/YYYYMMDD | @ | @ |
| showNow | 是否显示此刻按钮 | boolean | @ | true |
| showReset | 是否显示重置按钮 | boolean| @ | true |
| nowText | 此刻按钮文案 | string | @ | 此刻 |
| resetText | 重置按钮文案 | string | @ | 重置 |
| confirmText | 确认按钮文案 | string | @ | 确认 |
| width | 时间文本框宽度 | number | @ | 200 |
| disabled | 是否禁用状态 | boolean | @ | false |
| showSecond | 是否显示秒的选择 | boolean | @ | true |
| format | 显示和返回值格式 | string | @ | HH:mm:ss |
| showError | 是否显示错误提示 | boolean | @ | true |

### 共同的 Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| disabledTime | 时间禁用函数 | () => {} |
| onBeforeClear | 用户点击清除icon前的回调函数，返回 true 表示可以清除，false 表示不能清除 | () => boolean |
| onBeforeConfirm | 用户点击确认前的回调函数，返回 true 表示可以确认，false 表示不能确认 | () => boolean |

### TimePicker Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| value | 文本框的值 | date/时间戳/YYYYMMDD | — | — |
| placeholder | 文本框的占位 | string | @ | 请选择时间 |

### TimePicker Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| onChange | 选择日期回调函数 | (moment: 时间戳, time: 格式化后的时间) => void |

### TimePicker.Range Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| wrapperClassName | 容器类名 | string | @ | @ |
| wrapperStyle | 指定容器样式 | object | @ | @ |
| placeholder | picker文本框占位 | string[] | @ | ['开始时间', '结束时间'] |
| value | picker文本框的值 | date/时间戳/YYYYMMDD[] | @ | @ |
| toText | picker文本框之间的说明 | string/React.ReactNode | @ | 至 |

### TimePicker.Range Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| onChange | 选择日期回调函数 | (moment: 时间戳[开始, 结束], time: 格式化后的时间[开始, 结束]) => void |
