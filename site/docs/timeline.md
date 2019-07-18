## Timeline 时间轴

依据时间顺序，把一方面或多方面的事件串联起来，形成相对完整的记录体系，再运用图文的形式呈现给用户。

### 基本用法

::: demo
```js
render() {
  return (
    <Timeline>
      <Timeline.Item time='2019-01-01' title='第一个里程碑' message='第一个里程碑完成的内容' />
      <Timeline.Item time='2019-01-02' message='第二个里程碑完成的内容' />
      <Timeline.Item time='2019-01-03' title='第三个里程碑' message='第三个里程碑完成的内容' />
    </Timeline>
  )
}
```
:::

### 数组方式

::: demo
```js
data = [
  { time: '2019-01-01', title: '第一个里程碑', message: '第一个里程碑完成的内容' },
  { time: '2019-01-02', message: '第二个里程碑完成的内容' },
  { time: '2019-01-03', title: '第三个里程碑', message: '第三个里程碑完成的内容' },
]
render() {
  return (
    <Timeline data={this.data} />
  )
}
```
:::

### 自定义圆点内容

::: demo
```js
data = [
  { time: '2019-01-01', title: '第一个里程碑', message: '第一个里程碑完成的内容', dot: '点' },
  { time: '2019-01-02', message: '第二个里程碑完成的内容', dotColor: 'red', dot: <Icon type='home' /> },
  { time: '2019-01-03', title: '第三个里程碑', message: '第三个里程碑完成的内容' },
]
render() {
  return (
    <Timeline data={this.data} />
  )
}
```
:::

### Timeline Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| className | 容器类名 | string | — | — |
| style | 指定样式 | object | — | — |
| data | 数组方式定义时间轴 | Array | @ | @ |
| lineColor | 线颜色 | string | @ | #1890ff |

### Timeline.Item Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| className | 容器类名 | string | — | — |
| style | 指定样式 | object | — | — |
| time | 事件发生的时间 | string/ReactNode | @ | @ |
| title | 事件的标题 | string/ReactNode | @ | @ |
| message | 事件的内容 | string/React.ReactNode | @ | @ |
| dot | 自定义圆点 | string/React.ReactNode | @ | @ |
| dotColor | 圆点颜色 | string | @ | #1890ff |
