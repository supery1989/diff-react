import * as React from 'react'
import classnames from 'classnames'
import View, { ROOT_PREFIX } from 'libs/view'

export interface DividerProps {
  className?: string,
  style?: object,
  dashed?: boolean,
  direction?: 'v' | 'h',
  placement?: 'left' | 'right' | 'center'
}

export default class Divider extends React.Component<DividerProps> {
  private prefix = `${ROOT_PREFIX}-divider`
  static defaultProps = {
    direction: 'h',
    placement: 'center'
  }

  render() {
    const { direction, dashed, placement, children, ...rest } = this.props
    const cls = classnames({
      [`${this.prefix}-${direction}`]: direction,
      [`${this.prefix}-dashed`]: !!dashed,
      [`${this.prefix}-with-text-${placement}`]: children
    })
    return (
      <View config={{...rest, prefix: this.prefix, cls}}>
        {children && <span className={`${this.prefix}-text`}>{children}</span>}
      </View>
    )
  }
}
