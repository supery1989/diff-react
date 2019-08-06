## Form 表单

用于收集、校验、提交数据。

### 基本用法

::: demo
```js
reset() {
  this.refs.form.reset()
}
render() {
  const options = [
    { label: '西瓜', value: 1 },
    {label: '土豆', value: 2 }
  ]
  return (
    <Form ref='form'>
      <Field label='输入框' />
      <Field type='radio' options={options} label='单选框' />
      <Field type='checkbox' options={options} label='复选框' />
      <Field type='numberinput' label='数字框' />
      <Field type='rate' label='评分' />
      <Field type='select' options={options} label='下拉框' />
      <Field type='switch' label='开关' />
      <Field type='textarea' label='文本域' />
      <Field type='editor' label='富文本' />
      <Button type='primary'>提 交</Button>
      <Button onClick={this.reset.bind(this)}>重 置</Button>
    </Form>
  )
}
```
white
:::

### 表单验证

::: demo
```js
submit() {
  this.refs.form.validate()
}
reset() {
  this.refs.form.reset()
}
render() {
  const options = [
    { label: '西瓜', value: 1 },
    {label: '土豆', value: 2 }
  ]
  return (
    <Form ref='form'>
      <Field label='输入框' required />
      <Field type='radio' options={options} label='单选框' required />
      <Field type='checkbox' options={options} label='复选框' required />
      <Field type='numberinput' label='数字框' required />
      <Field type='rate' label='评分' required />
      <Field type='select' options={options} label='下拉框' required />
      <Field type='switch' label='开关' required />
      <Field type='textarea' label='文本域' required />
      <Field type='editor' label='富文本' required />
      <Button type='primary' onClick={this.submit.bind(this)}>提 交</Button>
      <Button onClick={this.reset.bind(this)}>重 置</Button>
    </Form>
  )
}
```
white
:::

### 行内表单

::: demo
```js
render() {
  return (
    <Form ref='form' inline>
      <Field />
      <Button type='primary' style={{ marginLeft: '15px' }}>查 询</Button>
    </Form>
  )
}
```
white
:::

### 顶部对齐

::: demo
```js
render() {
  const options = [
    { label: '西瓜', value: 1 },
    {label: '土豆', value: 2 }
  ]
  return (
    <Form ref='form' labelPosition='top'>
      <Field label='测试名称' required />
      <Field type='radio' options={options} label='选择水果' required />
      <Button type='primary'>提 交</Button>
      <Button>重 置</Button>
    </Form>
  )
}
```
white
:::

### 动态增减

::: demo
```js
state = {
  fields: []
}
addField() {
  this.state.fields.push({
    label: `字段${this.state.fields.length + 1}`
  })
  this.forceUpdate()
}
removeField(field) {
  const index = this.state.fields.indexOf(field)
  if (index !== -1) {
    this.state.fields.splice(index, 1)
    this.forceUpdate()
  }
}
render() {
  return (
    <Form ref='form'>
      <Field label='联系地址' />
      {
        this.state.fields.map((field, index) => {
          return (
            <div>
              <Field key={index} width={300} label={field.label} style={{ display: 'inline-block' }} />
              <Button onClick={this.removeField.bind(this, field)}>删除</Button>
            </div>
          )
        })
      }
      <Button type='primary' onClick={this.addField.bind(this)}>增加字段</Button>
    </Form>
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
| labelWidth | 表单域标签的宽度 | number/string | @ | 80 |
| labelPosition | 表单域标签的位置 | string | left/right/top | right |
| inline | 是否为行内模式 | boolean | @ | false |
| labelSuffix | 表单域标签的后缀 | string | @ | @ |

### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| onSubmit | 表单提交回调 | () => void |
| validate | 表单验证方法 | () => boolean |
| reset | 表单重置函数 | () => void |
| addField | 表单增加表单域 | (field: any) => void |
| removeField | 表单删减表单域 | (field: any) => void |
