## Field 表单域

用于显示带有一定内置功能的表单组件。

### 基本用法

::: demo
```js
render() {
  return (
    <Field placeholder='请输入测试名称' label='测试名称' />
  )
}
```
:::

### 行内模式

::: demo
```js
render() {
  return (
    <Field inline placeholder='请输入测试名称' />
  )
}
```
:::

### 设置默认值

::: demo
```js
render() {
  return (
    <Field placeholder='请输入测试名称' label='测试名称' value={99} />
  )
}
```
:::

### 表单验证

::: demo
```js
render() {
  const rules = [
    {
      type: 'custom',
      rule: function(value) {
        return typeof(value) === 'string'
      },
      message: '必须为字符串',
      trigger: 'change'
    }
  ]
  return (
    <Row gutter={20}>
      <Col span={12}>
        <div>内置规则</div>
        <Field placeholder='请输入测试名称' label='测试名称' required rules={[{type: 'string', message: '必须为字符串', trigger: 'change'}]} />
      </Col>
      <Col span={12}>
        <div>自定义规则</div>
        <Field placeholder='请输入测试名称' label='测试名称' required rules={rules} />
      </Col>
    </Row>
  )
}
```
:::

### 获取表单的值

::: demo
```js
state = {
  value: ''
}
handleValue(value) {
  this.setState({ value })
}
render() {
  return (
    <div>
      <div>表单的值：{this.state.value}</div>
      <Field placeholder='请输入测试名称' label='测试名称' getValue={this.handleValue.bind(this)} />
    </div>
  )
}
```
:::

### Field Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| className | 容器类名 | string | — | — |
| style | 指定样式 | object | — | — |
| width | 表单域宽度 | number/string | @ | 100% |
| labelWidth | 表单域标签的宽度 | number/string | @ | 80 |
| labelPosition | 表单域标签的位置 | string | left/right/top | right |
| label | 表单域标签 | string/React.ReactNode | @ | @ |
| required | 是否为必填字段 | boolean | @ | false |
| rules | 表单域校验规则 | Array<object>下面有具体介绍 | @ | @ |
| name | 表单域标识 | string | @ | @ |
| value | 表单域的值，可用于设置默认值 | any | @ | @ |
| type | 表单域的类型 | string | @ | input |
| inline | 是否为行内模式 | boolean | @ | false |

### Field Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| getValue | 获取表单的值 | (value) => void |

### Field type
| 类型      | 说明          |
|---------- |-------------- |
| input | 输入框 |

### rules 规则
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| trigger | 触发方式 | string | blur/change | @ |
| type | 表单域类型，下面有说明 | string | @ | input |
| message | 出错提示信息 | string | @ | @ |
| rule | 定义的规则,type为regexp时为正则表达式,type为length时为最大长度,type为range时为[最小值, 最大值],type为custom时为自定义规则且返回布尔值的函数 | @ | @ | @ |

### rule type 内置类型
| 类型      | 说明          |
|---------- |-------------- |
| string | 检验是否为字符串类型 |
| number | 校验是否为数字类型 |
| boolean | 校验是否为布尔值类型 |
| function | 校验是否为函数类型 |
| undefined | 校验是否为undefined类型 |
| nan | 校验是否为NaN类型 |
| integer | 校验是否为整数类型 |
| float | 校验是否为浮点数类型 |
| array | 校验是否为数组类型 |
| object | 校验是否为对象类型 |
| regexp | 配合rule字段来自定义正则表达式校验 |
| url | 校验是否为url类型 |
| email | 校验是否为邮箱类型 |
| length | 配合rule字段来自定义数值来进行长度校验 |
| range | 配合rule字段来自定义数组进行区间校验 |
| bank_no | 校验银行卡号 |
| id_card | 校验身份证号格式 |
| custom | 配合rule字段来自定义返回值为布尔值类型的函数进行自定义校验规则 |
