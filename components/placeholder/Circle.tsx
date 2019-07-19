import * as React from 'react'
import classnames from 'classnames'
import View from 'libs/view'
import { Prefix, Default_Props } from './consts'

export interface CircleProps {
  className?: string
  style?: object
  animate: boolean
  diameter: number
}

export default class Circle extends React.Component<CircleProps> {
  private prefix = Prefix
  static defaultProps = {
    animate: Default_Props.animate,
    diameter: 80,
  }

  render() {
    const { animate, diameter, ...rest } = this.props
    const sty = {
      height: diameter,
      minWidth: diameter
    }
    const cls = classnames(`${this.prefix}-circle`, `${this.prefix}-shape`, {
      [`${this.prefix}-shape-animate`]: !!animate
    })
    return (
      <View config={{...rest, prefix: this.prefix, cls, sty}} />
    )
  }
}
