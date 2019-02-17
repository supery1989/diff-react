import * as React from 'react'
// import classnames from 'classnames'
// import omit from 'omit.js'
import View, { ROOT_PREFIX } from 'libs/view'

export interface DropdownProps {
  className?: string,
  style?: object,
}

export default class Dropdown extends React.Component<DropdownProps> {
  private prefix = `${ROOT_PREFIX}-dropdown`

  render() {
    const { ...rest } = this.props
    return (
      <View config={{...rest, prefix: this.prefix}}>dropdown</View>
    );
  }
}
