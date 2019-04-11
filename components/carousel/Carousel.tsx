import * as React from 'react'
// import classnames from 'classnames'
// import omit from 'omit.js'
import View, { ROOT_PREFIX } from 'libs/view'

export interface CarouselProps {
  className?: string
  style?: object
}

export default class Carousel extends React.Component<CarouselProps> {
  private prefix = `${ROOT_PREFIX}-carousel`

  render() {
    const { ...rest } = this.props
    return (
      <View config={{...rest, prefix: this.prefix}}>开发中...</View>
    )
  }
}
