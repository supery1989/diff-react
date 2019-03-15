## Button 按钮

用于开始一个即时操作。

### 基本用法

::: demo
```js
render() {
  return (
    <Button>按钮</Button>
  )
}
```
:::

### 按钮类型

通过type设置按钮类型，内置了default/primary/success/info/warning/danger/link 七种类型，默认为default

::: demo type为link时可以通过href属性设置调整链接
```js
render() {
  return (
    <div>
      <Button text="默认按钮" />
      <Button type="primary" text="主按钮" />
      <Button type="success" text="成功按钮" />
      <Button type="info" text="提示按钮" />
      <Button type="warning" text="警告按钮" />
      <Button type="danger" text="危险按钮" />
      <Button type="link" text="链接按钮" />
    </div>
  )
}
```
:::

### 按钮尺寸

通过size设置尺寸，内置了small/large/default三种尺寸

::: demo type为link时可以通过href属性设置调整链接
```js
render() {
  return (
    <div>
      <Button type="primary" size="small" text="小按钮" />
      <Button type="primary" text="正常按钮" />
      <Button type="primary" size="large" text="大按钮" />
    </div>
  )
}
```
:::

### 不可用状态

通过disabled设置，默认为true

::: demo
```js
render() {
  return (
    <div>
      <Button text="默认按钮" disabled />
      <Button type="primary" text="主按钮" disabled />
      <Button type="success" text="成功按钮" disabled />
      <Button type="info" text="提示按钮" disabled />
      <Button type="warning" text="警告按钮" disabled />
      <Button type="danger" text="危险按钮" disabled />
      <Button type="link" text="链接按钮" disabled />
    </div>
  )
}
```
white
:::

### 圆角按钮

通过round设置是否为圆角按钮，默认为true

::: demo
```js
render() {
  return (
    <div>
      <Button type="primary" text="直角按钮" round={false} />
      <Button type="primary" text="圆角按钮" />
    </div>
  )
}
```
:::

### 圆形按钮

通过circle设置为是否为圆形按钮，默认为false

::: demo
```js
render() {
  return (
    <div>
      <Button type="primary" circle />
    </div>
  )
}
```
:::

### 朴素按钮

通过设置plain为朴素按钮，默认为false

::: demo
```js
render() {
  return (
    <div>
      <Button text="默认按钮" plain />
      <Button type="primary" text="主按钮" plain />
      <Button type="success" text="成功按钮" plain />
      <Button type="info" text="提示按钮" plain />
      <Button type="warning" text="警告按钮" plain />
      <Button type="danger" text="危险按钮" plain />
      <Button type="link" text="链接按钮" plain />
    </div>
  )
}
```
:::

### 图标按钮

通过icon设置为是否为图标按钮，图标type参考图标组件。

::: demo
```js
render() {
  return (
    <div>
      <Button type="primary" icon="user" text="用户" />
      <Button type="primary" icon="arrowleft" />
      <Button type="primary" icon="arrowleft" iconPosition="right" text="箭头" />
    </div>
  )
}
```
:::

### 加载中状态

::: demo
```js
render() {
  return (
    <div>
      <Button type="primary" loading />
      <Button type="success" text="成功按钮" loading />
    </div>
  )
}
```
:::

### 块级按钮

设置block为true可以设置按钮宽度等于父级元素宽度的按钮

::: demo
```js
render() {
  return (
    <div>
      <Button type="primary" block text="块级按钮" />
    </div>
  )
}
```
:::

### 按钮事件

内置了click和mouseleave两种事件

::: demo
```js
render() {
  return (
    <div>
      <Button type="primary" text="按钮" onClick={() => alert("click")} onMouseLeave={() => alert("leave")} />
    </div>
  )
}
```
:::

### 倒计时按钮

通过设置during属性来设置倒计时时间。

::: demo
```js
render() {
  return (
    <div>
      <Button type="primary" text="可以点击" onClick={() => alert('click')} during={5} />
    </div>
  )
}
```
:::

### 按钮组合

::: demo
```js
render() {
  return (
    <Button.Group size='large'>
      <Button>按钮1</Button>
      <Button>按钮2</Button>
      <Button type='primary'>按钮3</Button>
    </Button.Group>
  )
}
```
:::

### Button Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| className | 容器类名 | string | — | — |
| style | 指定样式 | object | — | — |
| text | 按钮的文本 | string | — | — |
| type | 设置按钮类型 | string | default/primary/success/info/warning/danger/link | default |
| href | 点击跳转的地址，type为link时可设置 | string | — | — |
| target | 相当于 a 链接的 target 属性，href 存在时生效 | string | — | — |
| size | 设置按钮大小，可选值为 small large 或者不设 | string | — | — |
| disabled | 按钮失效状态 | boolean | — | false |
| round | 是否圆角 | boolean | — | false |
| circle | 是否圆形 | boolean | — | false |
| plain | 是否为朴素 | boolean | — | false |
| icon | 设置按钮的图标类型 | string | — | — |
| loading | 设置按钮载入状态 | boolean | — | false |
| nativeType | 原生类型 | submit/reset | — | — |
| block | 将按钮宽度调整为其父宽度的选项 | boolean | — | false |
| during | 设置后为倒计时按钮，单位：秒 | number | — | — |
| initDuring | 是否在组件加载完成后立即开启倒计时 | boolean | — | false |

### Button Group Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| className | 容器类名 | string | — | — |
| style | 指定样式 | object | — | — |
| size | 设置按钮大小，可选值为 small large 或者不设 | string | — | — |

### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| onClick | 点击按钮时的回调 | (event) => void |
| onMouseLeave | 鼠标离开按钮时的回调 | (event) => void |
