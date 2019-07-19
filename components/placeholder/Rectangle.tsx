import * as React from 'react'
import classnames from 'classnames'
import View from 'libs/view'
import { Prefix, Default_Props } from './consts'

export interface RectangleProps {
  className?: string
  style?: object
  animate: boolean
  width: number
  height: number
}

export default class Rectangle extends React.Component<RectangleProps> {
  private prefix = Prefix
  static defaultProps = {
    animate: Default_Props.animate,
    width: 80,
    height: 80,
  }

  render() {
    const { animate, width, height, ...rest } = this.props
    const sty = {
      height,
      minWidth: width,
    }
    const cls = classnames(`${this.prefix}-rectangle`, `${this.prefix}-shape`, {
      [`${this.prefix}-shape-animate`]: !!animate
    })
    return (
      <View config={{...rest, prefix: this.prefix, cls, sty}} />
    )
  }
}
