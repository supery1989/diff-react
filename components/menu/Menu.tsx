import * as React from 'react'
import classnames from 'classnames'
import omit from 'omit.js'
import View, { ROOT_PREFIX } from 'libs/view'
import { RenderCommonItem } from './util'

export interface MenuProps {
  className?: string,
  style?: object,
  direction?: 'v' | 'h',
  theme?: 'dark' | 'light',
  mode?: 'inline' | 'popup',
  eventType?: 'hover' | 'click',
  selectedKey?: string,
  inlineIndent?: number,
  collapsed?: boolean,
  expandKeys: string[],
  expandSingle: boolean,
  onClick?: (insideKey: string, key?: string) => void
}

export default class Menu extends React.Component<MenuProps> {
  private prefix = `${ROOT_PREFIX}-menu`
  static Item: any
  static SubMenu: any
  static defaultProps = {
    direction: 'v',
    theme: 'light',
    mode: 'inline',
    eventType: 'hover',
    collapsed: false,
    inlineIndent: 15,
    expandKeys: [],
    expandSingle: false
  }
  state: any
  initMode: any

  constructor(props: MenuProps) {
    super(props)
    this.initMode = (props.direction === 'h' || props.collapsed) ? 'popup' : props.mode
    this.state = {
      defaultSelectedKey: props.selectedKey,
      defaultExpandKeys: props.expandKeys,
      selectedKey: '',
      expandKeys: [],
      collapsed: props.collapsed,
      mode: this.initMode
    }
  }

  componentWillReceiveProps(nextProps: MenuProps) {
    if (nextProps.selectedKey !== this.props.selectedKey) {
      this.setState({
        defaultSelectedKey: nextProps.selectedKey
      })
    }
    if (nextProps.collapsed !== this.props.collapsed) {
      this.setState({
        collapsed: nextProps.collapsed 
      }, () => {
        if (nextProps.collapsed) {
          this.setState({
            mode: 'popup'
          })
        } else {
          this.setState({
            mode: this.initMode
          })
        }
      })
    }
  }

  handleClick = (insideKey: string, key?: string) => {
    const { onClick } = this.props
    onClick && onClick(insideKey, key)
  }

  handleSelect = (key: string) => {
    this.setState({
      defaultSelectedKey: '',
      selectedKey: key
    })
  }

  toggleExpand = (key: string, index: string) => {
    const { expandKeys, defaultExpandKeys, collapsed } = this.state
    const { expandSingle } = this.props
    const isCurrentKeyExpand = expandKeys.indexOf(key) !== -1
    let newExpandKeys: string[] = []
    const defaultIndex = defaultExpandKeys.findIndex((item: string) => item === index)
    if (collapsed) {
      this.setState({ collapsed: false })
    }
    if (defaultIndex !== -1) {
      defaultExpandKeys.splice(defaultIndex, 1)
    } else {
      if (isCurrentKeyExpand) {
        newExpandKeys = expandKeys.filter((item: string) => item !== key)
      } else {
        if (expandSingle) {
          newExpandKeys = [key, ...expandKeys.filter((item: string) => key.indexOf(item) !== -1 || item.indexOf(key) !== -1)]
        } else {
          newExpandKeys =[key, ...expandKeys]
        }
      }
    }
    
    this.setState({ expandKeys: newExpandKeys, defaultExpandKeys })
    // this.props.onExpandChange(newExpandKeys)
  }

  renderItem = (component: any, index: number) => {
    if (!component) {
      return null
    }
    const { inlineIndent, expandSingle, eventType, direction } = this.props
    const { selectedKey, defaultSelectedKey, defaultExpandKeys, expandKeys, mode } = this.state
    const extraProps: any = {
      depth: 1,
      isInline: mode === 'inline',
      inlineIndent,
      selectedKey,
      defaultSelectedKey,
      handleSelect: this.handleSelect,
      onClick: this.handleClick,
      direction,
      // onSubMenuClick: this.props.onSubMenuClick,
    }
    if (component.type.displayName === 'SubMenu') {
      extraProps.expandKeys = expandKeys
      extraProps.toggleExpand = this.toggleExpand
      extraProps.expandSingle = expandSingle
      extraProps.eventType = eventType
      extraProps.defaultExpandKeys = defaultExpandKeys
    }
    
    return RenderCommonItem(component, index, undefined, extraProps)
  }

  render() {
    const { children, eventType, direction, theme, selectedKey, inlineIndent, onClick, expandKeys, expandSingle, collapsed, ...rest } = this.props
    const viewProps = omit(rest, ['mode'])
    const { mode } = this.state
    const cls = classnames({
      [`${this.prefix}-${direction}`]: direction,
      [`${this.prefix}-${theme}`]: theme,
      [`${this.prefix}-${mode}`]: mode,
      [`${this.prefix}-collapsed`]: !!this.state.collapsed
    })
    return (
      <View config={{...viewProps, prefix: this.prefix, cls}} tag='ul'>
        {React.Children.map(children, this.renderItem)}
      </View>
    )
  }
}
