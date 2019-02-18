## Menu 导航菜单

为网站提供导航功能的菜单。

### 基本用法

::: demo
```js
render() {
  return (
    <Menu selectedKey='3'>
      <Menu.Item index='1'>菜单1</Menu.Item>
      <Menu.Item index='2' disabled>菜单2</Menu.Item>
      <Menu.Item index='3'>菜单3</Menu.Item>
      <Menu.Item index='4'>菜单4</Menu.Item>
    </Menu>
  )
}
```
:::

### 带图标

::: demo
```js
render() {
  return (
    <Menu>
      <Menu.Item index='1'><Icon type='user' />菜单1</Menu.Item>
      <Menu.Item index='2' disabled><Icon type='shop' />菜单2</Menu.Item>
      <Menu.Item index='3'><Icon type='apple' />菜单3</Menu.Item>
      <Menu.Item index='4'><Icon type='bank' />菜单4</Menu.Item>
    </Menu>
  )
}
```
:::

### 垂直伸展菜单

::: demo
```js
render() {
  return (
    <Menu expandKeys={['4', '5']}>
      <Menu.Item index='1'>菜单1</Menu.Item>
      <Menu.Item index='2' disabled>菜单2</Menu.Item>
      <Menu.Item index='3'>菜单3</Menu.Item>
      <Menu.SubMenu index='4' title='菜单4'>
        <Menu.Item index='4-1'>菜单4-1</Menu.Item>
        <Menu.Item index='4-2'>菜单4-2</Menu.Item>
      </Menu.SubMenu>
      <Menu.SubMenu index='5' title='菜单5'>
        <Menu.Item index='5-1'>菜单5-1</Menu.Item>
        <Menu.Item index='5-2'>菜单5-2</Menu.Item>
        <Menu.SubMenu index='5-3' title='菜单5-3'>
          <Menu.Item index='5-3-1'>菜单5-3-1</Menu.Item>
          <Menu.Item index='5-3-2'>菜单5-3-2</Menu.Item>
          <Menu.Item index='5-3-3'>菜单5-3-3</Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu index='5-4' title='菜单5-3'>
          <Menu.Item index='5-3-1'>菜单5-3-1</Menu.Item>
          <Menu.SubMenu isGroup title='分组一'>
            <Menu.Item index='5-3-2'>菜单5-3-2</Menu.Item>
            <Menu.Item index='5-3-3'>菜单5-3-3</Menu.Item>
          </Menu.SubMenu>      
        </Menu.SubMenu>
      </Menu.SubMenu>
    </Menu>
  )
}
```
:::

### 可收缩菜单

通过设置collapsed可为菜单设置为收缩版，此时要将菜单文字用span标签包裹

::: demo
```js
state = {
  collapsed: false
}

handleClick() {
  this.setState({
    collapsed: !this.state.collapsed
  })
}
render() {
  const { collapsed } = this.state
  return (
    <div>
      <Button onClick={this.handleClick.bind(this)} text={collapsed ? '展开' : '收缩'} />
      <Menu collapsed={this.state.collapsed}>
        <Menu.Item index='1'><Icon type='user' /><span>菜单1</span></Menu.Item>
        <Menu.Item index='2' disabled><Icon type='shop' /><span>菜单2</span></Menu.Item>
        <Menu.Item index='3'><Icon type='apple' /><span>菜单3</span></Menu.Item>
        <Menu.SubMenu index='4' title={<div><Icon type='bank' /><span>菜单4</span></div>}>
          <Menu.Item index='4-1'>菜单4-1</Menu.Item>
          <Menu.Item index='4-2'>菜单4-2</Menu.Item>
        </Menu.SubMenu>
      </Menu>
    </div>
  )
}
```
:::

### 设置子菜单触发动作

当子菜单弹出方式为 popup 时，可以自定义子菜单触发动作，默认为 hover ，还可设置为 click 。

::: demo
```js
render() {
  return (
    <Menu mode='popup' eventType='click'>
      <Menu.Item index='1'>菜单1</Menu.Item>
      <Menu.Item index='2' disabled>菜单2</Menu.Item>
      <Menu.Item index='3'>菜单3</Menu.Item>
      <Menu.SubMenu index='4' title='菜单4'>
        <Menu.Item index='4-1'>菜单4-1</Menu.Item>
        <Menu.Item index='4-2'>菜单4-2</Menu.Item>
      </Menu.SubMenu>
      <Menu.SubMenu index='5' title='菜单5'>
        <Menu.Item index='5-1'>菜单5-1</Menu.Item>
        <Menu.Item index='5-2'>菜单5-2</Menu.Item>
        <Menu.SubMenu index='5-3' title='菜单5-3'>
          <Menu.Item index='5-3-1'>菜单5-3-1</Menu.Item>
          <Menu.Item index='5-3-2'>菜单5-3-2</Menu.Item>
          <Menu.Item index='5-3-3'>菜单5-3-3</Menu.Item>
        </Menu.SubMenu>
      </Menu.SubMenu>
    </Menu>
  )
}
```
:::

### 水平模式

::: demo
```js
state = {
  current: '1'
}
handleClick(key1, key2) {
  this.setState({
    current: key2.substr(0, 1)
  })
}
render() {
  return (
    <Menu direction='h' selectedKey={this.state.current} onClick={this.handleClick.bind(this)}>
      <Menu.Item index='1'><Icon type='user' />菜单1</Menu.Item>
      <Menu.Item index='2' disabled>菜单2</Menu.Item>
      <Menu.Item index='3'>菜单3</Menu.Item>
      <Menu.SubMenu index='4' title='菜单4'>
        <Menu.Item index='4-1'>菜单4-1</Menu.Item>
        <Menu.Item index='4-2'>菜单4-2</Menu.Item>
      </Menu.SubMenu>
      <Menu.SubMenu index='5' title='菜单5'>
        <Menu.Item index='5-1'>菜单5-1</Menu.Item>
        <Menu.Item index='5-2'>菜单5-2</Menu.Item>
        <Menu.SubMenu index='5-3' title='菜单5-3'>
          <Menu.Item index='5-3-1'>菜单5-3-1</Menu.Item>
          <Menu.SubMenu isGroup title='分组一'>
            <Menu.Item index='5-3-2'>菜单5-3-2</Menu.Item>
            <Menu.Item index='5-3-3'>菜单5-3-3</Menu.Item>
          </Menu.SubMenu>
        </Menu.SubMenu>
      </Menu.SubMenu>
    </Menu>
  )
}
```
:::

### 回调事件
回调参数第一位为内置的key，第二位为传入的属性index

::: demo
```js
handleClick(key1, key2) {
  Toast(`内置key:${key1}    定义key:${key2}`)
}

render() {
  return (
    <Menu onClick={this.handleClick.bind(this)}>
      <Menu.Item index='1'>菜单1</Menu.Item>
      <Menu.Item index='2' disabled>菜单2</Menu.Item>
      <Menu.Item index='3'>菜单3</Menu.Item>
      <Menu.SubMenu index='4' title='菜单4'>
        <Menu.Item index='4-1'>菜单4-1</Menu.Item>
        <Menu.Item index='4-2'>菜单4-2</Menu.Item>
      </Menu.SubMenu>
      <Menu.SubMenu index='5' title='菜单5'>
        <Menu.Item index='5-1'>菜单5-1</Menu.Item>
        <Menu.Item index='5-2'>菜单5-2</Menu.Item>
        <Menu.SubMenu index='5-3' title='菜单5-3'>
          <Menu.Item index='5-3-1'>菜单5-3-1</Menu.Item>
          <Menu.SubMenu isGroup title='分组一'>
            <Menu.Item index='5-3-2'>菜单5-3-2</Menu.Item>
            <Menu.Item index='5-3-3'>菜单5-3-3</Menu.Item>
          </Menu.SubMenu>
        </Menu.SubMenu>
      </Menu.SubMenu>
    </Menu>
  )
}
```
:::

### 黑色主题

::: demo
```js
render() {
  return (
    <div>
      <Menu theme='dark'>
        <Menu.Item index='1'>菜单1</Menu.Item>
        <Menu.Item index='2' disabled>菜单2</Menu.Item>
        <Menu.Item index='3'>菜单3</Menu.Item>
        <Menu.SubMenu index='4' title='菜单4'>
          <Menu.Item index='4-1'>菜单4-1</Menu.Item>
          <Menu.Item index='4-2'>菜单4-2</Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu index='5' title='菜单5'>
          <Menu.Item index='5-1'>菜单5-1</Menu.Item>
          <Menu.Item index='5-2'>菜单5-2</Menu.Item>
          <Menu.SubMenu index='5-3' title='菜单5-3'>
            <Menu.Item index='5-3-1'>菜单5-3-1</Menu.Item>
            <Menu.Item index='5-3-2'>菜单5-3-2</Menu.Item>
            <Menu.Item index='5-3-3'>菜单5-3-3</Menu.Item>
          </Menu.SubMenu>
          <Menu.SubMenu index='5-4' title='菜单5-3'>
            <Menu.Item index='5-3-1'>菜单5-3-1</Menu.Item>
            <Menu.SubMenu isGroup title='分组一'>
              <Menu.Item index='5-3-2'>菜单5-3-2</Menu.Item>
              <Menu.Item index='5-3-3'>菜单5-3-3</Menu.Item>
            </Menu.SubMenu>      
          </Menu.SubMenu>
        </Menu.SubMenu>
      </Menu>
      <Menu theme='dark' direction='h'>
        <Menu.Item index='1'>菜单1</Menu.Item>
        <Menu.Item index='2' disabled>菜单2</Menu.Item>
        <Menu.Item index='3'>菜单3</Menu.Item>
        <Menu.SubMenu index='4' title='菜单4'>
          <Menu.Item index='4-1'>菜单4-1</Menu.Item>
          <Menu.Item index='4-2'>菜单4-2</Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu index='5' title='菜单5'>
          <Menu.Item index='5-1'>菜单5-1</Menu.Item>
          <Menu.Item index='5-2'>菜单5-2</Menu.Item>
          <Menu.SubMenu index='5-3' title='菜单5-3'>
            <Menu.Item index='5-3-1'>菜单5-3-1</Menu.Item>
            <Menu.Item index='5-3-2'>菜单5-3-2</Menu.Item>
            <Menu.Item index='5-3-3'>菜单5-3-3</Menu.Item>
          </Menu.SubMenu>
          <Menu.SubMenu index='5-4' title='菜单5-3'>
            <Menu.Item index='5-3-1'>菜单5-3-1</Menu.Item>
            <Menu.SubMenu isGroup title='分组一'>
              <Menu.Item index='5-3-2'>菜单5-3-2</Menu.Item>
              <Menu.Item index='5-3-3'>菜单5-3-3</Menu.Item>
            </Menu.SubMenu>      
          </Menu.SubMenu>
        </Menu.SubMenu>
      </Menu>
    </div>
  )
}
```
:::

### Menu Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| className | 容器类名 | string | — | — |
| style | 指定样式 | object | — | — |
| direction | 菜单方向，默认垂直v | string | v/h | v |
| mode | 菜单出现方式，行内还是弹出，水平方向只有popup，垂直方向默认行内 | string | inline/popup | - |
| eventType | 菜单触发方式，弹窗方式默认hover，行内方式默认click | string | hover/click | - |
| selectedKey | 默认选中的一级菜单，需同时配合定义index使用 | string | - | - |
| inlineIndent | inline模式下的缩进长度(px) | number | - | 15 |
| expandKeys | 行内模式下默认展开的菜单 | string[] | - | - |
| expandSingle | 行内模式下是否每次只能展开一个菜单 | boolean | - | false |
| theme | 菜单主题颜色，默认高亮 | string | dark/light | light |
| collapsed | 垂直模式下，菜单是否可以收缩 | boolean | — | false |

### SubMenu Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| className | 容器类名 | string | — | — |
| style | 指定样式 | object | — | — |
| title | 子菜单标题 | string | - | - |
| index | 子菜单标识，可用来匹配是否默认展开或选中 | string | - | - |
| disabled | 子菜单是否不可用状态 | boolean | - | false |
| isGroup | 是否定义为分组形式 | boolean | - | false |

### MenuItem Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| className | 容器类名 | string | — | — |
| style | 指定样式 | object | — | — |
| index | 菜单标识，可用来匹配是否默认展开或选中 | string | - | - |
| disabled | 菜单是否不可用状态 | boolean | - | false |

### Menu Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| onClick | 菜单的点击回调事件 | (insideKey: string, key?: string) => void |
