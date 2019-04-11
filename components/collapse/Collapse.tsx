import * as React from 'react'
// import classnames from 'classnames'
// import omit from 'omit.js'
import View, { ROOT_PREFIX } from 'libs/view'

export interface CollapseProps {
  className?: string
  style?: object
}

export default class Collapse extends React.Component<CollapseProps> {
  private prefix = `${ROOT_PREFIX}-collapse`

  render() {
    const { ...rest } = this.props
    return (
      <View config={{...rest, prefix: this.prefix}}>开发中...</View>
    )
  }
}
