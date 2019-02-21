import * as React from 'react'
import classnames from 'classnames'
import omit from 'omit.js'
import AnimateHeight from 'react-animate-height'
import OutsideClickHandler from 'react-outside-click-handler'
import View, { ROOT_PREFIX } from 'libs/view'
import Icon from 'components/icon'
import { GetExtraStyle, RenderCommonItem } from './util'

export interface SubMenuProps {
  className?: string,
  style?: object,
  title?: string | React.ReactNode,
  index: string,
  disabled: boolean,
  isGroup: boolean,
  divided: boolean,
  // 以下通过父组件传入
  specKey: string,
  handleSelect: (key: string) => void,
  onClick?: (insideKey: string, key?: string) => void,
  toggleExpand: (key: string, index: string) => void,
  selectedKey: string,
  defaultSelectedKey: string,
  defaultExpandKeys: string[],
  isInline: boolean,
  depth: number,
  inlineIndent: number,
  expandKeys: string[],
  expandSingle: boolean,
  eventType: 'hover' | 'click',
  direction: string
}

export default class SubMenu extends React.Component<SubMenuProps> {
  private prefix = `${ROOT_PREFIX}-menu-submenu`
  static defaultProps = {
    disabled: false,
    isGroup: false,
    index: ''
  }
  static displayName = 'SubMenu'
  state: any
  enterTimer: any
  leaveTimer: any

  constructor(props: SubMenuProps) {
    super(props)
    const isExpand = props.isInline && this.isExpandHandle(props.expandKeys, props.specKey, props.defaultExpandKeys, props.index)
    this.state = {
      isExpand,
      show: false,
    }
  }

  componentWillReceiveProps(nextProps: SubMenuProps) {
    const { specKey, isInline, index } = this.props
    if (isInline) {
      const { expandKeys: nextExpandKeys, defaultExpandKeys } = nextProps
      const isExpand = this.isExpandHandle(nextExpandKeys, specKey, defaultExpandKeys, index)
      this.setState({ isExpand })
    }
  }

  componentWillUnmount() {
    clearTimeout(this.enterTimer)
    clearTimeout(this.leaveTimer)
  }

  isExpandHandle(expandKeys: string[], specKey: string, defaultExpandKeys: string[], index: string) {
    return expandKeys.indexOf(specKey) !== -1 || defaultExpandKeys.indexOf(index) !== -1
  }

  getEventHandle(disabled: boolean, isInline: boolean) {
    const { isGroup, eventType } = this.props
    let eventHandle = {}
    if (!disabled && !isInline && !isGroup) {
      if (eventType === 'hover') {
        eventHandle = {
          onMouseEnter: this.handleMouseEnter,
          onMouseLeave: this.handleMouseLeave
        }
      }
    }
    return eventHandle
  }

  handleTitleClick(insideKey: string, event: any) {
    const { isInline, specKey, toggleExpand, onClick, index, isGroup, eventType } = this.props
    // this.props.onSubMenuClick(specKey)
    if (isGroup) {
      return
    }
    if (eventType === 'click') {
      this.handlePopClick(event)
    }
    if (isInline) {
      toggleExpand(specKey, index)
    }
    onClick && onClick(insideKey, index)
    event.stopPropagation()
  }

  handleMouseEnter = () => {
    if (this.leaveTimer) {
      clearTimeout(this.leaveTimer)
    }
    this.enterTimer = setTimeout(() => {
      this.setState({ show: true })
    }, 200)
  }

  handleMouseLeave = () => {
    if (this.enterTimer) {
      clearTimeout(this.enterTimer)
    }
    this.leaveTimer = setTimeout(() => {
      this.setState({ show: false })
    }, 200)
  }

  handleClickOutside(eventType: string) {
    if (eventType === 'click') {
      this.setState({ show: false })
    }
  }

  handlePopClick = (e: any) => {
    const { show } = this.state
    if (show) {
      this.handleMouseLeave()
    } else {
      this.handleMouseEnter()
    }
  }

  handleClick = (key: string, index?: string) => {
    const { onClick, isInline, eventType } = this.props
    !isInline && eventType === 'hover' && this.setState({ show: false })
    onClick && onClick(key, index)
  }

  renderPopupChild = (component: any, index: number) => {
    if (!component) {
      return
    }
    const { specKey, inlineIndent, eventType, depth } = this.props
    const extraProps: any = {
      depth: depth + 1,
      inlineIndent,
      eventType,
      onClick: this.handleClick,
    }
    return RenderCommonItem(component, index, specKey, extraProps)
  }

  renderInlineChild = (component: any, index: number) => {
    if (!component) {
      return
    }
    const { depth, isInline, inlineIndent, selectedKey, defaultSelectedKey, expandKeys, handleSelect, specKey, toggleExpand, expandSingle, defaultExpandKeys } = this.props
    const extraProps: any = {
      depth: depth + 1,
      isInline,
      inlineIndent,
      selectedKey,
      defaultSelectedKey,
      handleSelect,
      onClick: this.handleClick,
      expandKeys,
      // onSubMenuClick: this.props.onSubMenuClick,
    }
    if (component.type.name === 'SubMenu') {
      extraProps.expandKeys = expandKeys
      extraProps.toggleExpand = toggleExpand
      extraProps.expandSingle = expandSingle
      extraProps.defaultExpandKeys = defaultExpandKeys
    }
    return RenderCommonItem(component, index, specKey, extraProps)
  }

  renderContent() {
    const { children, isInline, isGroup, inlineIndent, depth } = this.props

    if (!isInline) {
      const { show } = this.state
      if (!show && !isGroup) {
        return null
      }
      const cls = classnames(`${ROOT_PREFIX}-menu-popup`, `${ROOT_PREFIX}-menu-popup-${depth}`, {
        [`${ROOT_PREFIX}-menu-popup-group`]: !!isGroup
      })
      const sty = isGroup ? { 'paddingLeft': `${inlineIndent}px` } : {}
      return (
        <ul className={cls} style={sty}>
          {React.Children.map(children, this.renderPopupChild)}
        </ul>
      )
    }

    const { isExpand } = this.state
    return (
      <AnimateHeight during={300} height={(isExpand || isGroup) ? 'auto' : 0}>
        <ul className={`${ROOT_PREFIX}-menu-inner`}>
          {React.Children.map(children, this.renderInlineChild)}
        </ul>
      </AnimateHeight>
    )
  }

  getArrowIcon(isInline: boolean, direction: string) {
    const { isExpand, show } = this.state
    let iconType: string
    if (isInline) {
      if (isExpand) {
        iconType = 'up'
      } else {
        iconType = 'down'
      }
    } else {
      if (direction === 'h') {
        if (show) {
          iconType = 'up'
        } else {
          iconType = 'down'
        }
      } else {
        iconType = 'right'
      }
    }
    return iconType;
  }

  render() {
    const { title, children, specKey, handleSelect, selectedKey, defaultSelectedKey, isInline, depth, inlineIndent, disabled, expandKeys, onClick, toggleExpand, expandSingle, index, isGroup, eventType, direction, defaultExpandKeys, divided, ...rest } = this.props
    const viewProps = omit(rest, ['index'])
    const titleCls = classnames(`${this.prefix}-title`, {
      [`${this.prefix}-title-disabled`]: !!disabled,
      [`${this.prefix}-title-divided`]: !!divided,
      [`${ROOT_PREFIX}-menu-group-title`]: !!isGroup,
    })
    const eventHander = this.getEventHandle(disabled, isInline)
    const cls = classnames({[`${this.prefix}-selected`]: direction === 'h' && (selectedKey === specKey || defaultSelectedKey === index)})

    return (
      <View config={{...viewProps, prefix: this.prefix, cls}} tag='li' {...eventHander}>
        <OutsideClickHandler onOutsideClick={this.handleClickOutside.bind(this, eventType)}>
          <div className={titleCls} style={GetExtraStyle(isInline, depth, inlineIndent)} onClick={this.handleTitleClick.bind(this, specKey)}>
            {title}
            {!disabled && !isGroup && <Icon type={this.getArrowIcon(isInline, direction)} className={`${this.prefix}-arrow`} />}
          </div>
          {!disabled && this.renderContent()}
        </OutsideClickHandler>
      </View>
    )
  }
}
