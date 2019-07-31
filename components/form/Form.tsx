import * as React from 'react'
// import classnames from 'classnames'
// import omit from 'omit.js'
import View, { ROOT_PREFIX } from 'libs/view'

export interface FormProps {
  className?: string
  style?: object
}

export default class Form extends React.Component<FormProps> {
  private prefix = `${ROOT_PREFIX}-form`

  render() {
    const { ...rest } = this.props
    return (
      <View config={{...rest, prefix: this.prefix}}>敬请期待...</View>
    )
  }
}
