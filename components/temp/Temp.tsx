import * as React from 'react'
// import classnames from 'classnames'
// import omit from 'omit.js'
import View from 'libs/view'

export interface TempProps {
  className?: string,
  style?: object,
}

export default class Temp extends React.Component<TempProps> {
  private prefix = 'diff-temp'

  render() {
    const { ...rest } = this.props
    return (
      <View config={{...rest, prefix: this.prefix}}>temp</View>
    );
  }
}
