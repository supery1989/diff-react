## Sortable 拖拽排序

用于一个容器内元素的拖拽排序。

### 基本用法

::: demo
```js
state = {
  list: ['item1', 'item2', 'item3', 'item4', 'item5']
}

render() {
  const { list } = this.state;
  return (
    <Sortable
      items={list}
    >
      {
        list.map(name => <Card key={name}>{name}</Card>)
      }
    </Sortable>
  )
}
```
:::

### 容器共享

group 必须具有相同的group值

::: demo group取值为object时，name: string 分组的名称；pull: true | false | 'clone' | function 从列表中拖出的能力，如果设置为 'clone' 则不会移动元素，而是复制；put: true | false | ['foo', 'bar'] | function 是否可以从其他列表添加元素，还是可以设置为可接受元素的列表的一组组名；revertClone: boolean 当移动到另一个列表后，将克隆的元素还原到初始位置。
```js
state = {
  list: ['item1', 'item2', 'item3', 'item4', 'item5']
}

render() {
  const { list } = this.state;
  return (
    <Row gutter={20}>
      <Col span={12}>
        <Sortable
          items={list}
          group='shared'
        >
          {
            list.map(name => <Card key={name}>{name}</Card>)
          }
        </Sortable>
      </Col>
      <Col span={12}>
        <Sortable
          items={list}
          group='shared'
        >
          {
            list.map(name => <Card key={name}>{name}</Card>)
          }
        </Sortable>
      </Col>
    </Row>
  )
}
```
:::

### 禁用拖拽

::: demo
```js
state = {
  list: ['item1', 'item2', 'item3', 'item4', 'item5']
}

render() {
  const { list } = this.state;
  return (
    <Sortable
      items={list}
      sort={false}
    >
      {
        list.map(name => <Card key={name}>{name}</Card>)
      }
    </Sortable>
  )
}
```
:::

### 禁用拖拽

::: demo
```js
state = {
  list: ['item1', 'item2', 'item3', 'item4', 'item5', 'item6', 'item7', 'item8', 'item9', 'item10', 'item11', 'item12', 'item13', 'item14', 'item15']
}

handleAdd() {
  const { list } = this.state
  const item = `item${list.length + 1}`
  list.push(item)
  this.setState({
    list: list
  })
}

handleRemove(removeIndex) {
  const { list } = this.state
  const newList = list.filter((item, index) => index !== removeIndex)
  this.setState({
    list: newList
  })
}

render() {
  const { list } = this.state;
  return (
    <Sortable
      items={list}
      className='demo-diff-sortable'
      filterClass='demo-diff-sortable-add'
    >
      {
        list.map((value, index) => {
          return (
            <div className='demo-diff-sortable-item' key={index}>
              {value}
              <Icon
                className='demo-diff-sortable-close'
                type='close'
                onClick={this.handleRemove.bind(this, index)}
              />
            </div>
          )
        })
      }
      <div
        className='demo-diff-sortable-add'
        onClick={this.handleAdd.bind(this)}>
        <Icon type='plus' />
      </div>
    </Sortable>
  )
}
```
white
:::

### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| className | 容器类名 | string | — | — |
| style | 指定样式 | object | — | — |
| tag | 容器元素的HTML标签名 | string | @ | div |
| filterClass | 禁用排序元素的类名 | string | @ | @ |
| items | 被排序元素的数组 | Array<any> | @ | @ |
| animation | 拖拽时的动画持续时间(ms) number | @ | 150 |
| group | 用于多容器拖拽的分组 | string/object | @ | @ |
| sort | 是否支持拖拽 | boolean | @ | true |
| delay | 拖拽时延迟的时间(ms) | number | @ | 0 |
| ghostClass | 拖拽目标处填充元素的类名 | string | @ | `${prefix}-ghost` |
| chosenClass | 被选中的元素的类名 | string | @ | `${prefix}-chosen` |
| dragClass | 正在被拖拽的元素的类名 | string | @ | `${prefix}-drag` |
| forceFallback | 是否忽略HTML5的拖拽行为并强制回退 | boolean | @ | false |
| fallbackClass | 使用forceFallback时克隆的DOM元素的类名 | string | @ | `${prefix}-fallback` |
| fallbackOnBody | 是否将克隆的DOM元素附加到Body中 | boolean | @ | false |
| fallbackTolerance | 拖动行为生效前鼠标移动的距离(px) | number | @ | 0 |
| scroll | 拖拽过程中是否允许屏幕滚动 | boolean | @ | true |
| scrollSensitivity | 触发滚动时鼠标距离边缘的像素值(px) | number | @ | 30 |
| scrollSpeed | 滚动速度(px/s) | number | @ | 10 |

### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| onChange | 排序完成时的回调函数 | (newIndex: number, oldIndex: number) => void |
| onMove | 当在一个容器内或者不同容器之间拖拽元素时的回调函数 | (event: Event) => boolean |
| onEnd | 元素结束拖拽时的回调函数 | (event: Event) => any |
| onChoose | 元素被选中时的回调函数 | (event: Event) => any |
| onStart | 元素开始拖拽时的回调函数 | (event: Event) => any |
| onAdd | 元素从另一个容器被拖拽到当前容器的回调函数 | (event: Event) => any |
| onUpdate | 元素被重新排序时的回调函数 | (event: Event) => any |
| onSort | 当有元素被排序时的回调函数(例如新增，更新，删除) | (event: Event) => any |
| onRemove | 当元素从当前容器拖拽至其他容器时的回调函数 | (event: Event) => any |
| onFilter | 当尝试拖拽一个被禁用拖拽的元素时的回调函数 | (event: Event) => any |
| onClone | 当复制元素时的回调函数 | (event: Event) => any |
