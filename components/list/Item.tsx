import * as React from 'react'
import classnames from 'classnames'
import View, { ROOT_PREFIX } from '../../libs/view'

export interface ListItemProps {
  className?: string
  style?: object
  disabled?: boolean
  active?: boolean
  href?: string
}

export default class Item extends React.Component<ListItemProps> {
  private prefix = `${ROOT_PREFIX}-list-item`

  render() {
    const { disabled, active, href, children, ...rest } = this.props
    const cls = classnames({
      [`${this.prefix}-disabled`]: !!disabled,
      [`${this.prefix}-active`]: !!active,
      [`${this.prefix}-href`]: !!href,
    })
    const tag = href ? 'a' : 'div'
    return (
      <View config={{...rest, prefix: this.prefix, cls, href}} tag={tag}>{children}</View>
    )
  }
}
