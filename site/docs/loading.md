## Loading 加载

用于页面和区块的加载中状态。

### 区域加载

在容器中加载数据时显示。

::: demo 
```js
render() {
  return (
    <Loading className="demo-loading">
      <div className="demo1" />
    </Loading>
  )
}
```
:::

### 加载文案

可自定义加载文案。

::: demo 添加text属性，其值会被渲染为加载文案，并显示在加载图标的下方。
```js
render() {
  return (
    <Loading className="demo-loading" text="正在加载">
      <div className="demo1" />
    </Loading>
  )
}
```
:::

### 整页加载

页面数据加载时显示。

::: demo 当需要全屏遮罩时，可使用full修饰符（此时遮罩会插入至 body 上）。
```js
state = {
    full: false
  }

handleClick = () => {
  this.setState({
    full: true
  }, () => {
    setTimeout(() => {
      this.setState({
        full: false
      })
    }, 3000)
  })
}

render() {
  return (
    <div className="demo-loading">
      <Button text="整页加载，3秒后消失" onClick={this.handleClick} />
      <Loading text="正在加载" loading={false} full={this.state.full}>
        <div className="demo1" />
      </Loading>
    </div>
  )
}
```
:::

### 各种尺寸

小的用于文本加载，默认用于卡片容器级加载，大的用于页面级加载。

::: demo 可通过设置size属性来指定loading尺寸大小，可选small,default,large三种尺寸
```js
render() {
  return (
    <div className="demo-loading">
      <Loading text="正在加载" size="small">
        <div className="demo1" />
      </Loading>
      <Loading text="正在加载">
        <div className="demo1" />
      </Loading>
      <Loading text="正在加载" size="large">
        <div className="demo1" />
      </Loading>
    </div>
  )
}
```
:::

### 自定义指示符

使用自定义指示符。

::: demo 通过设置custom可以使用自定义指示符。
```js
render() {
  const cus = <Icon type="loading2" spin className="demo-custom" />
  return (
    <Loading custom={cus}>
      <div className="demo1" />
    </Loading>
  )
}
```
:::

### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| className | 容器类名 | string | — | — |
| style | 指定样式 | object | - | - |
| full | 是否全屏显示 | boolean | — | false |
| loading | 是否为加载中状态 | boolean | - | true |
| text | 自定义加载文案 | string | — | — |
| size | 组件大小 | small/default/large | — | default |
| custom | 加载指示符 | ReactElement | — | — |
