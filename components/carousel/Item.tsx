import * as React from 'react'
import * as ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import View, { ROOT_PREFIX } from 'libs/view'

export interface CarouselItemProps {
  className?: string
  style?: object
}

export default class CarouselItem extends React.Component<CarouselItemProps> {
  private prefix = `${ROOT_PREFIX}-carousel-item`
  static contextTypes = {
    component: PropTypes.any
  }
  state: any

  constructor(props: CarouselItemProps) {
    super(props)
    this.state = {
      active: false,
      translate: 0,
      ready: false,
      animating: false,
      scale: 1,
      inStage: false
    }
  }

  componentDidMount() {
    this.parent().addItem(this)
  }

  componentWillUnmount() {
    this.parent().removeItem(this)
  }

  isFlat() {
    return this.parent().props.type === 'flatcard'
  }

  cardScale() {
    return this.isFlat() ? 1 : 0.83
  }

  processIndex(index: number, activeIndex: number, length: number) {
    if (activeIndex === 0 && index === length - 1) {
      return -1
    } else if (activeIndex === length - 1 && index === 0) {
      return length
    } else if (index < activeIndex - 1 && activeIndex - index >= length / 2) {
      return length + 1
    } else if (index > activeIndex + 1 && index - activeIndex >= length / 2) {
      return -2
    }
    return index
  }

  calculateTranslate(index: number, activeIndex: number, parentWidth: number): number {
    const denominator = this.isFlat() ? 3.75 : 4
    if (this.state.inStage) {
      return parentWidth * ((2 - this.cardScale()) * (index - activeIndex) + 1) / denominator
    } else if (index < activeIndex) {
      return -(1 + this.cardScale()) * parentWidth / denominator
    } else {
      return (denominator - 1 + this.cardScale()) * parentWidth / denominator
    }
  }

  translateItem(index: number, activeIndex: number, oldIndex: number) {
    const parent = ReactDOM.findDOMNode(this.parent()) as HTMLElement
    const parentWidth = parent.offsetWidth
    const len = this.parent().state.items.length
    if (!this.parent().isCard() && oldIndex !== undefined) {
      this.state.animating = index === activeIndex || index === oldIndex
    }
    if (index !== activeIndex && len > 2) {
      index = this.processIndex(index, activeIndex, len)
    }
    if (this.parent().isCard()) {
      this.state.inStage = Math.round(Math.abs(index - activeIndex)) <= 1
      this.state.active = index === activeIndex
      this.state.translate = this.calculateTranslate(index, activeIndex, parentWidth)
      this.state.scale = this.state.active ? 1 : this.cardScale()
    } else {
      this.state.active = index === activeIndex
      this.state.translate = parentWidth * (index - activeIndex)
    }
    this.state.ready = true
    this.forceUpdate()
  }

  parent() {
    return this.context.component
  }

  render() {
    const { children, ...rest } = this.props
    const { translate, animating, active, ready, scale, inStage } = this.state
    const sty = { transform: `translateX(${translate}px) scale(${scale})` }
    const cls = classnames({
      [`${this.prefix}-animating`]: animating,
      [`${this.prefix}-card`]: this.parent().isCard(),
      [`${this.prefix}-stage`]: inStage,
      [`${this.prefix}-active`]: active,
    })
    if (ready) {
      return (
        <View config={{...rest, prefix: this.prefix, cls, sty}}>
          {children}
        </View>
      )
    }
    return null
  }
}
