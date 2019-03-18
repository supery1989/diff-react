import * as React from 'react'
import * as ReactDom from 'react-dom'
import classnames from 'classnames'
import Popper from 'popper.js'
import omit from 'omit.js'
import OutsideClickHandler from 'react-outside-click-handler'
import View, { ROOT_PREFIX } from 'libs/view'
import Transition from 'components/transition'

export interface PopoverProps {
  className?: string
  style?: object
  content?: string | React.ReactNode
  trigger: 'hover' | 'click' | 'focus'
  arrow: boolean
  title?: string | React.ReactNode
  width?: number
  show?: boolean
  popClass?: string
  popStyle?: object
  placement: 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end'
}

export default class Popover extends React.Component<PopoverProps> {
  private prefix = `${ROOT_PREFIX}-popover`
  static defaultProps = {
    trigger: 'hover',
    arrow: true,
    show: false,
    placement: 'bottom'
  }
  target: any
  refs: any
  popperJS: any
  state: any

  constructor(props: PopoverProps) {
    super(props)

    this.state = {
      showPopper: props.show
    }
  }

  componentWillReceiveProps(nextProps: PopoverProps) {
    if (this.props.show !== nextProps.show) {
      if (!nextProps.show) {
        this.hide()
      } else {
        this.showPop()
      }
    }
  }

  componentDidMount() {
    const { trigger } = this.props
    this.target = ReactDom.findDOMNode(this.refs.target)
    if (!this.target) return 
    if (trigger === 'hover') {
      this.target.addEventListener('mouseenter', this.showPop.bind(this))
      this.target.addEventListener('mouseleave', this.hide.bind(this))
    } else if (trigger === 'click') {
      this.target.addEventListener('click', this.showPop.bind(this))
    } else if (trigger === 'focus') {
      if (this.target.nodeName === 'INPUT' || this.target.nodeName === 'TEXTAREA') {
        this.target.addEventListener('focus', this.showPop.bind(this))
        this.target.addEventListener('blur', this.hide.bind(this))
      } else {
        this.target.addEventListener('mousedown', this.showPop.bind(this))
        this.target.addEventListener('mouseup', this.hide.bind(this))
      }
    }
  }

  showPop() {
    this.setState({
      showPopper: true
    }, () => {
      if (this.refs.arrow) {
        this.refs.arrow.setAttribute('x-arrow', '');
      }
      const dom = ReactDom.findDOMNode(this.refs.popper)
      this.popperJS = new Popper(this.target, (dom as Element), {
        placement: this.props.placement,
        modifiers: {
          // computeStyle: {
          //   gpuAcceleration: false
          // },
          // TODO 父级某个元素设置了overflow !== initial后就会导致弹窗一直显示
          // preventOverflow: { enabled: false },
        }
      })
      if (this.props.trigger === 'hover') {
        this.refs.popper.addEventListener('mouseenter', this.showPop.bind(this))
        this.refs.popper.addEventListener('mouseleave', this.hide.bind(this))
      }
    })
  }

  hide() {
    this.setState({
      showPopper: false
    })
  }

  handleClickOutside() {
    const { trigger } = this.props
    if (trigger === 'click' && this.state.showPopper) {
      this.hide()
    }
  }

  handleEnd() {
    if (!this.state.showPopper) {
      this.popperJS && this.popperJS.destroy()
    }
  }

  renderPopper() {
    const { showPopper } = this.state
    const { content, arrow, title, width, popClass, popStyle, placement } = this.props
    const cls = classnames(`${this.prefix}-body`, popClass)
    const customWidth = width && width >= 0 ? { width: `${width}px`} : {}
    const sty = Object.assign({}, popStyle, customWidth)
    const popCls = classnames(`${this.prefix}-pop`, `${this.prefix}-placement-${placement}`, {
      [`${this.prefix}-has-arrow`]: !!arrow
    })
    return (
      <span className={popCls} ref='popper'>
        <OutsideClickHandler onOutsideClick={this.handleClickOutside.bind(this)}>
          <Transition type='fade' show={showPopper} unmount onEnd={this.handleEnd.bind(this)}>
            <div className={cls} style={sty}>
              {title && <div className={`${this.prefix}-title`}>{title}</div>}
              {content}
              {arrow && <div ref='arrow' className={`${this.prefix}-arrow`} />}
            </div>
          </Transition>
        </OutsideClickHandler>
      </span>
    )
  }

  render() {
    const { children, ...rest } = this.props
    const viewProps = omit(rest, ['content', 'trigger', 'arrow', 'title', 'width', 'show', 'popClass', 'popStyle', 'placement'])
    return (
      <View config={{...viewProps, prefix: this.prefix}} tag='span'>
        {this.renderPopper()}
        {React.cloneElement(React.Children.only(children), { ref: 'target' })}
      </View>
    )
  }
}
