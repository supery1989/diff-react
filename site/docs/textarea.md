## Textarea 文本域

用于输入多行文本内容。

### 基本用法

默认是自适应高度，最低3行的文本域。

::: demo
```js
render() {
  return (
    <Textarea style={{width: '200px'}} />
  )
}
```
:::

### 设置最大行数

::: demo
```js
render() {
  return (
    <Textarea style={{width: '200px'}} maxRows={5} />
  )
}
```
:::

### 可以手动更改文本域尺寸

通过 resize 属性设置，值取自 css 样式原生。

::: demo
```js
render() {
  return (
    <Textarea style={{width: '200px'}} resize='auto' />
  )
}
```
:::

### 禁用状态

::: demo
```js
render() {
  return (
    <Textarea style={{width: '200px'}} disabled />
  )
}
```
:::

### 限制输入字数

::: demo
```js
render() {
  return (
    <Textarea style={{width: '200px'}} maxLength={150} showCount />
  )
}
```
:::

### 回调事件

内置了 onChange onBlur onClear 三个回调事件

::: demo
```js
handleChange(value) {
  console.dir(value)
}

handleBlur(value) {
  Toast(value)
}

render() {
  return (
    <Textarea style={{width: '200px'}} onChange={this.handleChange.bind(this)} onBlur={this.handleBlur.bind(this)} />
  )
}
```
:::

### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| className | 容器类名 | string | — | — |
| style | 指定样式 | object | — | — |
| placeholder | 占位符 | string | - | - |
| autoSize | 高度是否自适应 | boolean | - | true |
| value | 文本域的值 | string | - | - |
| minRows | 最小行数，高度自适应时有效 | number | - | 3 |
| maxRows | 最大行数，高度自适应时有效 | number | - | 0 |
| resize | 手动更改文本域尺寸 | string | auto/both/horizontal/none/unset/vertical | none |
| disabled | 是否禁用状态 | boolean | - | false |
| maxLength | 可以输入的最多字数 | number | - | - |
| showCount | 是否显示计数 | boolean | - | false |
| clearable | 是否显示清空按钮 | boolean | - | true |

### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| onChange | 文本域的值发生变化时的回调 | (value: string) => void |
| onBlur | 文本域失焦时的回调 | (value: string) => void |
| onClear | 清空按钮点击时的回调，可以用于设置值为空的场景调用 | () => void |
