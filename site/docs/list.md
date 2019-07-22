## List 列表

列表组件。

### 基本用法

::: demo
```js
render() {
  return (
    <List header='头部' footer='底部'>
      <List.Item>list1</List.Item>
      <List.Item>list1</List.Item>
      <List.Item>list1</List.Item>
    </List>
  )
}
```
:::

### 不同尺寸

::: demo
```js
render() {
  return (
    <Row gutter={20}>
      <Col span={12}>
        <List header='头部' footer='底部' size='small'>
          <List.Item>list2</List.Item>
          <List.Item>list3</List.Item>
          <List.Item>list4</List.Item>
        </List>
      </Col>
      <Col span={12}>
        <List header='头部' footer='底部' size='large'>
          <List.Item>list2</List.Item>
          <List.Item>list3</List.Item>
          <List.Item>list4</List.Item>
        </List>
      </Col>
    </Row>
  )
}
```
:::

### 禁用、激活、链接状态

::: demo
```js
render() {
  return (
    <List header='头部' footer='底部'>
      <List.Item active>我激活了</List.Item>
      <List.Item disabled>我禁用了</List.Item>
      <List.Item href="http://www.baidu.com" target='_blank'>我是链接</List.Item>
    </List>
  )
}
```
:::

### 通过data和renderItem配置列表

::: demo
```js
renderItem(item: any, index: number) {
  return <List.Item {...item} key={index}>{item.children}</List.Item>
}
render() {
  const data = [
    {active: true, children: 'list1'},
    {disabled: true, children: 'list2'},
    {href: 'http://www.baidu.com', children: 'list3'},
  ]
  return (
    <List header='头部' footer='底部' data={data} renderItem={this.renderItem.bind(this)} />
  )
}
```
:::

### List Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| className | 容器类名 | string | — | — |
| style | 指定样式 | object | — | — |
| border | 是否展示边框 | boolean | — | true |
| strip | 是否斑马线效果 | boolean | — | true |
| data | 已数组方式配置列表 | Array<any> | — | — |
| header | 列表头部 | string/React.ReactNode | — | — |
| footer | 列表底部 | string/React.ReactNode | — | — |
| size | 设置行尺寸，分别大、中、小三种尺寸 | small/default/large | — | default |


### List Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| renderItem | 自定义渲染行的函数 | (item: any, index: number) => void |

### List.Item Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| className | 容器类名 | string | — | — |
| style | 指定样式 | object | — | — |
| disabled | 是否禁用 | boolean | — | false |
| active | 是否激活 | boolean | — | false |
| href | 规定链接的目标,true 的时候是个超链接,此时将可以设置标签a的所有属性 | string | — | — |
