## Rate 评分

评分组件。

### 基本用法

::: demo
```js
render() {
  return (
    <Row>
      <Col span={12}><Rate /></Col>
      <Col span={12}><Rate character='好' /></Col>
    </Row>
  )
}
```
:::

### 不区分颜色

::: demo
```js
render() {
  return (
    <Row>
      <Col span={12}><Rate changeColor={false} /></Col>
      <Col span={12}><Rate changeColor={false} character='好' /></Col>
    </Row>
  )
}
```
:::

### 允许半选

::: demo
```js
render() {
  return (
    <Rate allowHalf />
  )
}
```
:::

### 允许再次点击后清除

::: demo
```js
render() {
  return (
    <Rate allowClear />
  )
}
```
:::

### 显示分数

::: demo
```js
render() {
  return (
    <Row>
      <Col span={12}><Rate showScore /></Col>
      <Col span={12}><Rate scoreText /></Col>
    </Row>
  )
}
```
:::

### 只读状态

::: demo
```js
render() {
  return (
    <Rate disabled />
  )
}
```
:::

### 更改星星数量

::: demo
```js
render() {
  return (
    <Rate total={6} value={2} />
  )
}
```
:::

### 回调事件

::: demo
```js
render() {
  return (
    <Rate onChange={(value) => {console.log(value)}} />
  )
}
```
:::

### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| className | 评分类名，用于定制评分样式 | string | — | — |
| style | 用于自定义评分样式 | object | — | — |
| changeColor | 是否区分高中低分颜色 | boolean | — | true |
| allowHalf | 是否允许半选 | boolean | — | false |
| allowClear | 是否允许再次点击后清除 | boolean | — | false |
| showScore | 是否显示分数 | boolean | — | false |
| scoreText | 自定义分数展示文本,showScore为true时有效 | boolean/array | — | — |
| disabled | 是否只读 | boolean | — | false |
| character | 自定义字符 | string/ReactNode | — | — |
| total | star总数 | number | — | 5 |
| value | 当前选中star数量 | number | — | 0 |
| lowThreshold | 低分和中等分数的界限值，值本身被划分在低分中 | number | — | 2 |
| highThreshold | 高分和中等分数的界限值，值本身被划分在高分中 | number | — | 4 |
| colors | star颜色数组，共有3个元素，为3个分段所对应的颜色 | array | — | ['#99A9BF', '#F8DC09', '#FAAD14'] |

### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| onChange | 选择时的回调 | (value: number) => void |
| onFocus | 选择焦点时的回调 | (e:Event) => void |
| onBlur | 失去焦点时的回调 | (e:Event) => void |
| onHoverChange | 鼠标经过时数值变化的回调 | (value: number/null) => void |
| onKeyDown | 键盘按键回调 | (e:Event) => void | 
