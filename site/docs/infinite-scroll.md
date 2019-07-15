## InfiniteScroll 无限滚动

使一个区域内的内容滚动加载。

### 基本用法

::: demo
```js
state = {
  list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  hasMore: true
}
loadMore(closeLoading) {
  const { list } = this.state
  const list2 = list.slice(list.length - 10)
  const newList = list2.map(item => item + 10)
  setTimeout(() => {
    if (list.length > 20) {
      this.setState({
        hasMore: false
      })
    } else {
      this.setState({
        list: [...list, ...newList],
        hasMore: true
      });
      closeLoading && closeLoading();
    }
  }, 500)
}
render() {
  const { list, hasMore } = this.state
  return (
    <InfiniteScroll
      style={{ height: '300px', width: '258px' }}
      useWindow={false}
      loadMore={this.loadMore.bind(this)}
      hasMore={hasMore}
    >
      {
        list.map(item => <Card key={item}>{item}</Card>)
      }
    </InfiniteScroll>
  )
}
```
:::

### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| className | 容器类名 | string | — | — |
| style | 指定样式 | object | — | — |
| useWindow | 是否监听window上的滚动事件，如果传入false，则监听该DOM元素上的滚动事件 | boolean | @ | false |
| hasMore | 是否还有更多数据加载 | boolean | @ | true |
| initialLoad | 初始化时是否调用loadMore回调 | boolean | @ | false |
| offset | 触发滚动加载的阈值 | number | @ | 20 |
| loader | 加载时显示的内容 | string/React.ReactNode | @ | Loading组件 |
| end | 加载结束时显示的内容 | string/React.ReactNode | @ | 没有更多数据了 |

### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| loadMore | 加载更多数据，异步加载时，期望传入的loadMore函数的返回值是一个promise对象，用于组件控制loading的显示，否则需要使用loadMore的回调函数手动停止loading。 | (() => Promise<unknown>)/((closing?: () => void) => void) |

