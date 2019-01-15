
import * as React from 'react'
import classnames from 'classnames'

export interface ContentProps {
  className?: string,
  style?: object,
  auto?: boolean,
}

class Content extends React.Component<ContentProps> {
  public prefix = 'diff-layout-content'
  constructor(props: ContentProps) {
    super(props);
  }

  render() {
    const { className, style, auto, children } = this.props
    const cls = classnames(this.prefix, className, {
      [`${this.prefix}-auto`]: auto,
    })
    return (
      <div className={cls} style={style}>{children}</div>
    )
  }
}

export default Content
