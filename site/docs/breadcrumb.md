## Breadcrumb 面包屑

显示当前页面的路径，快速返回之前的任意页面。

### 基本用法

::: demo
```js
render() {
  return (
    <Breadcrumb isRr>
      <Breadcrumb.Item href='/components/radio'>首页</Breadcrumb.Item>
      <Breadcrumb.Item href='/components/checkbox'>活动管理</Breadcrumb.Item>
      <Breadcrumb.Item>活动列表</Breadcrumb.Item>
      <Breadcrumb.Item>活动详情</Breadcrumb.Item>
    </Breadcrumb>
  )
}
```
white
:::

### 通过配置使用

::: demo
```js
render() {
  const routes = [
    { name: '首页' },
    { name: '活动管理' },
    { name: '活动列表' },
    { name: '活动详情' },
  ]
  return (
    <Breadcrumb routes={routes} />
  )
}
```
white
:::

### 自定义分隔符

::: demo
```js
render() {
  const routes = [
    { name: '首页' },
    { name: '活动管理' },
    { name: '活动列表' },
    { name: '活动详情' },
  ]
  return (
    <div>
      <Breadcrumb separator='&' routes={routes} />
      <Breadcrumb icon='user' routes={routes} style={{ marginTop: '15px' }} />
    </div>
  )
}
```
white
:::

### Breadcrumb Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| className | 容器类名 | string | — | — |
| style | 指定样式 | object | — | — |
| separator | 分隔符 | string/React.ReactNode | - | / |
| icon | 分隔符图标 | string | - | - |
| routes | 通过配置方式设置面包屑 | Route[{name: string, link: string, target: string}] | - | - |
| isRr | 是否使用react router形式 | boolean | - | false |

### Breadcrumb.Item Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| className | 容器类名 | string | — | — |
| style | 指定样式 | object | — | — |
| href | 面包屑链接 | string | - | - |
| target | 新页面打开方式 | _self/_blank | - | _self |
| separator | 分隔符 | string/React.ReactNode | - | / |
| icon | 分隔符图标 | string | - | - |
| isRr | 是否使用react router形式 | boolean | - | false |
