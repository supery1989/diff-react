## Upload 上传

通过点击或者拖拽上传文件

### 基本用法

::: demo
```js
render() {
  return (
    <Upload action='test' />
  )
}
```
:::

### 限制文件类型

::: demo
```js
render() {
  return (
    <Upload action='test' accept='image/png' />
  )
}
```
:::

### 行内模式

::: demo
```js
render() {
  return (
    <Upload action='test' type='inline' />
  )
}
```
:::

### 禁用

::: demo
```js
render() {
  return (
    <Row gutter={20}>
      <Col span={12}>
        <Upload action='test' disabled />
      </Col>
      <Col span={12}>
        <Upload action='test' type='inline' disabled />
      </Col>
    </Row>
  )
}
```
:::

### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| className | 容器类名 | string | — | — |
| style | 指定样式 | object | — | — |
| type | 上传控件的类型 | string | square/inline | square |
| accept | 接受上传的文件类型 | string | — | — |
| disabled | 是否禁用 | boolean | — | false |
| multiple | 是否支持多选文件 | boolean | — | true |
| limit | 最大允许上传个数 | number | — | — |
| name | 上传的文件字段名 | string | — | — |
| headers | 设置上传的请求头部 | object | — | — |
| withCredentials | 支持发送 cookie 凭证信息 | boolean | — | false |
| data | 上传时附带的额外参数 | object | — | — |
| action | 上传的地址 | string | — | — |
| httpRequest | 覆盖默认的上传行为，可以自定义上传的实现 | func | — | — |

### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| onExceed | 文件超出个数限制时的回调 | (files: any) => void |
| onStart | 文件开始上传的回调 | (file: any) => void |
| beforeUpload | 上传文件之前的回调，参数为上传的文件，若返回 false 或者 Promise 则停止上传 | (file: any) => any |
| onRemove | 移除文件时的回调 | (file: any) => void |
| onProgress | 文件上传时的回调 | (e: any, file: any) => void |
| onSuccess | 文件上传成功时的回调 | (response: any, file: any) => void |
| onError | 文件上传失败时的回调 | (err: any, file: any) => void |
