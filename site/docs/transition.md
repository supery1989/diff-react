## Transition 动画

::: demo

```js
state = {
  showItem: '',
  show: false,
  type: '',
}
handleClick = (type) => {
  this.setState({
    type,
    showItem: '',
    show: !this.state.show,
  });
}
handleItemClick = (item) => {
  this.setState({
    type: 'item',
    show: false,
    showItem: this.state.showItem === item ? '' : item
  })
}
end = () => {
  console.dir('end')
}
render() {
  const items1 = ['fade', 'fadeDown', 'fadeLeft', 'fadeRight', 'fadeUp', 'fadeDownBig', 'fadeLeftBig', 'fadeRightBig', 'fadeUpBig', 'zoom', 'zoomDown', 'zoomLeft', 'zoomRight', 'zoomUp', 'slideDown', 'slideLeft', 'slideRight', 'slideUp', 'lightSpeed', 'flipX', 'flipY', 'bounce', 'bounceDown', 'bounceLeft', 'bounceRight', 'bounceUp', 'roll', 'rotate', 'rotateDownLeft', 'rotateDownRight', 'rotateUpLeft', 'rotateUpRight'];
  const items2 = ['bounce', 'flash', 'pulse', 'rubberBand', 'shake', 'headShake', 'swing', 'tada', 'wobble', 'jello', 'flip', 'hinge', 'jackInTheBox'];
  const { type, show, showItem } = this.state;
  return (
    <div className="demo-transition">
      <div>
        <span onClick={this.handleClick.bind(this, 'transfer')}>进出场动画 {this.state.show ? '出场' : '入场'}</span>
      </div>
      {items1.map((item, key) => {
        return (
          <div key={key} className="demo" onClick={this.handleItemClick.bind(this, item)}>
            <span className="name">{item}</span>
            <Transition className="transitionDemo" onEnd={this.end} type={item} show={(type === 'transfer' && show === true) || (type === 'item' && showItem === item)}><div /></Transition>
          </div>
        )
      })}
      <div>
        <span onClick={this.handleClick.bind(this, 'nottransfer')}>非转场动画</span>
      </div>
      {items2.map((item, key) => {
        return (
          <div key={key} className="demo" onClick={this.handleItemClick.bind(this, item)}>
            <span className="name">{item}</span>
            <Transition transfer={false} className="transitionDemo" onEnd={this.end} type={item} show={(type === 'nottransfer' && show === true) || (type === 'item' && showItem === item)}><div /></Transition>
          </div>
        )
      })}
    </div>
  );
}
```

:::

### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| className | 动画组件类名，用于定制动画组件样式 | string | 无 | 无 |
| type | 动画形式 | string | 无 | 无 |
| infinite| 是否循环动画 | boolean | true/false | false |
| unmount | 动画结束后是否卸载组件 | boolean | true/false | true |
| show | 显示动画，值发生变化动画就会启用 | boolean | true/false | false |
| during | 动画持续时间，单位ms | number | -- | 1000 |
| transfer | 是否转场动画 | boolean | true/false | true |
| init | 是否在组件第一次渲染时加载动画(因在createElement时不能加载动画进行适配) | boolean | true/false | false |

### Events
| 事件名称 | 说明 | 回调参数 |
| --- | --- | -- |
| onEnd | 动画结束后的回调 | -- |