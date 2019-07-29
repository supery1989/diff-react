## Collapse 折叠面板

可同时展开多个面板，面板之间不影响。

### 基本用法

::: demo
```js
render() {
  return (
    <Collapse value={[1]}>
      <Collapse.Item title='标题一'><div>我是第一个内容</div></Collapse.Item>
      <Collapse.Item title='标题二'><div>我是第二个内容</div></Collapse.Item>
      <Collapse.Item title='标题三'><div>我是第三个内容</div></Collapse.Item>
      <Collapse.Item title='标题四'><div>我是第四个内容</div></Collapse.Item>
    </Collapse>
  )
}
```
:::

### 手风琴效果

::: demo
```js
render() {
  return (
    <Collapse value={[1]} single>
      <Collapse.Item title='标题一'><div>我是第一个内容</div></Collapse.Item>
      <Collapse.Item title='标题二'><div>我是第二个内容</div></Collapse.Item>
      <Collapse.Item title='标题三'><div>我是第三个内容</div></Collapse.Item>
      <Collapse.Item title='标题四'><div>我是第四个内容</div></Collapse.Item>
    </Collapse>
  )
}
```
:::

### Collapse Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| className | 容器类名 | string | — | — |
| style | 指定样式 | object | — | — |
| value | 当前激活的面板索引，从0开始 | array | — | — |
| single | 是否手风琴效果 | boolean | — | false |

### Collapse Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| onChange | 当前激活面板改变时触发 | (activeItems) => void |

### Collapse.Item Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| className | 容器类名 | string | — | — |
| style | 指定样式 | object | — | — |
| title | 面板标题 | string/ReactNode | — | — |
