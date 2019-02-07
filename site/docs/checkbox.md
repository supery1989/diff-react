## Checkbox 复选框

复选框。

### 基本用法

::: demo
```js
render() {
  return (
    <div>
      <Checkbox>Checkbox</Checkbox>
      <Checkbox disabled>Checkbox</Checkbox>
      <Checkbox disabled checked>Checkbox</Checkbox>
    </div>
  )
}
```
:::

### 回调事件

::: demo
```js
handleOnChange = (value) => {
  Toast(value)
}

render() {
  return (
    <div>
      <Checkbox value='check' onChange={this.handleOnChange}>Checkbox</Checkbox>
    </div>
  )
}
```
:::

### 复选框组

::: demo
```js
handleOnChange = (value) => {
  Toast(value)
}

render() {
  return (
    <Checkbox.Group values={['dc']}>
      <Checkbox value='apple'>苹果</Checkbox>
      <Checkbox value='banana'>香蕉</Checkbox>
      <Checkbox value='watermelon'>西瓜</Checkbox>
      <Checkbox value='watermelon' disabled>禁用</Checkbox>
      <Checkbox value='dc' disabled checked>选中且禁用</Checkbox>
    </Checkbox.Group>
  )
}
```
:::

### 通过配置形式实现复选按钮组

::: demo
```js
handleOnChange = (value) => {
  Toast(value.join(','))
}

render() {
  const options = [
    { label: '苹果', value: 'apple' },
    { label: '香蕉', value: 'banana' },
    { label: '西瓜', value: 'watermelon' },
    { label: '禁用', value: 'd', disabled: true },
    { label: '选中且禁用', value: 'dc', disabled: true, checked: true }
  ]
  return (
    <div>
      <Checkbox.Group values={['dc']} options={options} onChange={this.handleOnChange.bind(this)} />
    </div>
  )
}
```
:::

### 可选数量的限制

::: demo
```js
render() {
  const options = [
    { label: '苹果', value: 'apple' },
    { label: '香蕉', value: 'banana' },
    { label: '西瓜', value: 'watermelon' },
    { label: '猪', value: 'pig' },
  ]
  return (
    <div>
      <Checkbox.Group min={1} max={3} options={options} />
    </div>
  )
}
```
:::

### 不确定状态

::: demo
```js
handleChange = (value) => {
  Toast(value.join(','))
}

render() {
  const options = [
    { label: '苹果', value: 'apple' },
    { label: '香蕉', value: 'banana' },
    { label: '西瓜', value: 'watermelon' },
    { label: '猪', value: 'pig' },
  ]
  return (
    <Checkbox.Indeterminate options={options} onChange={this.handleChange} />
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
    { label: '土豆', value: 2 }
  ]
  return (
    <div>
      <Checkbox.Group options={options} fill='red' value={1} color='red' />
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
  this.setState({ value })
}

render() {
  return (
    <div>
      <Checkbox.Group value={this.state.value} onChange={this.onChange.bind(this)}>
        <Checkbox.Button value={1} checked>复选框</Checkbox.Button>
        <Checkbox.Button value={2} checked>复选框</Checkbox.Button>
        <Checkbox.Button value={3} checked>复选框</Checkbox.Button>
      </Checkbox.Group>

      <Checkbox.Group style={{ marginTop: '15px' }} value={this.state.value} buttonStyle='solid' onChange={this.onChange.bind(this)}>
        <Checkbox.Button value={1} checked>复选框</Checkbox.Button>
        <Checkbox.Button value={2} checked>复选框</Checkbox.Button>
        <Checkbox.Button value={3} checked>复选框</Checkbox.Button>
      </Checkbox.Group>
    </div>
  )
}
```
:::

### 圆形样式

::: demo
```js
render() {
  const options = [
    { label: '西瓜', value: 1 },
    { label: '土豆', value: 2 }
  ]
  return (
    <div>
      <Checkbox.Group options={options} circle value={1} />
    </div>
  )
}
```
:::

### 垂直形式

::: demo
```js
render() {
  const options = [
    { label: '西瓜', value: 1 },
    { label: '土豆', value: 2 }
  ]
  return (
    <div>
      <Checkbox.Group options={options} direction='v' value={1} />
    </div>
  )
}
```
:::

### Checkbox Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| className | 容器类名 | string | — | — |
| style | 指定样式 | object | — | — |
| value | 根据 value 进行比较，判断是否选中 | string/number/boolean | — | — |
| label | 复选框显示的值 | string | - | - |
| checked | 指定当前是否选中 | boolean | — | — |
| disabled | 指定当前是否禁用 | boolean | — | — |
| fill | 按钮激活时的填充色和边框色 | string | — | — |
| color | 按钮激活时的文本颜色 | string | — | — |
| type | 复选框展示类型 | button/default | — | 原生 |
| buttonStyle | 复选框为按钮类型时的样式，填充还是描边 | solid/outline | — | outline |
| circle | 是否为圆形对号形式 | boolean | - | false |
| indeterminate | 是否为不确定状态 | boolean | - | false |

### Checkbox.Group Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| className | 容器类名 | string | — | — |
| style | 指定样式 | object | — | — |
| values | 指定当前选中的值 | string[] | — | — |
| disabled | 指定当前是否禁用 | boolean | — | — |
| fill | 按钮激活时的填充色和边框色 | string | — | — |
| color | 按钮激活时的文本颜色 | string | — | — |
| buttonStyle | 复选框为按钮类型时的样式，填充还是描边 | solid/outline | — | outline |
| options | 以配置形式设置子元素 | Array<{ label: string, value: string/number,boolean, disabled?: boolean }> | — | — |
| direction | 设置按钮组的方向，默认为水平方向 | v/h | - | h |
| circle | 是否为圆形对号形式 | boolean | - | false |
| min | 可被勾选的 checkbox 的最小数量 | number | - | - |
| max | 可被勾选的 checkbox 的最大数量 | number | - | - |

### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| onChange | 复选按钮值变化时的回调 | (value) => void |
