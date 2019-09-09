import * as React from 'react'
// import classnames from 'classnames'
// import omit from 'omit.js'
import View, { ROOT_PREFIX } from '../../libs/view'

export interface ColorPickerProps {
  className?: string
  style?: object
}

export default class ColorPicker extends React.Component<ColorPickerProps> {
  private prefix = `${ROOT_PREFIX}-color-picker`

  render() {
    const { ...rest } = this.props
    return (
      <View config={{...rest, prefix: this.prefix}}>开发中...</View>
    )
  }
}
