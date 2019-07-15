import * as React from 'react'
import * as ReactDOM from 'react-dom'
import omit from 'omit.js'
import { throttle } from 'throttle-debounce'
import View, { ROOT_PREFIX } from 'libs/view'
import WindowEventHandler from 'libs/windowEventHandler'
import GetViewSize from 'libs/getViewSize'

export interface AffixProps {
  className?: string
  style?: object
  wrapperClassName?: string
  zIndex: number
  offsetBottom?: number
  offsetTop: number
  target?: string
  onChange?: (type: string) => void 
}

export default class Affix extends React.Component<AffixProps> {
  private prefix = `${ROOT_PREFIX}-affix`
  static defaultProps = {
    zIndex: 9,
    offsetTop: 0
  }
  state: any
  affix: boolean = false

  constructor(props: AffixProps) {
    super(props)

    this.state = {
      position: 'static',
      placeHoldStyle: {}
    }
  }

  componentDidMount() {
    this.handleScroll()
  }

  start() {
    const { onChange } = this.props
    const element = ReactDOM.findDOMNode(this) as HTMLElement
    this.affix = true
    this.setState({
      position: 'fixed',
      placeHoldStyle: {
        width: '100%',
        height: element.offsetHeight
      }
    })
    onChange && onChange('fixed')
  }

  stop() {
    const { onChange } = this.props
    this.affix = false
    this.setState({
      position: 'static',
      placeHoldStyle: {
        overflow: 'hidden'
      }
    })
    onChange && onChange('static')
  }

  updateStatus() {
    const { offsetTop, offsetBottom } = this.props
    const element = ReactDOM.findDOMNode(this) as HTMLElement
    if (!element) {
      return;
    }
    // 实际距离顶部的距离
    let reallyTop: number
    // 设置距离顶部开始滚动的距离
    let propsTop: number
    if (offsetBottom !== undefined) {      
      reallyTop = GetViewSize().height - element.getBoundingClientRect().bottom
      propsTop = offsetBottom
    } else {
      reallyTop = element.getBoundingClientRect().top
      propsTop = offsetTop as number
    }
    if (!this.affix && reallyTop <= propsTop) {
      this.start()
    }
    if (this.affix && reallyTop > propsTop) {
      this.stop()
    }
  }

  getStyle() {
    const { zIndex, offsetTop, offsetBottom } = this.props
    const { position } = this.state
    let obj: any = {}
    if (position === 'fixed') {
      obj = { position, zIndex }
      offsetBottom !== undefined ? obj.bottom = offsetBottom : obj.top = offsetTop
    } else {
      obj = { position }
    }
    return obj
  }

  handleScroll = throttle(20, () => {
    this.updateStatus()
  })

  render() {
    const { placeHoldStyle } = this.state
    const { target, wrapperClassName, children, ...rest } = this.props
    const viewProps = omit(rest, ['zIndex', 'offsetBottom', 'offsetTop', 'onChange'])
    const sty = this.getStyle()
    return (
      <div className={wrapperClassName} style={placeHoldStyle}>
        <View config={{...viewProps, prefix: this.prefix, sty}}>
          {children}
          <WindowEventHandler target={target} name='scroll' callback={this.handleScroll} />
          {/* resize 事件只支持window */}
          <WindowEventHandler name='resize' callback={this.handleScroll} />
        </View>
      </div>
    )
  }
}
