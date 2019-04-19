
import * as React from 'react'
import classnames from 'classnames'
import omit from 'omit.js'
import View, { ROOT_PREFIX } from 'libs/view'

export interface ContentProps {
  className?: string,
  style?: object,
  auto?: boolean,
}

class Content extends React.Component<ContentProps> {
  public prefix = `${ROOT_PREFIX}-layout-content`
  constructor(props: ContentProps) {
    super(props)
  }

  render() {
    const { auto, children, ...rest } = this.props
    const cls = classnames({
      [`${this.prefix}-auto`]: auto,
    })
    const viewProps = omit(rest, ['auto'])
    return (
      <View config={{...viewProps, prefix: this.prefix, cls}}>{children}</View>
    )
  }
}

export default Content
