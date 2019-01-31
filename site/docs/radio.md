## Radio 单选框

单选框。

### 基本用法

::: demo
```js
state = {
  value: 0
}

onChange = (value) => {
  console.dir(value)
  this.setState({
    value
  })
}

render() {
  const { value } = this.state
  return (
    <div>
      <Radio value={1} checked={value === 1} onChange={this.onChange}>单选框</Radio>
      <Radio value={2} checked={value === 2} onChange={this.onChange}>单选框</Radio>
    </div>
  )
}
```
:::

### 禁用状态

::: demo
```js
render() {
  return (
    <div>
      <Radio checked disabled>单选框</Radio>
    </div>
  )
}
```
:::

### 单选按钮组

::: demo
```js
state = {
  value: 1
}

onChange(value) {
  this.setState({ value })
}

render() {
  return (
    <div>
      <Radio.Group value={this.state.value} onChange={this.onChange.bind(this)}>
        <Radio value={1} checked>单选框</Radio>
        <Radio value={2} checked>单选框</Radio>
      </Radio.Group>
    </div>
  )
}
```
:::

### 通过配置形式实现按钮组

::: demo
```js
state = {
  value: 1
}

onChange(value) {
  this.setState({ value })
}

render() {
  const options = [
    { label: '西瓜', value: 1 },
    {label: '土豆', value: 2 }
  ]
  return (
    <div>
      <Radio.Group options={options} value={this.state.value} onChange={this.onChange.bind(this)} />
    </div>
  )
}
```
:::

### 自定义按钮和文字颜色

::: demo
```js

render() {
  const options = [
    { label: '西瓜', value: 1 },
    {label: '土豆', value: 2 }
  ]
  return (
    <div>
      <Radio.Group options={options} fill='red' value={1} color='red' />
    </div>
  )
}
```
:::

### 按钮形式

::: demo
```js
state = {
  value: 2
}

onChange(value) {
  console.dir(value)
  this.setState({ value })
}

render() {
  return (
    <div>
      <Radio.Group value={this.state.value} onChange={this.onChange.bind(this)}>
        <Radio.Button value={1} checked>单选框</Radio.Button>
        <Radio.Button value={2} checked>单选框</Radio.Button>
        <Radio.Button value={3} checked>单选框</Radio.Button>
      </Radio.Group>

      <Radio.Group value={this.state.value} buttonStyle='solid' onChange={this.onChange.bind(this)}>
        <Radio.Button value={1} checked>单选框</Radio.Button>
        <Radio.Button value={2} checked>单选框</Radio.Button>
        <Radio.Button value={3} checked>单选框</Radio.Button>
      </Radio.Group>
    </div>
  )
}
```
:::

### Radio Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| className | 容器类名 | string | — | — |
| style | 指定样式 | object | — | — |
| value | 根据 value 进行比较，判断是否选中 | string/number/boolean | — | — |
| checked | 指定当前是否选中 | boolean | — | — |
| disabled | 指定当前是否禁用 | boolean | — | — |
| fill | 按钮激活时的填充色和边框色 | string | — | — |
| color | 按钮激活时的文本颜色 | string | — | — |
| type | 单选框展示类型 | button/default | — | 原生 |
| buttonStyle | 单选框为按钮类型时的样式，填充还是描边 | solid/outline | — | outline |

### Radio.Group Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| className | 容器类名 | string | — | — |
| style | 指定样式 | object | — | — |
| value | 根据 value 进行比较，判断是否选中 | string/number/boolean | — | — |
| disabled | 指定当前是否禁用 | boolean | — | — |
| fill | 按钮激活时的填充色和边框色 | string | — | — |
| color | 按钮激活时的文本颜色 | string | — | — |
| buttonStyle | 单选框为按钮类型时的样式，填充还是描边 | solid/outline | — | outline |
| options | 以配置形式设置子元素 | Array<{ label: string, value: string/number,boolean, disabled?: boolean }> | — | — |

### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| onChange | 单选按钮值变化时的回调 | (value) => void |
