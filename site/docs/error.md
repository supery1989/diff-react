## Error 错误

用于显示错误信息，捕获子组件的错误。

### 基本用法

::: demo
```js
state = {
  error: null
}

handleClick(error) {
  this.setState({
    error
  })
}

render() {
  return (
    <div>
      <Error tip={this.state.error} />
      <Button onClick={this.handleClick.bind(this, '出错了')}>提交</Button>
    </div>
  )
}
```
:::

### 捕获子组件错误

```js
<Error onError={(err) => console.log(err.toString())}><子组件 /></Error>
```

### 高阶组件 catchError

```js
const ErrorComponent = Error.CatchError()(子组件)
<ErrorComponent />
```

### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| className | 容器类名 | string | — | — |
| style | 指定样式 | object | — | — |
| tip | 出错信息内容，此时不是捕获子组件的错误 | string/ReactNode | @ | @ |
| FallbackComponent | 出错时用来替换子组件的组件 | Component | @ | @ |

### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| onError | 子组件出错时的回调函数 | (error: Error, componentStack: string) => void |
