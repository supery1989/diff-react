import * as React from 'react'
import classnames from 'classnames'
import omit from 'omit.js'
import View, { ROOT_PREFIX } from 'libs/view'
import Transition from 'components/transition'

export interface TooltipProps {
  className?: string
  style?: object
  content?: string | React.ReactNode
  placement: 'leftTop' | 'left' | 'leftBottom' | 'topLeft' | 'top' | 'topRight' | 'rightTop' | 'right' | 'rightBottom' | 'bottomLeft' | 'bottom' | 'bottomRight'
  show?: boolean
  trigger?: 'hover' | 'click' | 'focus'
  mouseEnterDelay?: number
  mouseLeaveDelay?: number
  theme?: 'dark' | 'light'
}

export default class Tooltip extends React.Component<TooltipProps> {
  private prefix = `${ROOT_PREFIX}-tooltip`
  static defaultProps = {
    placement: 'topLeft',
    show: false,
    trigger: 'hover',
    theme: 'dark'
  }
  reference: any
  popup: any
  state: any
  timer: any

  constructor(props: TooltipProps) {
    super(props)

    this.state = {
      popupStyles: {}
    }
  }

  componentDidMount() {
    this.setState({
      popupStyles: this.setPosition()
    })
  }

  componentWillReceiveProps(nextProps: TooltipProps) {
    if (this.props.content !== nextProps.content) {
      this.setState(
        {
          content: nextProps.content
        },
        () => {
          this.setState({
            popupStyles: this.setPosition()
          })
        }
      )
    }
    if (this.props.show !== nextProps.show) {
      if (!this.props.show) {
        this.handleShow()
      } else {
        this.handleHide()
      }
    }
  }

  refCbChild(node: any) {
    this.reference = node
  }

  refCbPopup(node: any) {
    this.popup = node && node.refs.viewRef
  }

  getEvents() {
    const { trigger } = this.props
    let events = {}
    if (trigger === 'click') {
      events = {
        onClick: this.handleClick.bind(this),
        onMouseLeave: this.handleHide.bind(this)
      }
    } else if (trigger === 'hover') {
      events = {
        onMouseEnter: this.handleShow.bind(this),
        onMouseLeave: this.handleHide.bind(this)
      }
    } else if (trigger === 'focus') {
      events = {
        onMouseDown: this.handleShow.bind(this),
        onMouseUp: this.handleHide.bind(this)
      }
    }
    return events
  }

  setPosition() {
    const { placement } = this.props
    let top = 0
    let left = 0

    const popupWidth = this.popup.offsetWidth
    const popupHeight = this.popup.offsetHeight

    const referenceWidth = this.reference.offsetWidth
    const referenceHeight = this.reference.offsetHeight

    const diffWidth = popupWidth - referenceWidth
    const diffHeight = popupHeight - referenceHeight

    switch (placement) {
      case 'topLeft':
        top = -(referenceHeight > popupHeight ? referenceHeight : popupHeight)
        left = 0
        break
      case 'top':
        top = -(referenceHeight > popupHeight ? referenceHeight : popupHeight)
        left = diffWidth > 0 ? -(diffWidth / 2) : Math.abs(diffWidth / 2)
        break
      case 'topRight':
        top = -(referenceHeight > popupHeight ? referenceHeight : popupHeight)
        left =
          referenceWidth > popupWidth
            ? referenceWidth - popupWidth
            : popupWidth - referenceWidth
        break
      case 'rightTop':
        top = 0
        left = referenceWidth
        break
      case 'right':
        top = diffHeight > 0 ? -(diffHeight / 2) : Math.abs(diffHeight / 2)
        left = referenceWidth
        break
      case 'rightBottom':
        top =
          referenceHeight > popupHeight
            ? referenceHeight - popupHeight
            : -(popupHeight - referenceHeight)
        left = referenceWidth
        break
      case 'bottomRight':
        top = referenceHeight
        left =
          referenceWidth > popupWidth
            ? referenceWidth - popupWidth
            : popupWidth - referenceWidth
        break
      case 'bottom':
        top = referenceHeight
        left = diffWidth > 0 ? -(diffWidth / 2) : Math.abs(diffWidth / 2)
        break
      case 'bottomLeft':
        top = referenceHeight
        left = 0
        break
      case 'leftBottom':
        top =
          referenceHeight > popupHeight
            ? referenceHeight - popupHeight
            : -(popupHeight - referenceHeight)
        left = -popupWidth
        break
      case 'left':
        top = diffHeight > 0 ? -(diffHeight / 2) : Math.abs(diffHeight / 2)
        left = -popupWidth
        break
      case 'leftTop':
        top = 0
        left = -popupWidth
        break
      default:
        top = -(referenceHeight > popupHeight ? referenceHeight : popupHeight)
        left = diffWidth > 0 ? -(diffWidth / 2) : Math.abs(diffWidth / 2)
        break
    }

    const styles: any = {}
    if (top || top === 0) {
      styles.top = `${top}px`
    }
    if (left) {
      styles.left = `${left}px`
    }
    return styles
  }

  handleClick() {
    if (!this.state.show) {
      this.handleShow()
    }
  }

  handleShow() {
    const { mouseEnterDelay } = this.props
    clearTimeout(this.timer)
    this.timer = setTimeout(
      () => {
        this.setState(
          {
            show: true
          },
          () => {
            this.setState({
              popupStyles: this.setPosition()
            })
          }
        )
      },
      mouseEnterDelay ? mouseEnterDelay * 1000 : 0
    )
  }

  handleHide() {
    const { mouseLeaveDelay } = this.props
    clearTimeout(this.timer)
    this.timer = setTimeout(
      () => {
        this.setState({
          show: false
        })
      },
      mouseLeaveDelay ? mouseLeaveDelay * 1000 : 0
    )
  }

  render() {
    const { content, children, placement, theme, ...rest } = this.props
    const viewProps = omit(rest, [
      'trigger',
      'show',
      'mouseEnterDelay',
      'mouseLeaveDelay'
    ])
    const { popupStyles, show } = this.state
    const cls = classnames({
      [`${this.prefix}-placement-${placement}`]: placement,
      [`${this.prefix}-${theme}`]: theme
    })
    const events = this.getEvents()
    return (
      <div className={`${this.prefix}-wrapper`} {...events}>
        <div ref={this.refCbChild.bind(this)}>{children}</div>
        <View
          config={{ ...viewProps, prefix: this.prefix, cls, sty: popupStyles }}
          ref={this.refCbPopup.bind(this)}
        >
          <Transition type='fade' show={show} unmount init>
            <div>
              <i className={`${this.prefix}-arrow`} />
              <div className={`${this.prefix}-content`}>{content}</div>
            </div>
          </Transition>
        </View>
      </div>
    )
  }
}
