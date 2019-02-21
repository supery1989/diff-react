import * as React from 'react'
import classnames from 'classnames'
import View, { ROOT_PREFIX } from 'libs/view'

export interface RowProps {
  className?: string,
  style?: object,
  tag?: string,
  gutter?: number,
  type?: 'flex' | 'float',
  justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly',
  align?: 'stretch' | 'center' | 'flex-start' | 'flex-end' | 'baseline'
}

export default class Row extends React.Component<RowProps> {
  private prefix = `${ROOT_PREFIX}-row`
  static defaultProps = {
    gutter: 0,
    type: 'float',
    justify: 'flex-start'
  }

  render() {
    const { tag, gutter, type, justify, align, children, ...rest } = this.props
    const gutterSty = !gutter ? {} : { paddingLeft: gutter / 2, paddingRight: gutter / 2 }
    const cls = classnames(`${this.prefix}-${type}`, {
      [`${this.prefix}-justify-${justify}`]: type === 'flex' && justify,
      [`${this.prefix}-align-${align}`]: type === 'flex' && align,
    })
    return (
      <View config={{...rest, prefix: this.prefix, cls}} tag={tag}>
        {React.Children.map(children, (element: any) => {
          return React.cloneElement(element, Object.assign({}, element.props, {
            style: { ...element.props.style, ...gutterSty },
            type
          }))
        })}
      </View>
    )
  }
}
