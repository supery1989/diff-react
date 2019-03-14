## BlockHeader 标题

用于展示一个模块标题。

### 基本用法

::: demo
```js
render() {
  return (
    <div>
      <BlockHeader title='我是一个标题' extra='更多' />
      <BlockHeader title='我是一个标题' extra={<a href='http://www.baidu.com' target='_blank'>更多</a>} />
      <BlockHeader title='我是一个标题' subTitle='我是一个副标题' extra='更多' />
      <BlockHeader title='我是一个标题' extra='更多' info='提示' />
      <BlockHeader title='我是一个标题，提示图标和上面不一样了' extra='更多' icon='info' info='提示' />
      <BlockHeader title='我是一个标题，提示需要点击' extra='更多' info='提示' trigger='click' />
      <BlockHeader title='我是一个标题，更多部分却没在右侧' extra='更多' align='left' />
      <BlockHeader title='我是一个标题，提示是弹窗' extra='更多' info='提示' infoType='popup' />
    </div>
  )
}
```
:::

### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| className | 容器类名 | string | — | — |
| style | 指定样式 | object | — | — |
| title | 标题 | string | — | — |
| subTitle | 子标题 | string/React.ReactNode | — | — |
| extra | 扩展的可操作部分 | string/React.ReactNode | — | — |
| align | 扩展部分对齐方式 | string | left/right | right |
| info | 信息提示的内容 | string/React.ReactNode | — | — |
| infoTitle | 信息提示类型为popup时，弹窗的标题 | string | — | 温馨提示 |
| icon | 信息提示图标的类型 | string | question/info | question |
| infoType | 信息提示的类型 | string | tooltip/popup' | tooltip |
| trigger | 信息提示为tooltip时的触发类型 | string | hover/click/focus | hover |

### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| onClick | 扩展部分点击的回调 | () => void |
