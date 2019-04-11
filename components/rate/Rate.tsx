import * as React from 'react'
// import classnames from 'classnames'
// import omit from 'omit.js'
import View, { ROOT_PREFIX } from 'libs/view'

export interface RateProps {
  className?: string
  style?: object
}

export default class Rate extends React.Component<RateProps> {
  private prefix = `${ROOT_PREFIX}-rate`

  render() {
    const { ...rest } = this.props
    return (
      <View config={{...rest, prefix: this.prefix}}>开发中...</View>
    )
  }
}
