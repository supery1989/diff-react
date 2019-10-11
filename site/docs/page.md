## Page 分页

采用分页的形式分隔长列表，每次只加载一个页面。

### 基本用法

::: demo
```js
render() {
  return (
    <div>
      <Page total={17} />
      <Page total={170} />
    </div>
  )
}
```
white
:::

### 小型分页

::: demo
```js
render() {
  return (
    <div>
      <Page small total={17} />
      <Page small total={170} />
    </div>
  )
}
```
white
:::

### 自定义上一页/下一页按钮文案

::: demo
```js
render() {
  return (
    <div>
      <Page prevBtnText='上一页' nextBtnText='下一页' total={170} />
    </div>
  )
}
```
white
:::

### 只有一页时隐藏分页

::: demo
```js
state = {
  total: 10
}

toggle() {
  const total = this.state.total > 10 ? 9 : 170
  this.setState({
    total
  })
}

render() {
  return (
    <div>
      <Button text='切换' onClick={this.toggle.bind(this)} />
      <Page hideOnSinglePage total={this.state.total} />
    </div>
  )
}
```
white
:::

### 显示总页数

::: demo
```js
render() {
  return (
    <div>
      <Page total={168} showTotal />
      <Page pageSize={20} total={168} showTotal={(total, range) => `${range[0]}-${range[1]}/${total}`} />
    </div>
  )
}
```
white
:::

### 直接前往

::: demo
```js
render() {
  return (
    <Page total={170} showJumper />
  )
}
```
white
:::

### 更改每页数量

::: demo
```js
render() {
  return (
    <div>
      <Page total={170} pageSizes />
      <Page total={170} pageSizes={[20, 40, 60]} />
    </div>
  )
}
```
white
:::

### 事件回调

::: demo
```js
state = {
  page: 1,
  pageSize: 10
}

handleChange(page, pageSize) {
  this.setState({
    page,
    pageSize
  })
}

render() {
  return (
    <div>
      <div>已选择第 {this.state.page} 页,每页 {this.state.pageSize} 条</div>
      <Page pageSize={20} pageSizes total={170} onChange={this.handleChange.bind(this)} />
    </div>
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
| total | 总数据条数 | number | - |
| pagerCount | 最大显示按钮树，超过会已...替代 | number | - | 7 |
| showPrev | 是否显示上一页按钮 | boolean | - | true |
| showNext | 是否显示下一页按钮 | boolean | - | true |
| showJumper | 是否显示前往第几页 | boolean | - | false |
| pageSize | 每页数量 | number | — | 10 |
| pageSizes | 是否显示切换每页条数或者定义每页切换条数 | boolean/number[] | - | false |
| small | 是否显示简洁模式 | boolean | - | false |
| hideOnSinglePage | 只有一页时是否隐藏分页器 | boolean | - | false |
| prevBtnText | 自定义上一页按钮文案 | string/React.ReactNode | - | Icon type='left' |
| nextBtnText | 自定义下一页按钮文案 | string/React.ReactNode | - | Icon type='right' |
| showTotal | 显示总条数 | (total: number, range?: number[]) => React.ReactNode/boolean | - | - |

### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| onChange | 页面发生变化时的回调 | (page: number, pageSize?: number) => void |
