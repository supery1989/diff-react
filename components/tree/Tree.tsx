import * as React from 'react'
// import classnames from 'classnames'
// import omit from 'omit.js'
import View, { ROOT_PREFIX } from '../../libs/view'

export interface TreeProps {
  className?: string
  style?: object
}

export default class Tree extends React.Component<TreeProps> {
  private prefix = `${ROOT_PREFIX}-tree`

  render() {
    const { ...rest } = this.props
    return (
      <View config={{...rest, prefix: this.prefix}}>开发中...</View>
    )
  }
}
