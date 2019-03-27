## Table 表格

用于展示多条结构类似的数据，可对数据进行排序、筛选、对比或其他自定义操作。

### 基本用法

::: demo
```js
render() {
  const columns = [
    {
      label: '姓名',
      prop: 'name',
      width: 150,
      className: 'text'
    },
    {
      label: '年龄',
      prop: 'age',
      width: 160
    },
    {
      label: '地址',
      prop: 'address',
    },
  ];
  const data = [
    {
      name: '张三',
      age: '20',
      address: '广州市天河区珠江新城001号',
    },{
      name: '李四',
      age: '22',
      address: '广州市天河区珠江新城002号',
    },{
      name: '赵五',
      age: '24',
      address: '广州市天河区珠江新城003号',
    },
  ]
  return (
    <Table columns={columns} data={data} />
  )
}
```
:::

### 无斑马线表格

::: demo
```js
render() {
  const columns = [
    {
      label: '姓名',
      prop: 'name',
      width: 150,
    },
    {
      label: '年龄',
      prop: 'age',
      width: 160
    },
    {
      label: '地址',
      prop: 'address',
    },
  ];
  const data = [
    {
      name: '张三',
      age: '20',
      address: '广州市天河区珠江新城001号',
    },{
      name: '李四',
      age: '22',
      address: '广州市天河区珠江新城002号',
    },{
      name: '赵五',
      age: '24',
      address: '广州市天河区珠江新城003号',
    },
  ]
  return (
    <Table columns={columns} data={data} stripe={false} />
  )
}
```
:::

### 无边框表格

::: demo
```js
render() {
  const columns = [
    {
      label: '姓名',
      prop: 'name',
      width: 150,
    },
    {
      label: '年龄',
      prop: 'age',
      width: 160
    },
    {
      label: '地址',
      prop: 'address',
    },
  ];
  const data = [
    {
      name: '张三',
      age: '20',
      address: '广州市天河区珠江新城001号',
    },{
      name: '李四',
      age: '22',
      address: '广州市天河区珠江新城002号',
    },{
      name: '赵五',
      age: '24',
      address: '广州市天河区珠江新城003号',
    },
  ]
  return (
    <Table columns={columns} data={data} border={false} />
  )
}
```
:::

### 自定义行样式

通过 rowClassName 和 rowStyle 可将表格内容 highlight 显示，方便区分「成功、信息、警告、危险」等内容。

::: demo rowClassName 内置了 tr-success, tr-info, tr-warning, tr-error 四个样式
```js
rowClassName(row, index) {
  if (index === 1) {
    return 'tr-error'
  }
  return ''
}

rowStyle(row, index) {
  if (index === 2) {
    return { fontSize: '18px' }
  }
  return {}
}

render() {
  const columns = [
    {
      label: '姓名',
      prop: 'name',
      width: 150,
    },
    {
      label: '年龄',
      prop: 'age',
      width: 160
    },
    {
      label: '地址',
      prop: 'address',
    },
  ];
  const data = [
    {
      name: '张三',
      age: '20',
      address: '广州市天河区珠江新城001号',
    },{
      name: '李四',
      age: '22',
      address: '广州市天河区珠江新城002号',
    },{
      name: '赵五',
      age: '24',
      address: '广州市天河区珠江新城003号',
    },
  ]
  return (
    <Table columns={columns} data={data} rowClassName={this.rowClassName.bind(this)} rowStyle={this.rowStyle.bind(this)} />
  )
}
```
:::

### 固定表头

::: demo
```js
render() {
  const columns = [
    {
      label: '姓名',
      prop: 'name',
      width: 150,
    },
    {
      label: '年龄',
      prop: 'age',
      width: 160
    },
    {
      label: '地址',
      prop: 'address',
    },
  ];
  const data = [
    {
      name: '张三',
      age: '20',
      address: '广州市天河区珠江新城001号',
    },{
      name: '李四',
      age: '22',
      address: '广州市天河区珠江新城002号',
    },{
      name: '赵五',
      age: '24',
      address: '广州市天河区珠江新城003号',
    },{
      name: '冯六',
      age: '26',
      address: '广州市天河区珠江新城004号',
    },{
      name: '周七',
      age: '16',
      address: '广州市天河区珠江新城005号',
    },
  ]
  return (
    <Table columns={columns} data={data} height={160} />
  )
}
```
:::

### 固定列

::: demo
```js
render() {
  const columns = [
    {
      label: '姓名',
      prop: 'name',
      width: 150,
      fixed: true
    },
    {
      label: '年龄',
      prop: 'age',
      width: 160
    },
    {
      label: '地址',
      prop: 'address',
      width: 500
    },
    {
      label: '学历',
      prop: 'edu',
      width: 160
    },
    {
      label: '性别',
      prop: 'sex',
      width: 160,
      fixed: 'right'
    },
    {
      label: '爱好',
      prop: 'hobby',
      width: 160,
      fixed: 'right'
    },
  ];
  const data = [
    {
      name: '张三',
      age: '20',
      address: '广州市天河区珠江新城001号',
      edu: '本科',
      sex: '男',
      hobby: '足球'
    },{
      name: '李四',
      age: '22',
      address: '广州市天河区珠江新城002号',
      edu: '本科',
      sex: '女',
      hobby: '篮球'
    },{
      name: '赵五',
      age: '24',
      address: '广州市天河区珠江新城003号',
      edu: '本科',
      sex: '男',
      hobby: '排球'
    },
  ]
  return (
    <Table columns={columns} data={data} />
  )
}
```
:::

### 固定表头和列

::: demo
```js
render() {
  const columns = [
    {
      label: '姓名',
      prop: 'name',
      width: 150,
      fixed: true
    },
    {
      label: '年龄',
      prop: 'age',
      width: 160
    },
    {
      label: '地址',
      prop: 'address',
      width: 500
    },
    {
      label: '学历',
      prop: 'edu',
      width: 160
    },
    {
      label: '性别',
      prop: 'sex',
      width: 160,
      fixed: 'right'
    },
    {
      label: '爱好',
      prop: 'hobby',
      width: 160,
      fixed: 'right'
    },
  ];
  const data = [
    {
      name: '张三',
      age: '20',
      address: '广州市天河区珠江新城001号',
      edu: '本科',
      sex: '男',
      hobby: '足球'
    },{
      name: '李四',
      age: '22',
      address: '广州市天河区珠江新城002号',
      edu: '本科',
      sex: '女',
      hobby: '篮球'
    },{
      name: '赵五',
      age: '24',
      address: '广州市天河区珠江新城003号',
      edu: '本科',
      sex: '男',
      hobby: '排球'
    },{
      name: '冯六',
      age: '26',
      address: '广州市天河区珠江新城004号',
      edu: '本科',
      sex: '男',
      hobby: '排球'
    },{
      name: '周七',
      age: '16',
      address: '广州市天河区珠江新城005号',
      edu: '本科',
      sex: '女',
      hobby: '篮球'
    },
  ]
  return (
    <Table columns={columns} data={data} height={160} />
  )
}
```
:::

### 自定义模板

::: demo
```js
render() {
  const columns = [
    {
      label: '姓名',
      prop: 'name',
      width: 150,
      render: function(data){
        return (
          <span>
            <Icon type='user' />
            <span style={{marginLeft: '10px'}}>{data.name}</span>
          </span>
        )
      },
      renderHeader: function(data) {
        return (
          <span>
            <Icon type='user' />
            <span style={{marginLeft: '10px'}}>{data.label}</span>
          </span>
        )
      }
    },
    {
      label: '年龄',
      prop: 'age',
      width: 160,
    },
    {
      label: '地址',
      prop: 'address',
    },
  ];
  const data = [
    {
      name: '张三',
      age: '20',
      address: '广州市天河区珠江新城001号',
    },{
      name: '李四',
      age: '22',
      address: '广州市天河区珠江新城002号',
    },{
      name: '赵五',
      age: '24',
      address: '广州市天河区珠江新城003号',
    },
  ]
  return (
    <Table columns={columns} data={data} />
  )
}
```
:::

### 展开行

::: demo
```js
render() {
  const columns = [
    {
      type: 'expand',
      expandPannel: function(data){
        return (
          <div style={{ padding: '20px' }}>
            <div>姓名：{data.name}</div>
            <div>年龄：{data.age}</div>
            <div>地址：{data.address}</div>
          </div>
        )
      }
    },
    {
      label: '姓名',
      prop: 'name',
      width: 150,
    },
    {
      label: '年龄',
      prop: 'age',
      width: 160
    },
    {
      label: '地址',
      prop: 'address',
    },
  ];
  const data = [
    {
      name: '张三',
      age: '20',
      address: '广州市天河区珠江新城001号',
    },{
      name: '李四',
      age: '22',
      address: '广州市天河区珠江新城002号',
    },{
      name: '赵五',
      age: '24',
      address: '广州市天河区珠江新城003号',
    },
  ]
  return (
    <Table columns={columns} data={data} />
  )
}
```
:::

### 单选

::: demo
```js
render() {
  const columns = [
    {
      type: 'index',
    },
    {
      label: '姓名',
      prop: 'name',
      width: 150,
    },
    {
      label: '年龄',
      prop: 'age',
      width: 160
    },
    {
      label: '地址',
      prop: 'address',
    },
  ];
  const data = [
    {
      name: '张三',
      age: '20',
      address: '广州市天河区珠江新城001号',
    },{
      name: '李四',
      age: '22',
      address: '广州市天河区珠江新城002号',
    },{
      name: '赵五',
      age: '24',
      address: '广州市天河区珠江新城003号',
    },
  ]
  return (
    <Table columns={columns} data={data} highlightCurrentRow={true} onCurrentChange={item=>{console.log(item)}} />
  )
}
```
:::

### 多选

::: demo
```js
render() {
  const columns = [
    {
      type: 'select',
      selectable: function(data, index) {
        if (index === 1) {
          return false
        }
        return true
      }
    },
    {
      label: '姓名',
      prop: 'name',
      width: 150,
    },
    {
      label: '年龄',
      prop: 'age',
      width: 160
    },
    {
      label: '地址',
      prop: 'address',
    },
  ];
  const data = [
    {
      name: '张三',
      age: '20',
      address: '广州市天河区珠江新城001号',
    },{
      name: '李四',
      age: '22',
      address: '广州市天河区珠江新城002号',
    },{
      name: '赵五',
      age: '24',
      address: '广州市天河区珠江新城003号',
    },
  ]
  return (
    <Table columns={columns} data={data} onSelectChange={(selection) => { console.log(selection) }} onSelectAll={(selection) => { console.log(selection) }} />
  )
}
```
:::

### 排序

::: demo
```js
state = {
  columns: [
    {
      label: '姓名',
      prop: 'name',
      width: 150,
    },
    {
      label: '年龄',
      prop: 'age',
      width: 160,
      sort: true
    },
    {
      label: '身高',
      prop: 'height',
      width: 160,
      sort: true
    },
    {
      label: '地址',
      prop: 'address',
    },
  ],
  data: [
    {
      name: '张三',
      age: '20',
      height: '180',
      address: '广州市天河区珠江新城001号',
    },{
      name: '李四',
      age: '22',
      height: '160',
      address: '广州市天河区珠江新城002号',
    },{
      name: '赵五',
      age: '24',
      height: '170',
      address: '广州市天河区珠江新城003号',
    },
  ]
}
handleSort(column) {
  const { data } = this.state
  const temp = data.sort((item1, item2) => {
    if (column.order === 'desc') {
      return item2[column.prop] - item1[column.prop]
    } else {
      return item1[column.prop] - item2[column.prop]
    }
  })
  this.setState({
    data: temp
  })
}
render() {
  return (
    <Table columns={this.state.columns} data={this.state.data} onSort={this.handleSort.bind(this)} />
  )
}
```
:::

### 加载状态

加载远程数据，获取数据时的状态

::: demo
```js
state = {
  loading: false
}

handleClick() {
  this.setState({
    loading: !this.state.loading
  })
}

render() {
  const columns = [
    {
      label: '姓名',
      prop: 'name',
      width: 150,
    },
    {
      label: '年龄',
      prop: 'age',
      width: 160
    },
    {
      label: '地址',
      prop: 'address',
    },
  ];
  const data = [
    {
      name: '张三',
      age: '20',
      address: '广州市天河区珠江新城001号',
    },{
      name: '李四',
      age: '22',
      address: '广州市天河区珠江新城002号',
    },{
      name: '赵五',
      age: '24',
      address: '广州市天河区珠江新城003号',
    },
  ]
  return (
    <div>
      <Button onClick={this.handleClick.bind(this)}>加载数据</Button>
      <Table columns={columns} data={data} loading={this.state.loading} />
    </div>
  )
}
```
:::

### Table Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| className | 容器类名 | string | — | — |
| style | 指定样式 | object | — | — |
| showHeader | 是否显示表头 | boolean | @ | true |
| data | 显示的数据 | array | @ | @ |
| columns | 表格列的配置描述，具体项见下表 | array | @ | @ |
| height | table 的高度，默认高度为空，即自动高度，单位 px | number | @ | @ |
| maxHeight | Table 的最大高度 | number | @ | @ |
| stripe | 是否为斑马纹 table | boolean | @ | true |
| border | 是否带有纵向边框 | boolean | @ | true |
| highlightCurrentRow | 是否要高亮当前行 | boolean | @ | false |
| rowClassName | 行的 className 的回调，或者类名 | ((row: object, index: number) => string)/string | @ | @ |
| rowStyle | 行的 style 的回调方法，或者样式 | ((row: object, index: number) => object)/object | @ | @ |
| emptyText | 空数据时显示的文本内容 | string/React.ReactNode | @ | 暂无数据 |
| defaultSort | 默认的排序列的prop和顺序。它的prop属性指定默认的排序的列，order指定默认排序的顺序 | {prop: string, order?: desc/asc} | @ | @ |
| loading | 是否加载状态 | boolean | @ | false |

### Table Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| onCurrentChange | 一般用于单选，当表格的当前行发生变化的时候会触发该事件，如果要高亮当前行，请打开表格的 highlightCurrentRow 属性 | (newRow: object, oldRow: object/null) => void |
| onSelect | 当用户手动勾选数据行的 Checkbox 时触发的事件 | (row: object, checked: boolean) => void |
| onSelectAll | 当用户手动勾选全选 Checkbox 时触发的事件 | (rows: array) => void |
| onSelectChange | 当选择项发生变化时会触发该事件 | (rows: array) => void |
| onSort | 当表格的排序条件发生变化的时候会触发该事件 | (column: object) => void |
| onExpand | 当用户对某一行展开或者关闭的上会触发该事件 | (row: object, expanded: boolean) => void |

### Table-column Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| type | 对应列的类型。如果设置了 selection 则显示多选框；如果设置了 index 则显示该行的索引（从 1 开始计算）；如果设置了 expand 则显示为一个可展开的按钮 | string | selection/index/expand | @ |
| label | 显示的标题 | string | @ | @ |
| prop | 对应列内容的字段名 | string | @ | @ |
| width | 对应列的宽度 | number | @ | @ |
| fixed | 列是否固定在左侧或者右侧，true 表示固定在左侧 | string/boolean | left/right/true | @ |
| sort | 对应列是否可以排序，需要配合onSort事件使用 | boolean | @ | false |
| notResize | 对应列是否可以通过拖动改变宽度 | boolean | @ | false |
| align | 对齐方式 | string | left/right/center | left |
| headerAlign | 表头对齐方式，若不设置该项，则使用表格的对齐方式 | string | left/right/center | left |
| className | 列的 className | string | @ | @ |
| disabled | 所在行是否可以被选 | boolean | @ | false |

### Table-column Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| render | 自定义渲染列body使用的 Function | (row, column, index) => void |
| renderHeader | 列标题 Label 区域渲染使用的 Function | (column) => void |
| selectable | 所在行是否可以被选 | (row, index) => boolean |
