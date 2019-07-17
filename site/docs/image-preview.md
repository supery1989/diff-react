## ImagePreview 图片预览

用于放大图片进行预览。

### 基本用法

::: demo
```js
render() {
  return (
    <ImagePreview style={{ width: '250px', height: '300px' }} src={this.props.imgSrc} alt='世外桃源' />
  )
}
```
:::

### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| className | 容器类名 | string | — | — |
| style | 指定样式 | object | — | — |
| src | 图片路径 | string | — | — |
| alt | 图片说明 | string | — | — |
| title | 图片标题 | string | — | — |
| action | 是否显示悬浮动作按钮 | boolean | — | true |

### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| onClose | 关闭图片预览界面时的回调 | () => void |
