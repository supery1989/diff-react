## CountDown 倒计时

用于显示倒计时。

### 基本用法

::: demo
```js
state = {
  during: 0
}

handleClick() {
  if (this.state.during === 0) {
    this.setState({
      during: 5
    })
  }
}

handleEnd() {
  this.setState({
    during: 0
  }, () => {
    Toast('结束了')
  })
}

render() {
  return (
    <div>
      <Button text='开始5s倒计时' onClick={this.handleClick.bind(this)} />
      <CountDown during={this.state.during} onEnd={this.handleEnd.bind(this)} />
    </div>
  )
}
```
:::

### 距离特定时刻的倒计时

::: demo
```js
handleEnd() {
  Toast('结束了')
}

render() {
  return (
    <div>
      <span>距离建国一百周年还有 </span>
      <CountDown date='20491001' onEnd={this.handleEnd.bind(this)} />
    </div>
  )
}
```
:::

### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| className | 容器类名 | string | — | — |
| style | 指定样式 | object | — | — |
| during | 倒计时时长 | number | — | — |
| date | 距离特定时刻的倒计时 | Date/时间戳/YYYYMMDD | — | — |
| format | 距离特定时刻倒计时的时间格式 | string | YDHms | Hms |

### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| onEnd | 倒计时结束时的回调 | () => void |
