import * as React from 'react'
import classnames from 'classnames'
import omit from 'omit.js'
import View, { ROOT_PREFIX } from 'libs/view'
import Item from './Item'

export interface ListProps {
  className?: string
  style?: object
  border: boolean
  strip: boolean
  data: Array<any>
  header?: string | React.ReactNode
  footer?: string | React.ReactNode
  size: 'small' | 'default' | 'large'
  renderItem?: (item: any, index: number) => void
}

export default class List extends React.Component<ListProps> {
  private prefix = `${ROOT_PREFIX}-list`
  static Item: any
  static defaultProps = {
    border: true,
    strip: true,
    data: [],
    size: 'default'
  }

  renderLists() {
    const { data, renderItem, children } = this.props
    let items: any
    if (data && data.length > 0) {
      if (renderItem) {
        items = data.map((item: any, index: number) => renderItem(item, index))
      } else {
        items = data.map((item: any, index: number) => <Item key={index} {...item}>{item.children}</Item>)
      }
    } else {
      items = children
    }
    return React.Children.map(items, (child: any, index: number) => {
      return React.cloneElement(child, { key: index })
    })
  }

  render() {
    const { border, strip, header, footer, size, ...rest } = this.props
    const viewProps = omit(rest, ['data', 'renderItem'])
    const cls = classnames({
      [`${this.prefix}-border`]: !!border,
      [`${this.prefix}-strip`]: !!strip,
      [`${this.prefix}-${size}`]: size
    })
    return (
      <View config={{...viewProps, prefix: this.prefix, cls}}>
        {header && <div className={`${this.prefix}-header`}>{header}</div>}
        {this.renderLists()}
        {footer && <div className={`${this.prefix}-footer`}>{footer}</div>}
      </View>
    )
  }
}
