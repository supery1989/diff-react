import * as React from 'react'
import classnames from 'classnames'
import omit from 'omit.js'
import View, { ROOT_PREFIX } from 'libs/view'
import Transition from 'components/transition'
import Icon from 'components/icon'
import WindowEventHandler from 'libs/windowEventHandler'

export interface DrawerProps {
  className?: string
  style?: object
  open: boolean
  title?: string | React.ReactNode
  closeable: boolean
  icon?: string
  size: number
  footer?: boolean
  placement: 'left' | 'right' | 'bottom' | 'top'
  keyboard: boolean
  during: number
  onClose?: () => void
}

export default class Drawer extends React.Component<DrawerProps> {
  private prefix = `${ROOT_PREFIX}-drawer`
  static defaultProps = {
    open: false,
    closeable: true,
    size: 260,
    placement: 'right',
    keyboard: true,
    during: 1000
  }
  state: any

  constructor(props: DrawerProps) {
    super(props)

    this.state = {
      open: props.open,
      show: false,
    }
  }

  componentWillReceiveProps(nextProps: DrawerProps) {
    if (this.state.open !== nextProps.open) {
      this.setState({
        open: nextProps.open,
        show: nextProps.open
      })
    }
  }

  onClose() {
    const { onClose } = this.props
    this.setState({
      open: false
    })
    onClose && onClose()
  }

  handleMaskClick(e: any) {
    if (e.target === e.currentTarget) {
      this.onClose()
    }
  }

  onEnd() {
    this.setState({
      show: false
    })
  }

  getAnimateType(placement: string) {
    const { open } = this.state
    let type: string = ''
    switch(placement) {
      case 'top':
        type = open ? 'fadeDown' : 'fadeUp'
        break
      case 'right':
        type = 'fadeRight'
        break
      case 'bottom':
        type = !open ? 'fadeDown' : 'fadeUp'
        break
      case 'left':
        type = 'fadeLeft'
        break
    }
    return type
  }

  handleKey(e: any) {
    if (e.keyCode === 27) {
      this.onClose()
    }
  }

  render() {
    const { title, closeable, icon, size, footer, placement, keyboard, during, children, ...rest } = this.props
    const viewProps = omit(rest, ['open', 'onClose'])
    const { open, show } = this.state
    const sty = { [/^(top|bottom)$/.test(placement) ? 'height' : 'width']: `${size}px` }
    const cls = classnames(`${this.prefix}-animate`, {
      [`${this.prefix}-${placement}`]: placement
    })
    if (!show) return null
    return (
      <View config={{...viewProps, prefix: this.prefix}}>
        <Transition during={during} unmount init type="fade" show={open}>
          <div className={`${this.prefix}-mask`} onClick={this.handleMaskClick.bind(this)} />
        </Transition>
        <Transition className={cls} during={during} unmount init type={this.getAnimateType(placement)} onEnd={this.onEnd.bind(this)} show={open} style={sty}>
          <div className={`${this.prefix}-wrapper`}>
            {title && (
              <div className={`${this.prefix}-header`}>
                {icon && <Icon type={icon} className={`${this.prefix}-header-icon`} />}
                <div className={`${this.prefix}-header-title`}>{title}</div>
                {closeable && <Icon type='close' className={`${this.prefix}-header-close`} onClick={this.onClose.bind(this)} />}
              </div>
            )}
            <div className={`${this.prefix}-body`}>
              <div className={`${this.prefix}-body-inner`}>{children}</div>
            </div>
            {footer && <div className={`${this.prefix}-footer`}>{footer}</div>}
          </div>
        </Transition>
        {keyboard && <WindowEventHandler name='keydown' callback={this.handleKey.bind(this)} />}
      </View>
    )
  }
}
