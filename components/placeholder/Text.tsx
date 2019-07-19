import * as React from 'react'
import classnames from 'classnames'
import View from 'libs/view'
import { Prefix, Default_Props } from './consts'

export interface TextProps {
  className?: string
  style?: object
  animate: boolean
  spacing: string | number
}

export default class Text extends React.Component<TextProps> {
  private prefix = Prefix
  static defaultProps = {
    animate: Default_Props.animate,
    spacing: Default_Props.spacing
  }

  render() {
    const { spacing, animate, ...rest } = this.props
    const sty = {
      marginTop: spacing
    }
    const cls = classnames(`${this.prefix}-text-row`, `${this.prefix}-shape`, {
      [`${this.prefix}-shape-animate`]: !!animate
    })
    return (
      <View config={{...rest, prefix: this.prefix, cls, sty}} />
    )
  }
}
