import * as React from 'react'
import { Link, HashRouter } from 'react-router-dom'
import classnames from 'classnames'
import omit from 'omit.js'
import View, { ROOT_PREFIX } from '../../libs/view'
import Icon from '../icon'

export interface BreadcrumbItemProps {
  className?: string,
  style?: object,
  href?: string,
  target?: '_self' | '_blank',
  separator?: string | React.ReactNode,
  icon?: string,
  isRr?: boolean,
}

export default class BreadcrumbItem extends React.Component<BreadcrumbItemProps> {
  private prefix = `${ROOT_PREFIX}-breadcrumb-item`
  static defaultProps = {
    target: '_self',
    separator: '/'
  }

  render() {
    const { href, target, separator, icon, children, isRr, ...rest } = this.props
    const viewProps = omit(rest, ['href', 'target', 'separator'])
    let link: any
    const itemCls = classnames(`${this.prefix}-item`, {
      [`${this.prefix}-link`]: !!href
    })
    if (isRr && href) {
      link = <HashRouter><Link className={itemCls} to={href}>{children}</Link></HashRouter>
    } else {
      if (href) {
        link = <a className={itemCls} target={target} href={href} {...rest}>{children}</a>
      } else {
        link = <span className={itemCls} {...rest}>{children}</span>
      }
    }
    let separatorNode
    if (icon) {
      separatorNode = <Icon type={icon} />
    } else {
      separatorNode = separator
    }
    if (children) {
      return (
        <View config={{...viewProps, prefix: this.prefix}} tag='span'>
          {link}
          <span className={`${this.prefix}-separator`}>{separatorNode}</span>
        </View>
      )
    }
    return null
  }
}
