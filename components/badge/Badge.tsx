import * as React from 'react'
import classnames from 'classnames'
import omit from 'omit.js'
import View, { ROOT_PREFIX } from '../../libs/view'

export interface BadgeProps {
  className?: string
  style?: object
  wrapperClass?: string
  dot?: boolean
  count?: number | string
  showZero?: boolean
  maxCount?: number
  onClick?: () => void
}

export default class Badge extends React.Component<BadgeProps> {
  private prefix = `${ROOT_PREFIX}-badge`
  static defaultProps = {
    maxCount: 99
  }

  handleClick() {
    const { onClick } = this.props
    onClick && onClick()
  }

  renderItem(cls: any, props: any, content: any = '') {
    return <View config={{...props, prefix: this.prefix, cls}} tag='span' onClick={this.handleClick.bind(this)}>{content}</View>
  }

  renderCount() {
    const { dot, count, showZero, maxCount, ...rest } = this.props
    const viewProps = omit(rest, ['wrapperClass', 'onClick'])
    if (dot) {
      const cls = classnames({
        [`${this.prefix}-dot`]: !!dot
      })
      return this.renderItem(cls, viewProps)
    }
    if ((count as number) > 0 || (count === 0 && showZero)) {
      const cls = classnames(`${this.prefix}-count`)
      const content = (count as number) > (maxCount as number) ? `${maxCount}+` : count
      return this.renderItem(cls, viewProps, content)
    }
    if (typeof count === 'string') {
      const cls = classnames(`${this.prefix}-count`)
      return this.renderItem(cls, viewProps, count)
    }
    return null
  }

  render() {
    const { children, wrapperClass } = this.props
    const wrapperCls = classnames(`${this.prefix}-wrapper`, wrapperClass, {
      [`${this.prefix}-wrapper-has-content`]: !!children,
      [`${this.prefix}-wrapper-no-content`]: !children
    })
    return (
      <View config={{className: wrapperCls}}>
        {children}
        {this.renderCount()}
      </View>
    )
  }
}
