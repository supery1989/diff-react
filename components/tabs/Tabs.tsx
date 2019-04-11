import * as React from 'react'
// import classnames from 'classnames'
// import omit from 'omit.js'
import View, { ROOT_PREFIX } from 'libs/view'

export interface TabsProps {
  className?: string
  style?: object
}

export default class Tabs extends React.Component<TabsProps> {
  private prefix = `${ROOT_PREFIX}-tabs`

  render() {
    const { ...rest } = this.props
    return (
      <View config={{...rest, prefix: this.prefix}}>开发中...</View>
    )
  }
}
