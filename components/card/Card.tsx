import * as React from 'react'
import classnames from 'classnames'
import omit from 'omit.js'
import View, { ROOT_PREFIX } from '../../libs/view'

export interface CardProps {
  className?: string
  style?: object
  title?: string | React.ReactNode
  extra?: string | React.ReactNode
  bodyClass?: string
  bodyStyle?: object
  footer?: string | React.ReactNode
  noBorder?: boolean
  noHover?: boolean
  active?: boolean
}

export default class Card extends React.Component<CardProps> {
  private prefix = `${ROOT_PREFIX}-card`

  renderHead() {
    const { title, extra } = this.props
    if (title || extra) {
      return (
        <div className={`${this.prefix}-head`}>
          {title && <div className={`${this.prefix}-head-title`}>{title}</div>}
          {extra && <div className={`${this.prefix}-head-extra`}>{extra}</div>}
        </div>
      )
    }
    return null
  }

  render() {
    const { bodyClass, bodyStyle, footer, noBorder, noHover, active, children, ...rest } = this.props
    const viewProps = omit(rest, ['title', 'extra'])
    const bodyCls = classnames(`${this.prefix}-body`, bodyClass)
    const cls = classnames({
      [`${this.prefix}-noBorder`]: !!noBorder,
      [`${this.prefix}-noHover`]: !!noHover,
      [`${this.prefix}-active`]: !!active,
    })
    return (
      <View config={{...viewProps, prefix: this.prefix, cls}}>
        {this.renderHead()}
        {children && <div className={bodyCls} style={bodyStyle}>{children}</div>}
        {footer && <div className={`${this.prefix}-footer`}>{footer}</div>}
      </View>
    )
  }
}
