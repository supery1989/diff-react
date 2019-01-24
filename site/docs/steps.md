## Steps 步骤条

引导用户按照流程完成任务的导航条。

### 基本用法

::: demo
```js
state = {
  current: 1
}

next = () => {
  let cur = this.state.current + 1
  if (cur > 3) {
    cur = 0
  }
  this.setState({
    current: cur
  })
}

render() {
  return (
    <div>
      <Steps current={this.state.current}>
        <Steps.Step title="步骤一" desc="这是步骤一的描述" />
        <Steps.Step title="步骤二" desc="这是步骤二的描述" />
        <Steps.Step title="步骤三" desc="这是步骤三的描述" />
      </Steps>
      <Button text="下一步" onClick={this.next} style={{marginTop: '15px'}} />
    </div>
  )
}
```
:::

### 带图标的步骤条

步骤条内可以启用各种自定义的图标。

::: demo
```js
render() {
  return (
    <Steps current={1}>
      <Steps.Step icon="user" />
      <Steps.Step icon="phone" />
      <Steps.Step icon="edit" />
    </Steps>
  )
}
```
:::

### 指定某步骤的状态

::: demo
```js
render() {
  return (
    <Steps current={1}>
      <Steps.Step />
      <Steps.Step status="error" />
    </Steps>
  )
}
```
:::

### 更改描述性文字的位置

通过labelPlacement属性指定位置，h水平，v垂直，默认v

::: demo
```js
render() {
  return (
    <Steps current={1} labelPlacement="h">
      <Steps.Step title="步骤一" desc="这是步骤一的描述" />
      <Steps.Step title="步骤二" desc="这是步骤二的描述" />
      <Steps.Step title="步骤三" desc="这是步骤三的描述" />
    </Steps>
  )
}
```
:::

### 设置间距

通过space属性设置间距

::: demo
```js
render() {
  return (
    <Steps current={1} space={200}>
      <Steps.Step title="步骤一" desc="这是步骤一的描述" />
      <Steps.Step title="步骤二" desc="这是步骤二的描述" />
      <Steps.Step title="步骤三" desc="这是步骤三的描述" />
    </Steps>
  )
}
```
:::

### 竖式步骤条

竖直方向的步骤条。

::: demo
```js
render() {
  return (
    <Steps current={1} direction="v">
      <Steps.Step title="步骤一" desc="这是步骤一的描述" />
      <Steps.Step title="步骤二" desc="这是步骤二的描述" />
      <Steps.Step title="步骤三" desc="这是步骤三的描述" />
    </Steps>
  )
}
```
:::

### Steps Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| className | 容器类名 | string | — | — |
| style | 指定样式 | object | - | - |
| current | 当前激活的步骤 | number | - | 0 |
| goingStatus | 设置当前步骤的状态 | string | finish/wait/going/error | going |
| labelPlacement | 指定标签放置位置，默认放图标下方，可选h水平放图标右侧，设置步骤条方向为垂直时，标签将水平方图标右侧 | string | h/v | v |
| space | 每个step的间距，不填写将自适应间距 | number | - | - |
| direction | 设置步骤条的方向，默认水平 | string | v/h | h |

### Step Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| className | 容器类名 | string | — | — |
| style | 指定样式 | object | - | - |
| icon | 设置图标 | string | - | - |
| status | 设置步骤的状态 | string | - | finish/wait/going/error | - |
| title | 标题 | string | - | - |
| desc | 步骤的详情描述 | string/ReactNode | - | - |
