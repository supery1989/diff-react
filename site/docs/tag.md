## Tag 标签

进行标记和分类的小标签。

### 基本用法

::: demo
```js
render() {
  return (
    <div>
      <Tag>标签一</Tag>
      <Tag type='success'>标签一</Tag>
      <Tag type='warning'>标签一</Tag>
      <Tag type='error'>标签一</Tag>
      <Tag type='info'>标签一</Tag>
      <Tag type='disabled'>标签一</Tag>
    </div>
  )
}
```
:::

### 可关闭的标签

::: demo
```js
render() {
  return (
    <div>
      <Tag closable onClose={() => alert('close')}>标签一</Tag>
      <Tag closable type='success'>标签一</Tag>
      <Tag closable type='warning'>标签一</Tag>
      <Tag closable type='error'>标签一</Tag>
      <Tag closable type='info'>标签一</Tag>
      <Tag closable type='disabled'>标签一</Tag>
    </div>
  )
}
```
:::

### 自定义背景色

::: demo
```js
render() {
  return (
    <div>
      <Tag color='#2db7f5'>标签一</Tag>
      <Tag color='#108ee9'>标签一</Tag>
    </div>
  )
}
```
:::

### 可选择标签

通过checkbox属性实现类型复选框的效果。

::: demo
```js
render() {
  return (
    <div>
      <Tag checkbox>标签一</Tag>
      <Tag checkbox onChange={() => alert('change')}>标签一</Tag>
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
| type | 内置类型 | string | disabled/success/info/warning/error | — |
| closable | 标签是否可以关闭 | boolean | — | false |
| show | 是否显示标签 | boolean | — | true |
| color | 指定标签背景色 | string | — | — |
| checkbox | 是否为复选框类型 | boolean | — | false |
| checked | 当checkbox为true时，标签是否选中 | boolean | — | false |

### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| onClose | 关闭标签时触发的事件 | (event) => void |
| onChange | 当设置为checkbox时，背景色变化时的回调 | () => void |
