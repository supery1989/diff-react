## Card 卡片

将信息聚合在卡片容器中展示。

### 基本用法

::: demo
```js
render() {
  return (
    <Card title='卡片' extra='更多' footer='底部'>
      卡片内容 <br/>
      卡片内容 <br/>
      卡片内容
    </Card>
  )
}
```
:::

### 简洁卡片

::: demo
```js
render() {
  return (
    <Card>
      卡片内容 <br/>
      卡片内容 <br/>
      卡片内容
    </Card>
  )
}
```
:::

### 无边框

::: demo
```js
render() {
  return (
    <div style={{background: 'rgb(236, 236, 236)', padding: '20px'}}>
      <Card title='卡片' extra='更多' footer='底部' noBorder>
        卡片内容 <br/>
        卡片内容 <br/>
        卡片内容
      </Card>
    </div>
  )
}
```
:::

### 鼠标滑过无阴影

::: demo
```js
render() {
  return (
    <Card title='卡片' extra='更多' footer='底部' noHover>
      卡片内容 <br/>
      卡片内容 <br/>
      卡片内容
    </Card>
  )
}
```
:::

### 激活

::: demo
```js
render() {
  return (
    <Card title='卡片' extra='更多' footer='底部' active>
      卡片内容 <br/>
      卡片内容 <br/>
      卡片内容
    </Card>
  )
}
```
:::

### 带图片

::: demo
```js
footerNode() {
  return (
    <div>
      <span>好看的风景</span>
      <div>
        <span>2019—01—01 15:00</span>
        <Button type='link' text='操作按钮' />
      </div>
    </div>
  )
}

render() {
  return (
    <Card bodyStyle={{padding: 0}} footer={this.footerNode()}>
      <img src={this.props.imgSrc} style={{display: 'block'}} width='100%' />
    </Card>
  )
}
```
:::

### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| className | 容器类名 | string | — | — |
| style | 指定样式 | object | — | — |
| title | 卡片标题 | string/React.ReactNode | — | — |
| extra | 卡片右上角的操作区域 | string/React.ReactNode | — | — |
| bodyClass | 设置 body 的 className | string | — | — |
| bodyStyle | 设置 body 的样式 | object | — | — |
| footer | 页脚内容 | string/React.ReactNode | — | — |
| noBorder | 无边框 | boolean | — | false |
| noHover | 取消鼠标移过时边框阴影 | boolean | — | false |
| active | 展示鼠标经过的样式 | boolean | — | false |
