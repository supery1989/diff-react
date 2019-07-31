import * as React from 'react'
// import classnames from 'classnames'
// import omit from 'omit.js'
import View, { ROOT_PREFIX } from 'libs/view'

export interface TransferProps {
  className?: string
  style?: object
}

export default class Transfer extends React.Component<TransferProps> {
  private prefix = `${ROOT_PREFIX}-transfer`

  render() {
    const { ...rest } = this.props
    return (
      <View config={{...rest, prefix: this.prefix}}>敬请期待...</View>
    )
  }
}
