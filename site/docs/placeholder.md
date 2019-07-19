## Placeholder 占位块

用于区块等待状态时的占位展示。

### 基本用法

::: demo
```js
render() {
  return (
    <Placeholder.TextBlock rows={6} />
  )
}
```
white
:::

### 富文本块

::: demo
```js
render() {
  return (
    <Placeholder.RichTextBlock rows={6} size={140} />
  )
}
```
white
:::

### 自定义占位块

::: demo
```js
render() {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Placeholder.Circle diameter={160} />
      <Placeholder.TextBlock rows={6} style={{ margin: '0 10px' }} />
      <Placeholder.Rectangle width={160} height={160} />
    </div>
  )
}
```
white
:::

### TextBlock Attributes
##### 文本块
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| className | 容器类名 | string | — | — |
| style | 指定样式 | object | — | — |
| rows | 文本块行数 | number | — | — |
| dashed | 文本行是否分段 | boolean | — | true |
| spacing | 顶部间距 | string/number | — | 0.7em |
| animate | 是否开启动画 | boolean | — | true |
| widths | 文本块宽度池，文本行宽度是从这个数组里循环取的。每个宽度都是百分比 | Array<number> | — | — |
| dashSegments | 文本行分段配置池，每段都是百分比或者固定宽度 | Array<number> | — | — |

### RichTextBlock Attributes
##### 富文本块，支持所有 TextBlock 的参数
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| shape | 图形形状，支持圆形和正方形 | string | circle/rect | circle |
| size | 图形大小 | number | — | 80 |

### Text Attributes
##### 文本行
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| className | 容器类名 | string | — | — |
| style | 指定样式 | object | — | — |
| animate | 是否开启动画 | boolean | — | true |
| spacing | 顶部间距 | string/number | — | 0.7em |

### TextDashed Attributes
##### 分段文本行
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| className | 容器类名 | string | — | — |
| style | 指定样式 | object | — | — |
| animate | 是否开启动画 | boolean | — | true |
| spacing | 顶部间距 | string/number | — | 0.7em |
| segments | 分段配置 | Array<number/string> | — | — |

### Circle Attributes
##### 圆形
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| className | 容器类名 | string | — | — |
| style | 指定样式 | object | — | — |
| animate | 是否开启动画 | boolean | — | true |
| diameter | 圆直径 | string/number | — | 80 |

### Rectangle Attributes
##### 矩形
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| className | 容器类名 | string | — | — |
| style | 指定样式 | object | — | — |
| animate | 是否开启动画 | boolean | — | true |
| width | 宽度 | number | — | 80 |
| height | 高度 | number | — | 80 |
