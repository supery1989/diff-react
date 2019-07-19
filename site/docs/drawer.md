## Drawer 抽屉

屏幕边缘滑出的浮层面板。

### 基本用法

::: demo
```js
state = {
  open: false
}
handleClick() {
  this.setState({
    open: true
  })
}
render() {
  return (
    <div>
      <Drawer open={this.state.open} title='我是抽屉' footer='我是底部'><div>1948年10月中旬，锦州、长春先后解放，陷于被围之势的沈阳廖耀湘兵团的十二个师，受蒋介石之命，企图夺取黑山，继而打通锦州向关内撤逃。为使我攻克锦州的部队回师聚歼该敌，东北人民解放军第十纵队等部，奉命于大虎山、黑山一线，预先依地设防，阻击该敌，十纵二十八师担负“一Ｏ一”高地阻击任务。</div>
      <Divider />
      <div>10月23日，战斗打响，24日开始敌人以五个师的兵力，在飞机大炮的配合下，向我军阵地全线猛扑，“一Ｏ一”高地首当其冲，成为敌我双方争夺焦点，经过三天三夜的惨烈战斗，我英雄之师将士同心，军民协力，以“誓与阵地共存亡”的钢铁意志，用血肉之躯守住了阵地，使敌人未能前进一步，10月26日会同从锦州昼夜兼程赶到黑山的我军主力部队,全歼廖耀湘兵团。</div>
      <Divider dashed />
      <div>1963年9月30日，辽宁省人民政府将此公布为省级文物保护单位；1988年10月由文物主管部门发掘清理了部分当年作战战壕、交通沟、掩体等；共清出战壕401米，交通壕191.5米，机枪掩体3个，单兵掩体19个，使阵地恢复了原貌。</div></Drawer>
      <Button onClick={this.handleClick.bind(this)}>打开抽屉</Button>
    </div>
  )
}
```
:::

### 不同位置

::: demo
```js
state = {
  open: false
}
handleClick(placement) {
  this.setState({
    open: true,
    placement
  })
}
render() {
  return (
    <div>
      <Drawer open={this.state.open} title='我是抽屉' placement={this.state.placement}>
        <div>1948年10月中旬，锦州、长春先后解放，陷于被围之势的沈阳廖耀湘兵团的十二个师，受蒋介石之命，企图夺取黑山，继而打通锦州向关内撤逃。为使我攻克锦州的部队回师聚歼该敌，东北人民解放军第十纵队等部，奉命于大虎山、黑山一线，预先依地设防，阻击该敌，十纵二十八师担负“一Ｏ一”高地阻击任务。</div>
        <Divider />
        <div>10月23日，战斗打响，24日开始敌人以五个师的兵力，在飞机大炮的配合下，向我军阵地全线猛扑，“一Ｏ一”高地首当其冲，成为敌我双方争夺焦点，经过三天三夜的惨烈战斗，我英雄之师将士同心，军民协力，以“誓与阵地共存亡”的钢铁意志，用血肉之躯守住了阵地，使敌人未能前进一步，10月26日会同从锦州昼夜兼程赶到黑山的我军主力部队,全歼廖耀湘兵团。</div>
        <Divider dashed />
        <div>1963年9月30日，辽宁省人民政府将此公布为省级文物保护单位；1988年10月由文物主管部门发掘清理了部分当年作战战壕、交通沟、掩体等；共清出战壕401米，交通壕191.5米，机枪掩体3个，单兵掩体19个，使阵地恢复了原貌。</div>
      </Drawer>
      <Button.Group>
        <Button onClick={this.handleClick.bind(this, 'top')}>top</Button>
        <Button onClick={this.handleClick.bind(this, 'right')}>right</Button>
        <Button onClick={this.handleClick.bind(this, 'bottom')}>bottom</Button>
        <Button onClick={this.handleClick.bind(this, 'left')}>left</Button>
      </Button.Group>
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
| open | 是否可见 | boolean | — | false |
| title | 抽屉标题 | title/ReactNode | — | — |
| closeable | 是否显示右上角关闭按钮 | boolean | — | true |
| icon | 设置标题图标 | string | — | — |
| size | 高度/宽度，在 placement 为 top 或 bottom 时使用为设置高度，否则设置宽度 | number | — | 260 |
| placement | 抽屉的方向 | string | left/right/top/bottom | right |
| keyboard | 是否支持键盘 esc 关闭 | boolean | — | true |
| during | 动画持续时间，单位毫秒 | number | — | 1000 |

### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| onClose | 点击遮罩层或右上角叉或取消按钮的回调 | () => void |
