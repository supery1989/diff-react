## Avatar 头像

用来代表用户或事物。

### 基本用法

::: demo
```js
render() {
  return (
    <Row>
      <Col span={24}>
        <Avatar />
        <Avatar style={{marginLeft: '10px'}}>Y</Avatar>
        <Avatar shape='square' style={{marginLeft: '10px'}} />
        <Avatar shape='square' style={{marginLeft: '10px'}}>Y</Avatar>
      </Col>
    </Row>
  )
}
```
white
:::

### 不同尺寸

::: demo
```js
render() {
  return (
    <Row>
      <Col span={24}>
        <Avatar size='small' />
        <Avatar style={{marginLeft: '10px'}} />
        <Avatar size='large' style={{marginLeft: '10px'}} />
        <Avatar size={46} style={{marginLeft: '10px'}} />
      </Col>
    </Row>
  )
}
```
white
:::

### 自适应文字大小

::: demo
```js
render() {
  return (
    <Row>
      <Col span={24}>
        <Avatar>Y</Avatar>
        <Avatar style={{marginLeft: '10px'}}>YY</Avatar>
        <Avatar style={{marginLeft: '10px'}}>YYY</Avatar>
        <Avatar style={{marginLeft: '10px'}}>YYYY</Avatar>
        <Avatar style={{marginLeft: '10px'}}>YYYYY</Avatar>
        <Avatar style={{marginLeft: '10px'}}>YYYYYY</Avatar>
        <Avatar style={{marginLeft: '10px'}}>YYYYYYY</Avatar>
      </Col>
    </Row>
  )
}
```
white
:::

### 自定义样式

::: demo
```js
render() {
  return (
    <Row>
      <Col span={24}>
        <Avatar style={{ backgroundColor: '#a5656c' }}>Y</Avatar>
        <Badge dot>
          <Avatar style={{marginLeft: '10px'}} />
        </Badge>
      </Col>
    </Row>
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
| shape | 指定头像的形状 | string | circle/square | circle |
| size | 设置头像的大小 | string | large/default/small/number | default |
| src | 图片类头像的资源地址 | string | — | — |
| alt | 图片类头像的替代文本 | string | — | — |
| icon | 图标类头像的图标类型 | string | ICON组件类型 | user |

### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| onError | 图片类头像资源加载错误回调 | () => void |
