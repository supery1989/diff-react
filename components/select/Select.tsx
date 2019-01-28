import * as React from 'react'
// import classnames from 'classnames'
// import omit from 'omit.js'
import View from 'libs/view'

export interface SelectProps {
  className?: string,
  style?: object,
}

export default class Select extends React.Component<SelectProps> {
  private prefix = 'diff-select'

  render() {
    const { ...rest } = this.props
    return (
      <View config={{...rest, prefix: this.prefix}}>select</View>
    );
  }
}
