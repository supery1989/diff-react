## Copyright 版权

用于显示网站底部的版权信息。

### 基本用法

::: demo
```js
render() {
  return (
    <div>
      <div className='demo-section'><Copyright start='2001' author='Diff React Ui' /></div>
      <div className='demo-section'><Copyright icon={false} start='2001' author='Diff React Ui' /></div>
    </div>
  )
}
```
:::

### Copyright Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| className | 容器类名 | string | — | — |
| style | 指定样式 | object | — | — |
| icon | 是否显示版权图标 | boolean | — | true |
| date | 是否显示版权终止时间 | boolean | — | true |
| start | 是否显示版权开始时间 | number | — | — |
| author | 是否显示版权所有者 | string | — | — |
