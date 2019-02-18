import * as React from 'react'
import classnames from 'classnames'
import View, { ROOT_PREFIX } from 'libs/view'
import { GetExtraStyle } from './util'

export interface MenuItemProps {
  className?: string,
  style?: object,
  index?: string,
  disabled?: boolean,
  // 以下属性通过父组件传入
  specKey: string,
  selectedKey?: string,
  defaultSelectedKey: string,
  isInline: boolean,
  expandKeys: string[],
  inlineIndent: number,
  depth: number,
  direction: string,
  eventType: 'hover' | 'click',
  onClick?: (insideKey: string, key?: string) => void,
  handleSelect: (key: string) => void,
}

export default class MenuItem extends React.Component<MenuItemProps> {
  private prefix = `${ROOT_PREFIX}-menu-item`

  handleClick(e: any) {
    const { disabled, onClick, handleSelect, specKey, isInline, index } = this.props
    if (disabled) {
      return
    }
    if (isInline) {
      handleSelect(specKey)
    }
    onClick && onClick(specKey, index)
  }

  render() {
    const { children, disabled, specKey, selectedKey, defaultSelectedKey, onClick, handleSelect, isInline, inlineIndent, depth, expandKeys, index, eventType, direction, ...rest } = this.props
    const cls = classnames({
      // [`${this.prefix}-active`]: index === this.context.rootCmd.state.active,
      [`${this.prefix}-disabled`]: !!disabled,
      [`${this.prefix}-selected`]: (isInline || direction === 'h') && (selectedKey === specKey || (defaultSelectedKey && defaultSelectedKey === index))
    })
    const sty = GetExtraStyle(isInline, depth, inlineIndent)
    return (
      <View config={{...rest, prefix: this.prefix, cls, sty}} tag='li' onClick={this.handleClick.bind(this)}>{children}</View>
    )
  }
}
