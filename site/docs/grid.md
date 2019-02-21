## Grid 栅格

通过基础的 24 分栏，迅速简便地创建布局。

### 基本用法

使用单一的一组 Row 和 Col 栅格组件，就可以创建一个基本的栅格系统，所有列（Col）必须放在 Row 内。

::: demo
```js
render() {
  return (
    <div className='demo-grid'>
      <Row>
        <Col span={12}><div className='demo-grid-box'>col-12</div></Col>
        <Col span={12}><div className='demo-grid-box'>col-12</div></Col>
      </Row>
      <Row>
        <Col span={8}><div className='demo-grid-box'>col-8</div></Col>
        <Col span={8}><div className='demo-grid-box'>col-8</div></Col>
        <Col span={8}><div className='demo-grid-box'>col-8</div></Col>
      </Row>
      <Row>
        <Col span={6}><div className='demo-grid-box'>col-6</div></Col>
        <Col span={6}><div className='demo-grid-box'>col-6</div></Col>
        <Col span={6}><div className='demo-grid-box'>col-6</div></Col>
        <Col span={6}><div className='demo-grid-box'>col-6</div></Col>
      </Row>
    </div>
  )
}
```
:::

### 分栏间隔

使用 Row 的 gutter 属性。

::: demo
```js
render() {
  return (
    <div className='demo-grid'>
      <Row gutter={16}>
        <Col span={6}><div className='demo-grid-box'>col-6</div></Col>
        <Col span={6}><div className='demo-grid-box'>col-6</div></Col>
        <Col span={6}><div className='demo-grid-box'>col-6</div></Col>
        <Col span={6}><div className='demo-grid-box'>col-6</div></Col>
      </Row>
    </div>
  )
}
```
:::

### 分栏偏移

支持偏移指定的栏数。

::: demo 通过制定 Col 组件的 offset 属性可以指定分栏偏移的栏数。
```js
render() {
  return (
    <div className='demo-grid'>
      <Row>
        <Col span={6}><div className='demo-grid-box'>col-6</div></Col>
        <Col span={6}><div className='demo-grid-box'>col-6</div></Col>
        <Col span={6} offset={6}><div className='demo-grid-box'>col-6</div></Col>
      </Row>
      <Row>
        <Col span={6}><div className='demo-grid-box'>col-6</div></Col>
        <Col span={6}><div className='demo-grid-box'>col-6</div></Col>
        <Col span={6}><div className='demo-grid-box'>col-6</div></Col>
        <Col span={6}><div className='demo-grid-box'>col-6</div></Col>
      </Row>
    </div>
  )
}
```
:::

### 分栏排序

通过使用 push 和 pull 类就可以很容易的改变列（column）的顺序。

::: demo
```js
render() {
  return (
    <div className='demo-grid'>
      <Row>
        <Col push={6} span={18}><div className='demo-grid-box'>col-18</div></Col>
        <Col pull={18} span={6}><div className='demo-grid-box'>col-6</div></Col>
      </Row>
      <Row>
        <Col span={18}><div className='demo-grid-box'>col-18</div></Col>
        <Col span={6}><div className='demo-grid-box'>col-6</div></Col>
      </Row>
    </div>
  )
}
```
:::

### Flex布局

栅格默认 float 布局，通过 type 可以启用 flex 布局；flex 布局下可以通过 justify 和 align 设置布局对齐方式。

::: demo
```js
render() {
  return (
    <div className='demo-grid'>
      <Row gutter={16} type='flex'>
        <Col span={4}><div className='demo-grid-box'>col-4</div></Col>
        <Col span={4}><div className='demo-grid-box'>col-4</div></Col>
        <Col span={4}><div className='demo-grid-box'>col-4</div></Col>
        <Col span={4}><div className='demo-grid-box'>col-4</div></Col>
      </Row>
      <Row gutter={16} type='flex' justify='center'>
        <Col span={4}><div className='demo-grid-box'>col-4</div></Col>
        <Col span={4}><div className='demo-grid-box'>col-4</div></Col>
        <Col span={4}><div className='demo-grid-box'>col-4</div></Col>
        <Col span={4}><div className='demo-grid-box'>col-4</div></Col>
      </Row>
      <Row gutter={16} type='flex' justify='space-between'>
        <Col span={4}><div className='demo-grid-box'>col-4</div></Col>
        <Col span={4}><div className='demo-grid-box'>col-4</div></Col>
        <Col span={4}><div className='demo-grid-box'>col-4</div></Col>
        <Col span={4}><div className='demo-grid-box'>col-4</div></Col>
      </Row>
      <Row gutter={16} type='flex' justify='space-around'>
        <Col span={4}><div className='demo-grid-box'>col-4</div></Col>
        <Col span={4}><div className='demo-grid-box'>col-4</div></Col>
        <Col span={4}><div className='demo-grid-box'>col-4</div></Col>
        <Col span={4}><div className='demo-grid-box'>col-4</div></Col>
      </Row>
      <Row gutter={16} type='flex' align='center'>
        <Col span={4}><div className='demo-grid-box'>col-4</div></Col>
        <Col span={4}><div className='demo-grid-box demo-grid-box-big'>col-4</div></Col>
        <Col span={4}><div className='demo-grid-box'>col-4</div></Col>
        <Col span={4}><div className='demo-grid-box'>col-4</div></Col>
      </Row>
    </div>
  )
}
```
:::

### Flex排序

flex 布局下课通过 order 属性设置顺序。

::: demo
```js
render() {
  return (
    <div className='demo-grid'>
      <Row gutter={16} type='flex'>
        <Col span={6} order={4}><div className='demo-grid-box'>1</div></Col>
        <Col span={6} order={3}><div className='demo-grid-box'>2</div></Col>
        <Col span={6} order={2}><div className='demo-grid-box'>3</div></Col>
        <Col span={6} order={1}><div className='demo-grid-box'>4</div></Col>
      </Row>
    </div>
  )
}
```
:::

### 响应式布局

参照 Bootstrap 的 响应式设计，预设六个响应尺寸：xs sm md lg xl  xxl。

::: demo
```js
render() {
  return (
    <div className='demo-grid'>
      <Row gutter={16} type='flex'>
        <Col xs={6} sm={4}><div className='demo-grid-box'>1</div></Col>
        <Col xs={6} sm={8}><div className='demo-grid-box'>2</div></Col>
        <Col xs={6} sm={4}><div className='demo-grid-box'>3</div></Col>
        <Col xs={6} sm={8}><div className='demo-grid-box'>4</div></Col>
      </Row>
    </div>
  )
}
```
:::

### Row Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| className | 容器类名 | string | — | — |
| style | 指定样式 | object | — | — |
| tag | 自定义元素标签 | string | - | div |
| gutter | 栅格间隔 | number | - | 0 |
| type | 布局模式，flex在现代浏览器下有效 | string | flex/float | float |
| justify | flex 布局下的水平排列方式 | string | flex-start/flex-end/center/space-between/space-around/space-evenly | flex-start |
| align | flex 布局下的垂直排列方式 | string | stretch/center/flex-start/flex-end/baseline | flex-start |

### Col Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| className | 容器类名 | string | — | — |
| style | 指定样式 | object | — | — |
| tag | 自定义元素标签 | string | - | div |
| span | 栅格占据的列数，必选参数 | number | 1-24 | - |
| 栅格左侧的间隔格数，间隔内不可以有栅格 | offset | number | 1-24 | - |
| pull | 栅格向左移动格数 | number | 1-24 | - |
| push | 栅格向右移动格数 | number | 1-24 | - |
| order | 栅格顺序，flex 布局模式下有效 | number | 1-24 | - |
| xs | <576px 响应式栅格数或者栅格属性对象 | number/object (例如： {span: 4, offset: 4}) | - | - |
| sm | >=576px 响应式栅格数或者栅格属性对象 | number/object (例如： {span: 4, offset: 4}) | - | - |
| md | >=768px 响应式栅格数或者栅格属性对象 | number/object (例如： {span: 4, offset: 4}) | - | - |
| lg | >=992px 响应式栅格数或者栅格属性对象 | number/object (例如： {span: 4, offset: 4}) | - | - |
| xl | >=1200px 响应式栅格数或者栅格属性对象 | number/object (例如： {span: 4, offset: 4}) | - | - |
| xxl | >=1600px 响应式栅格数或者栅格属性对象 | number/object (例如： {span: 4, offset: 4}) | - | - |
