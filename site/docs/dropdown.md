## Dropdown 下拉菜单

将动作或菜单折叠到下拉菜单中。

### 基本用法

::: demo
```js
render() {
  const menu = [
    { node: '菜单1' },
    { node: <span>菜单2</span>, props: { disabled: true} },
    { node: <span><Icon type='user' />菜单3</span> },
    { node: <span>菜单4</span> },
  ]
  return (
    <Dropdown menu={menu}>下拉菜单</Dropdown>
  )
}
```
:::

### 弹出位置

支持六种弹出位置。

::: demo
```js
render() {
  const menu = [
    { node: '菜单1' },
    { node: '菜单2' },
    { node: '菜单3' },
    { node: '菜单4' },
  ]
  return (
    <div className='demo-dropdown'>
      <Dropdown button={{ text: 'bottomleft' }} width={200} menu={menu} placement='bottomleft' />
      <Dropdown button={{ text: 'bottomcenter' }} width={200} menu={menu} placement='bottomcenter' />
      <Dropdown button={{ text: 'bottomright' }} width={200} menu={menu} placement='bottomright' />
      <Dropdown button={{ text: 'topleft' }} width={200} menu={menu} placement='topleft' />
      <Dropdown button={{ text: 'topcenter' }} width={200} menu={menu} placement='topcenter' />
      <Dropdown button={{ text: 'topright' }} width={200} menu={menu} placement='topright' />
    </div>
  )
}
```
:::

### 多级菜单

::: demo
```js
render() {
  const menu = [
    { node: '菜单1' },
    { node: <span>菜单2</span>, props: { disabled: true} },
    { node: <span>菜单3</span> },
    {
      node: <span>菜单4</span>,
      submenu: [
        { node: <span>菜单4-1</span> },
        { node: <span>菜单4-2</span> },
      ]
    },
    {
      node: <span>菜单5</span>,
      submenu: [
        { node: <span>菜单5-1</span> },
        { node: <span>菜单5-2</span> },
        {
          node: <span>菜单5-3</span>,
          submenu: [
            { node: <span>菜单5-3-1</span> },
            { node: <span>菜单5-3-2</span> },
          ]
        }
      ]
    },
  ]
  return (
    <Dropdown menu={menu}>下拉菜单</Dropdown>
  )
}
```
:::

### 回调事件

::: demo
```js
handleClick(insideKey, customKey) {
  Toast(`内部生成的key:${insideKey}    自定义的key:${customKey}`)
}
render() {
  const menu = [
    { node: '菜单1', props: { index: '1' }},
    { node: <span>菜单2</span>, props: { disabled: true, index: '2'} },
    { node: <span><Icon type='user' />菜单3</span>, props: { index: '3' } },
    { node: <span>菜单4</span>, props: { index: '4' } },
  ]
  return (
    <Dropdown menu={menu} onClick={this.handleClick.bind(this)}>下拉菜单</Dropdown>
  )
}
```
:::

### 更改触发方式

通过设置trigger属性指定下拉菜单触发方式，默认是hover，可以修改为click。

::: demo
```js
render() {
  const menu = [
    { node: '菜单1' },
    { node: <span>菜单2</span>, props: { disabled: true} },
    { node: <span><Icon type='user' />菜单3</span> },
    { node: <span>菜单4</span> },
  ]
  return (
    <Dropdown menu={menu} trigger='click'>下拉菜单</Dropdown>
  )
}
```
:::

### 菜单隐藏方式

默认情况下拉菜单点击后会自动关闭，通过设置hideOnClick可以不关闭，对多级菜单无效。

::: demo
```js
render() {
  const menu = [
    { node: '菜单1' },
    { node: <span>菜单2</span>, props: { disabled: true} },
    { node: <span><Icon type='user' />菜单3</span> },
    { node: <span>菜单4</span> },
  ]
  return (
    <Dropdown menu={menu} hideOnClick={false}>下拉菜单</Dropdown>
  )
}
```
:::

### 禁用状态

::: demo
```js
state = {
  disabled: true
}

handleClick() {
    this.setState({
      disabled: !this.state.disabled
    })
  }
  
render() {
  const menu = [
    { node: '菜单1' },
    { node: <span>菜单2</span>, props: { disabled: true} },
    { node: <span><Icon type='user' />菜单3</span> },
    { node: <span>菜单4</span> },
  ]

  return (
    <div>
      <Button text={this.state.disabled ? '禁用' : '可用'} onClick={this.handleClick.bind(this)} />
      <Dropdown menu={menu} disabled={this.state.disabled}>下拉菜单</Dropdown>
    </div>
  )
}
```
:::

### 按钮形式

通过设置 button 属性可以设置按钮形式，button 的值为Button的属性；splitButton 可以设置为分离的按钮形式，此时只能通过图标来触发下拉菜单。

::: demo
```js
render() {
  const menu = [
    { node: '菜单1' },
    { node: <span>菜单2</span>, props: { disabled: true} },
    { node: <span><Icon type='user' />菜单3</span> },
    { node: <span>菜单4</span> },
  ]
  const btn = {
    text: '下拉菜单',
    type: 'primary'
  }
  return (
    <div>
      <Dropdown menu={menu} button={btn} />
      <Dropdown splitButton menu={menu} button={btn} />
    </div>
  )
}
```
:::

### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| className | 容器类名 | string | — | — |
| style | 指定样式 | object | — | — |

### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
