
import * as React from 'react'
import classnames from 'classnames'

export interface HeaderProps {
  className?: string,
  style?: object,
}

class Header extends React.Component<HeaderProps> {
  public prefix = 'diff-layout-header'
  constructor(props: HeaderProps) {
    super(props);
  }

  render() {
    const { className, style, children } = this.props
    const cls = classnames(this.prefix, className)
    return (
      <div className={cls} style={style}>{children}</div>
    )
  }
}

export default Header
