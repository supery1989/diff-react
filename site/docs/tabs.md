## Tabs 标签页

分隔内容上有关联但属于不同类别的数据集合。

### 基本用法

::: demo
```js
state = {
  tabs: [
    { label: '标签页1', content: '标签页1'},
    { label: '标签页2', content: '标签页2'},
    { label: '标签页3', content: '标签页3'},
    { label: '标签页4', content: '标签页4'},
  ]
}
render() {
  const { tabs } = this.state
  return (
    <Tabs>
      {tabs.map((tab, index) => {
        return <Tabs.Pane key={index} {...tab}>{tab.content}</Tabs.Pane>
      })}
    </Tabs>
  )
}
```
white
:::

### 禁用部分tab

::: demo
```js
state = {
  tabs: [
    {name: 1, label: '标签页1', content: '标签页1'},
    {name: 2, label: '标签页2', content: '标签页2'},
    {name: 3, label: '标签页3', content: '标签页3', disabled: true},
    {name: 4, label: '标签页4', content: '标签页4'},
  ]
}
render() {
  const { tabs } = this.state
  return (
    <Tabs current={2}>
      {tabs.map((tab, index) => {
        return <Tabs.Pane key={index} {...tab}>{tab.content}</Tabs.Pane>
      })}
    </Tabs>
  )
}
```
white
:::

### 选项卡样式

::: demo
```js
state = {
  tabs: [
    {name: 1, label: '标签页1', content: '标签页1'},
    {name: 2, label: '标签页2', content: '标签页2'},
    {name: 3, label: '标签页3', content: '标签页3'},
    {name: 4, label: '标签页4', content: '标签页4'},
  ]
}
render() {
  const { tabs } = this.state
  return (
    <Tabs current={2} type='tab'>
      {tabs.map((tab, index) => {
        return <Tabs.Pane key={index} {...tab}>{tab.content}</Tabs.Pane>
      })}
    </Tabs>
  )
}
```
white
:::

### 可关闭

::: demo
```js
state = {
  tabs: [
    {name: 1, label: '标签页1', content: '标签页1'},
    {name: 2, label: '标签页2', content: '标签页2'},
    {name: 3, label: '标签页3', content: '标签页3'},
    {name: 4, label: '标签页4', content: '标签页4'},
  ]
}
render() {
  const { tabs } = this.state
  return (
    <Row gutter={20}>
      <Col span={12}>
        <Tabs current={2} closable>
          {tabs.map((tab, index) => {
            return <Tabs.Pane key={index} {...tab}>{tab.content}</Tabs.Pane>
          })}
        </Tabs>
      </Col>
      <Col span={12}>
        <Tabs current={2} type='tab' closable>
          {tabs.map((tab, index) => {
            return <Tabs.Pane key={index} {...tab}>{tab.content}</Tabs.Pane>
          })}
        </Tabs>
      </Col>
    </Row>
  )
}
```
white
:::

### 卡片化

::: demo
```js
state = {
  tabs: [
    {name: 1, label: '标签页1', content: '标签页1'},
    {name: 2, label: '标签页2', content: '标签页2'},
    {name: 3, label: '标签页3', content: '标签页3'},
    {name: 4, label: '标签页4', content: '标签页4'},
  ]
}
render() {
  const { tabs } = this.state
  return (
    <Tabs current={2} type='card'>
      {tabs.map((tab, index) => {
        return <Tabs.Pane key={index} {...tab}>{tab.content}</Tabs.Pane>
      })}
    </Tabs>
  )
}
```
white
:::

### 自定义标签页

::: demo
```js
custom = <span><Icon type='user' style={{ fontSize: '14px'}} /> 标签页1</span>
state = {
  tabs: [
    {name: 1, label: this.custom, content: '标签页1'},
    {name: 2, label: '标签页2', content: '标签页2'},
    {name: 3, label: '标签页3', content: '标签页3'},
    {name: 4, label: '标签页4', content: '标签页4'},
  ]
}
render() {
  const { tabs } = this.state
  return (
    <Tabs current={2} type='card'>
      {tabs.map((tab, index) => {
        return <Tabs.Pane key={index} {...tab}>{tab.content}</Tabs.Pane>
      })}
    </Tabs>
  )
}
```
white
:::

### 动态增减标签页

::: demo
```js
state = {
  tabs: [
    {name: 1, label: '标签页1', content: '标签页1'},
    {name: 2, label: '标签页2', content: '标签页2'},
    {name: 3, label: '标签页3', content: '标签页3'},
    {name: 4, label: '标签页4', content: '标签页4'},
  ],
}
onAdd() {
  const { tabs } = this.state

  tabs.push({
    label: `新标签页${tabs.length + 1}`,
    name: tabs.length + 1,
    content: `新标签页${tabs.length + 1}`,
  })
  this.setState({
    tabs,
  })
}
render() {
  const { tabs } = this.state
  return (
    <div>
    <Tabs current={2} addable closable onAdd={this.onAdd.bind(this)}>
      {tabs.map((tab, index) => {
        return <Tabs.Pane key={`tabs-${index}`} {...tab}>{tab.content}</Tabs.Pane>
      })}
    </Tabs>
    </div>
    
  )
}
```
white
:::

### 添加额外内容

::: demo
```js
state = {
  tabs: [
    {name: 1, label: '标签页1', content: '标签页1-1'},
    {name: 2, label: '标签页2', content: '标签页2-1'},
    {name: 3, label: '标签页3', content: '标签页3-1'},
    {name: 4, label: '标签页4', content: '标签页4-1'},
  ],
}
onAdd() {
  const { tabs } = this.state

  tabs.push({
    label: `新标签页${tabs.length + 1}`,
    name: tabs.length + 1,
    content: `新标签页${tabs.length + 1}`,
  })
  this.setState({
    tabs,
  })
}
render() {
  const { tabs } = this.state
  return (
    <div>
    <Tabs onDelete={(node, con)=>console.log(con)} current={2} addable closable onAdd={this.onAdd.bind(this)} extra='我是额外内容'>
      {tabs.map((tab, index) => {
        return <Tabs.Pane key={`tabs-${index}`} {...tab}>{tab.content}</Tabs.Pane>
      })}
    </Tabs>
    </div>
    
  )
}
```
white
:::

### Tabs Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| className | 容器类名 | string | — | — |
| style | 指定样式 | object | — | — |
| current | 激活的tab name | string/number | — | 0 |
| type | 风格类型，卡片/选项卡/默认 | string | card/tab/default | default |
| closable | 是否可以关闭 | boolean | — | false |
| addable | 是否可以增加 | boolean | — | false |
| extra | 导航添加额外内容 | string/ReactNode | — | — |

### Tabs Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| onAdd | 点击增加tab按钮时的回调 | () => void |
| onTabClick | 点击tab时的回调 | (name: tab标识, content: tab内容) => void |
| onDelete | 点击关闭tab按钮时的回调 | (name: tab标识, content: tab内容) => void |

### Tabs.Pane Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| className | 容器类名 | string | — | — |
| style | 指定样式 | object | — | — |
| label | 选项卡标题 | string/ReactNode | — | — |
| name | 选项卡标识 | string/number | — | — |
| disabled | 选项卡是否被禁用 | boolean | — | false |
| closable | 选项卡是否可关闭 | boolean | — | false |
