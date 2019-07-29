## Carousel 走马灯

在有限空间内，循环播放同一类型的图片、文字等内容。

### 基本用法

::: demo
```js
render() {
  return (
    <Carousel className='demo-carousel-wrapper'>
      {
        [1, 2, 3, 4].map((item, index) => {
          return (
            <Carousel.Item key={index}>{item}</Carousel.Item>
          )
        })
      }
    </Carousel>
  )
}
```
:::

### 点击方式切换

::: demo
```js
render() {
  return (
    <Carousel className='demo-carousel-wrapper' trigger='click'>
      {
        [1, 2, 3, 4].map((item, index) => {
          return (
            <Carousel.Item key={index}>{item}</Carousel.Item>
          )
        })
      }
    </Carousel>
  )
}
```
:::

### 设置指示器位置

::: demo
```js
render() {
  return (
    <Row gutter={12}>
      <Col span={12}>
        <Carousel className='demo-carousel-wrapper' indicator='out'>
          {
            [1, 2, 3, 4].map((item, index) => {
              return (
                <Carousel.Item key={index}>{item}</Carousel.Item>
              )
            })
          }
        </Carousel>
      </Col>
      <Col span={12}>
        <Carousel className='demo-carousel-wrapper' indicator='none'>
          {
            [1, 2, 3, 4].map((item, index) => {
              return (
                <Carousel.Item key={index}>{item}</Carousel.Item>
              )
            })
          }
        </Carousel>
      </Col>
    </Row>
  )
}
```
:::

### 设置指示器形状

::: demo
```js
render() {
  return (
    <Carousel className='demo-carousel-wrapper' dot>
      {
        [1, 2, 3, 4].map((item, index) => {
          return (
            <Carousel.Item key={index}>{item}</Carousel.Item>
          )
        })
      }
    </Carousel>
  )
}
```
:::

### 设置指示器箭头展示时间

::: demo
```js
render() {
  return (
    <Carousel className='demo-carousel-wrapper' arrow='hover'>
      {
        [1, 2, 3, 4].map((item, index) => {
          return (
            <Carousel.Item key={index}>{item}</Carousel.Item>
          )
        })
      }
    </Carousel>
  )
}
```
:::

### 卡片化

::: demo
```js
render() {
  return (
    <Carousel className='demo-carousel-wrapper' type='card'>
      {
        [1, 2, 3, 4].map((item, index) => {
          return (
            <Carousel.Item key={index}>{item}</Carousel.Item>
          )
        })
      }
    </Carousel>
  )
}
```
:::

### 扁平卡片化

::: demo
```js
render() {
  return (
    <Carousel className='demo-carousel-wrapper' type='flatcard'>
      {
        [1, 2, 3, 4].map((item, index) => {
          return (
            <Carousel.Item key={index}>{item}</Carousel.Item>
          )
        })
      }
    </Carousel>
  )
}
```
:::

### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| className | 容器类名 | string | — | — |
| style | 指定样式 | object | — | — |
| height | 幻灯片高度 | number | — | 300 |
| interval | 自动切换的时间间隔，单位为毫秒，负数不切换 | number | — | 3000 |
| autoplay | 是否自动切换 | boolean | — | true |
| initialIndex | 初始状态激活的幻灯片的索引，从 0 开始 | number | — | 0 |
| type | 幻灯片类型 | string | card/flatcard/default | default |
| trigger | 指示器的触发方式 | string | click/hover | hover |
| arrow | 切换箭头的显示时机 | string | always/hover/never | always |
| indicator | 指示器的位置 | string | in/out/none | in |
| dot | 指示器形状是否为圆点 | boolean | — | false |

### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| onChange | 幻灯片切换时的回调 | (prevIndex, currentIndex) => void |
| prev | 切换至上一张幻灯片 | — |
| next | 切换至下一张幻灯片 | — |
| setActiveItem | 手动切换幻灯片 | 从0开始 |
