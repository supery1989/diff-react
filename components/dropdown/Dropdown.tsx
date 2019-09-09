import * as React from 'react'
import classnames from 'classnames'
import omit from 'omit.js'
import uuid from 'uuid'
import AnimateHeight from 'react-animate-height'
import OutsideClickHandler from 'react-outside-click-handler'
import View, { ROOT_PREFIX } from '../../libs/view'
import Icon from '../icon'
import Menu from '../menu'
import Button from '../button'

export interface DropdownProps {
  className?: string,
  style?: object,
  menu: object[],
  show?: boolean,
  width: number,
  trigger?: 'hover' | 'click',
  hideOnClick?: boolean,
  disabled?: boolean,
  button?: object,
  splitButton?: boolean,
  placement?: 'bottomleft' | 'bottomcenter' | 'bottomright' | 'topleft' | 'topcenter' | 'topright'
  onClick?: (insideKey: string, key?: string) => void
}

export default class Dropdown extends React.Component<DropdownProps> {
  private prefix = `${ROOT_PREFIX}-dropdown`
  static defaultProps = {
    show: false,
    width: 100,
    trigger: 'hover',
    hideOnClick: true,
    disabled: false,
    splitButton: false,
    menu: [],
    placement: 'bottomleft',
  }
  state: any
  enterTimer: any
  leaveTimer: any
  titleNode: any

  constructor(props: DropdownProps) {
    super(props)
    this.state = {
      show: props.show,
      menuSty: {},
      menuWidth: props.width
    }
  }

  componentDidMount() {
    this.setState({
      menuSty: this.setPosition(),
    })
  }

  componentWillUnmount() {
    if (this.enterTimer) {
      clearTimeout(this.enterTimer)
    }
    if (this.leaveTimer) {
      clearTimeout(this.leaveTimer)
    }
  }

  getEventHandle() {
    const { trigger } = this.props
    let events = {}
    if (trigger === 'click') {
      events = {
        onClick: this.handleKeyClick.bind(this)
      }
    } else {
      events = {
        onMouseEnter: this.handleMouseEnter.bind(this),
        onMouseLeave: this.handleMouseLeave.bind(this)
      }
    }
    return events
  }

  handleMouseEnter() {
    if (this.leaveTimer) {
      clearTimeout(this.leaveTimer)
    }
    this.enterTimer = setTimeout(() => {
      this.setState({ show: true })
    }, 200)
  }

  handleMouseLeave() {
    if (this.enterTimer) {
      clearTimeout(this.enterTimer)
    }
    this.leaveTimer = setTimeout(() => {
      this.setState({ show: false })
    }, 200)
  }

  handleKeyClick() {
    const { show } = this.state
    if (show) {
      this.handleMouseLeave()
    } else {
      this.handleMouseEnter()
    }
  }

  handleClick(key1: string, key2: string) {
    const { onClick, hideOnClick } = this.props
    if (hideOnClick) {
      this.setState({ show: false })
    }
    onClick && onClick(key1, key2)
  }

  handleClickOutside() {
    const { trigger } = this.props
    if (trigger === 'click') {
      this.setState({
        show: false
      })
    }
  }

  setPosition() {
    const { placement, width, menu } = this.props
    let sty:any
    const h = this.titleNode.offsetHeight + 2
    const h2 = menu.length * 40
    const w = this.titleNode.offsetWidth
    const menuWidth = w > width ? w : width
    this.setState({
      menuWidth
    })
    switch(placement) {
      case 'bottomleft':
        sty = { left: 0, top: `${h}px` }
        break
      case 'bottomcenter':
        sty = { left: '50%', marginLeft: `${-menuWidth/2}px`, top: `${h}px` }
        break
      case 'bottomright':
        sty = { right: 0, top: `${h}px` }
        break
      case 'topleft':
        sty = { left: 0, top: `-${h2 + 5}px`}
        break
      case 'topcenter':
        sty = { left: '50%', marginLeft: `${-menuWidth/2}px`, top: `-${h2 + 5}px` }
        break
      case 'topright':
        sty = { right: 0, top: `-${h2 + 5}px` }
        break
    }
    return sty
  }

  refCb(node: any){
    this.titleNode = node
  }

  renderMenu(menu: any) {
    let i = 1;
    return menu.map((item: any) => {
      if (item.submenu) {
        return <Menu.SubMenu key={`${this.prefix}${i++}`} title={item.node} {...item.props}>{this.renderMenu(item.submenu)}</Menu.SubMenu>
      } else {
        return <Menu.Item key={uuid.v1()} {...item.props}>{item.node}</Menu.Item>
      }
    })
  }

  returnContent(menu: any) {
    const { children, button, splitButton } = this.props
    if (button) {
      if (splitButton) {
        const iconProps = omit(button, ['text'])
        const events = this.getEventHandle()
        return (
          <span className={`${this.prefix}-inner`} ref={this.refCb.bind(this)}>
            <Button {...button} className={`${this.prefix}-button-title`} />
            <Button {...iconProps} className={`${this.prefix}-button-icon`} icon={this.getIconType()} {...events} />
          </span>
        )
      } else {
        return (
          <span className={`${this.prefix}-inner`} ref={this.refCb.bind(this)}>
            <Button {...button} icon={this.getIconType()} iconPosition='right' />
          </span>
        )
      }
    }
    return (
      <span className={`${this.prefix}-inner`} ref={this.refCb.bind(this)}>
        {children}
        {menu && <Icon type={this.getIconType()} className={`${this.prefix}-arrow`} />}
      </span>
    )
  }

  getIconType() {
    const { disabled } = this.props
    const { show } = this.state
    let iconType: string
    if (disabled) {
      iconType = 'down'
    } else {
      if (show) {
        iconType = 'up'
      } else {
        iconType = 'down'
      }
    }
    return iconType
  }

  render() {
    const { menu, children, disabled, splitButton, ...rest } = this.props
    const viewProps = omit(rest, ['show', 'width', 'onClick', 'trigger', 'hideOnClick', 'button', 'placement'])
    const { show, menuSty, menuWidth } = this.state
    const events = splitButton ? {} : this.getEventHandle()
    const cls = classnames({
      [`${this.prefix}-disabled`]: !!disabled
    })
    return (
      <View config={{...viewProps, prefix: this.prefix, cls}} {...events} tag='span'>
        <OutsideClickHandler onOutsideClick={this.handleClickOutside.bind(this)}>
          {menu && !disabled &&
            (<AnimateHeight during={300} height={show ? 'auto' : 0} className={`${this.prefix}-menu`} style={menuSty}>
              <Menu mode='popup' style={{ minWidth: `${menuWidth}px`, width: 'unset' }} onClick={this.handleClick.bind(this)}>{this.renderMenu(menu)}</Menu>
            </AnimateHeight>
          )}
          {this.returnContent(menu)}
        </OutsideClickHandler>
      </View>
    )
  }
}
