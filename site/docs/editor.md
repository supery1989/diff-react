## Editor 富文本编辑器

所见即所得的文本编辑器。

### 基本用法

::: demo
```js
render() {
  return (
    <Editor placeholder='请输入内容' />
  )
}
```
:::

### 只读状态

::: demo
```js
render() {
  return (
    <Editor placeholder='请输入内容' readOnly />
  )
}
```
:::

### 禁用状态

::: demo
```js
render() {
  return (
    <Editor placeholder='请输入内容' disabled />
  )
}
```
:::

### 个性化提示

::: demo
```js
render() {
  return (
    <Editor placeholder='请输入内容' componentBelowControlBar={<Alert title="请输入内容" type="info" showIcon />} />
  )
}
```
:::

### 自定义工具栏

可选工具参数如下control表。

::: demo
```js
render() {
  return (
    <Editor placeholder='请输入内容' controls={['undo']} />
  )
}
```
:::

### 获取编辑器内容

::: demo
```js
state = {
  value: ''
}
handleChange(value) {
  this.setState({
    value
  })
}
render() {
  return (
    <div>
      <Editor placeholder='请输入内容' onChange={this.handleChange.bind(this)} />
      <div className='demo-section'>
        内容为：{this.state.value}
      </div>
    </div>
  )
}
```
:::

### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| className | 编辑器的样式名 | string | — | — |
| style | 编辑器的内联样式 | object | — | — |
| id | 编辑器的id | string | — | — |
| controlBarClassName | 编辑器工具栏的样式名 | string | — | — |
| controlBarStyle | 编辑器工具栏的内联样式 | object | — | — |
| contentClassName | 编辑器编辑区域容器的样式名 | string | — | — |
| contentStyle | 编辑器编辑区域容器的内联样式 | object | — | — |
| value | 编辑器的内容 | any | @ | @ |
| placeholder | 指定Placeholder文本 | string | @ | 请输入内容 |
| readOnly | 指定编辑器是否只读 | boolean | @ | false |
| disabled | 指定编辑器是否禁用 | boolean | @ | false |
| componentBelowControlBar | 在工具栏和编辑区域之间显示的组件,用于做提示等 | ReactNode | @ | @ |
| fontSizes | 编辑器可用的字号列表 | number[] | @ | @ |
| fontFamilies | 编辑器可用的字体列表 | array | @ | @ |
| lineHeights | 编辑器可用的行高列表 | number[] | @ | @ |
| stripPastedStyles | 是否以纯文本模式粘贴内容 | boolean | @ | false |
| height | 编辑器编辑区域容器的高度 | number | @ | 200 |
| controls | 编辑器的工具栏控件列表 | array | @ | @ |

### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| onChange | 编辑器状态(内容、选区等)发生变化时的回调函数 | (value: any) => void |
| onFocus | 编辑器获得焦点时触发的函数 | () => void |
| onBlur | 编辑器失去焦点时触发的函数 | (value: any) => void |

### Control Attributes
| 参数      | 说明          |
|---------- |-------------- |
| undo | 撤销操作 |
| redo | 重做操作 |
| font-size | 文字字号选择器 |
| font-family | 文字字体选择器 |
| line-height | 文字行高选择器 |
| letter-spacing | 文字字间距选择器 |
| text-color | 文字颜色选择器，包含文字背景颜色设置 |
| bold | 设置文字加粗 |
| italic | 设置文字斜体 |
| underline | 设置文字下划线 |
| strike-through | 设置文字删除线 |
| superscript | 设置文字为上标 |
| subscript | 设置文字为下标 |
| remove-styles | 清除文字样式 |
| emoji | Emoji表情选择器 |
| text-indent | 段落缩进工具，最多可缩进6级 |
| text-align | 文字对齐方式工具，可通过textAligns属性来指定可以使用哪些对齐方式 |
| headings | 标题工具 |
| list-ul | 无需列表工具 |
| list-ol | 有序列表工具 |
| blockquote | 引用工具 |
| code | 代码块工具 |
| link | 链接插入工具 |
| hr | 水平线工具 |
| media | 多媒体插入工具 |
| clear | 内容清除工具 |
| priview | 预览工具 |
| separator | 分割线，连续的多个separator将只显示为1个 |
