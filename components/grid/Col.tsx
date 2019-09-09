import * as React from 'react'
import classnames from 'classnames'
import View, { ROOT_PREFIX } from '../../libs/view'

export interface ColProps {
  className?: string,
  style?: object,
  tag?: string,
  span: number,
  offset?: number,
  pull?: number,
  push?: number,
  order?: number,
  xs?: number,
  sm?: number,
  md?: number,
  lg?: number,
  xl?: number,
  xxl?: number,
  // 以下通过父组件传入
  type: string
}

export default class Col extends React.Component<ColProps> {
  private prefix = `${ROOT_PREFIX}-col`
  static defaultProps = {
    span: 24
  }

  render() {
    const { tag, type, span, offset, pull, push, order, xs, sm, md, lg, xl, xxl, children, ...rest } = this.props
    let classList: any = []
    const mediaSize = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl']
    mediaSize.forEach((size: any) => {
      if (typeof this.props[size] === 'object') {
        let props = this.props[size]
        Object.keys(props).forEach(prop => {
          classList.push(
            prop !== 'span'
            ? `${this.prefix}-${size}-${prop}-${props[prop]}`
            : `${this.prefix}-${size}-${props[prop]}`
          )
        })
      } else if (this.props[size] >= 0) {
        classList.push(`${this.prefix}-${size}-${Number(this.props[size])}`)
      }
    })
    const cls = classnames(`${this.prefix}-${type}`, {
      [`${this.prefix}-${span}`]: span,
      [`${this.prefix}-offset-${offset}`]: !!offset,
      [`${this.prefix}-pull-${pull}`]: !!pull,
      [`${this.prefix}-push-${push}`]: !!push,
      [`${this.prefix}-order-${order}`]: !!order,
    }, classList)
    return (
      <View config={{...rest, prefix: this.prefix, cls}} tag={tag}>{children}</View>
    )
  }
}
