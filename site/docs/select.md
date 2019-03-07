## Select 下拉框

当选项过多时，使用下拉菜单展示并选择内容。

### 基本用法

::: demo
```js
handleChange(value) {
  Toast(value)
}

render() {
  return (
    <Select onChange={this.handleChange.bind(this)}>
      <Select.Option value='张三'>张三label</Select.Option>
      <Select.Option value='李四'>李四label</Select.Option>
      <Select.Option disabled value='赵武'>赵武label</Select.Option>    
    </Select>
  )
}
```
:::

### 禁用状态

::: demo
```js
render() {
  return (
    <Select disabled>
      <Select.Option value='张三'>张三</Select.Option>
      <Select.Option value='李四'>李四</Select.Option>
      <Select.Option value='赵武'>赵武</Select.Option>
    </Select>
  )
}
```
:::

### 多选

::: demo
```js
handleChange(value) {
  Toast(value.join(','))
}

render() {
  return (
    <Select onChange={this.handleChange.bind(this)} multiple>
      <Select.Option value='张三'>张三label</Select.Option>
      <Select.Option value='李四'>李四label</Select.Option>
      <Select.Option value='赵武'>赵武label</Select.Option>
      <Select.Option value='王六'>王六label</Select.Option>
    </Select>
  )
}
```
:::

### 自定义模板

::: demo
```js
render() {
  return (
    <Select>
      <Select.Option value='beijing'>
        <span style={{float: 'left'}}>北京</span>
        <span style={{float: 'right'}}>beijing</span>
      </Select.Option>
      <Select.Option value='shanghai'>
        <span style={{float: 'left'}}>上海</span>
        <span style={{float: 'right'}}>shanghai</span>
      </Select.Option>
      <Select.Option value='guangzhou'>
        <span style={{float: 'left'}}>广州</span>
        <span style={{float: 'right'}}>guangzhou</span>
      </Select.Option>
      <Select.Option value='shenzhen'>
        <span style={{float: 'left'}}>深圳</span>
        <span style={{float: 'right'}}>shenzhen</span>
      </Select.Option>
    </Select>
  )
}
```
:::

### 限制下拉框高度

::: demo
```js
render() {
  return (
    <Select line={2}>
      <Select.Option value='张三'>张三label</Select.Option>
      <Select.Option value='李四'>李四label</Select.Option>
      <Select.Option disabled value='赵武'>赵武label</Select.Option>
    </Select>
  )
}
```
:::

### 分组

::: demo
```js
handleChange(value, label) {
  Toast(value)
}

render() {
  return (
    <Select onChange={this.handleChange.bind(this)}>
      <Select.OptionGroup label='姓名'>
        <Select.Option value='张三'>张三label</Select.Option>
        <Select.Option value='李四'>李四label</Select.Option>
        <Select.Option disabled value='赵武'>赵武label</Select.Option>
      </Select.OptionGroup>
      <Select.OptionGroup label='城市'>
        <Select.Option value='beijing'>北京</Select.Option>
        <Select.Option value='shanghai'>上海</Select.Option>
        <Select.Option disabled value='guangzhou'>广州</Select.Option>
      </Select.OptionGroup>
    </Select>
  )
}
```
:::

### 可搜索

::: demo
```js
handleChange(value, label) {
  Toast(value)
}

render() {
  return (
    <Select filter onChange={this.handleChange.bind(this)}>
      <Select.Option value='张三'>张三</Select.Option>
      <Select.Option value='李四'>李四</Select.Option>
      <Select.Option value='赵武'>赵武</Select.Option>
    </Select>
  )
}
```
:::

### 获取选项的文本

::: demo
```js
handleChange(value) {
  const v = JSON.stringify(value)
  Toast(v)
}

render() {
  return (
    <Select onChange={this.handleChange.bind(this)} getLabel>
      <Select.Option value='张三'>张三label</Select.Option>
      <Select.Option value='李四'>李四label</Select.Option>
      <Select.Option value='赵武'>赵武label</Select.Option>
    </Select>
  )
}
```
:::

### 远程搜索

::: demo
```js
state = {
  loading: false,
  data: []
}

remoteFn(value) {
  console.dir(value)
  if (!value) {
    this.setState({
      data: [],
    })
    return
  }
  this.setState({
    loading: true
  })
  setTimeout(() => {
    this.setState({
      data: [
        { value: 1, label: '张三' },
        { value: 2, label: '李四' }
      ],
      loading: false
    })
  }, 1000)
}

render() {
  return (
    <Select remote loading={this.state.loading} remoteFn={this.remoteFn.bind(this)}>
      {this.state.data.map((item, key) => {
        return <Select.Option key={key} value={item.value}>{item.label}</Select.Option>
      })}
    </Select>
  )
}
```
:::

### Select Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| className | 容器类名 | string | — | — |
| style | 指定样式 | object | — | — |
| placeholder | 占位符 | string | - | 请选择 |
| disabled | 是否禁用 | boolean | - | false |
| line | 下拉列表展示数据的最大行数，超过会自动增加滚动条 | number | - | - |
| multiple | 是否多选模式 | boolean | - | false |
| filter | 是否支持搜索 | boolean | - | false |
| getLabel | 是否可以获取label内容，获取到的label会包装到onChange回调参数中 | boolean | - | false |
| remote | 是否支持远程搜索 | boolean | - | false |
| loading | 是否正在从远程获取数据 | boolean | - | false |
| notFoundText | 当下拉列表为空时显示的内容 | string | - | 无可匹配项 |
| clearable | 是否显示清空按钮 | boolean | - | true |
| value | 下拉框的值 | number/string | - | - |

### Select.OptionGroup Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| className | 容器类名 | string | — | — |
| style | 指定样式 | object | — | — |
| label | 分组的组名 | string | - | - |

### Select.Option Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| className | 容器类名 | string | — | — |
| style | 指定样式 | object | — | — |
| value | 选项的值 | number/string | - | - |
| disabled | 是否禁用 | boolean | - | false |
| label | 选项的显示内容 | string | - | - |

### Select Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
 | onChange | 下拉框值变化回调，单选时回调参数为字符串，多选时回调参数为数组，支持label时参数是对象 | (value: any) => void |
| remoteFn? | 远程搜索方法 | (value: any) => void |
