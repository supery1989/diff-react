import * as React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import omit from 'omit.js'
import { throttle } from 'throttle-debounce'
import View, { ROOT_PREFIX } from 'libs/view'
import Icon from 'components/icon'

export interface CarouselProps {
  className?: string
  style?: object
  height: number
  interval: number
  autoplay: boolean
  initialIndex: number
  type: 'card' | 'flatcard' | ''
  indicator: 'in' | 'out' | 'none'
  trigger: 'click' | 'hover'
  arrow: 'always' | 'hover' | 'never'
  dot: boolean
  onChange?: (prevIndex: number, currentIndex: number) => void
}

export default class Carousel extends React.Component<CarouselProps> {
  private prefix = `${ROOT_PREFIX}-carousel`
  static defaultProps = {
    height: 300,
    interval: 3000,
    autoplay: true,
    initialIndex: 0,
    type: '',
    indicator: 'in',
    trigger: 'hover',
    arrow: 'always',
    dot: false
  }
  static childContextTypes = {
    component: PropTypes.any
  }
  static Item: any
  timer: any = null
  state: any

  constructor(props: CarouselProps) {
    super(props)
    this.state = {
      activeIndex: -1,
      items: [],
      hover: false
    }
  }

  componentDidMount() {
    const { initialIndex } = this.props
    const { items } = this.state
    if (initialIndex < items.length && initialIndex >= 0) {
      this.setState({ activeIndex: initialIndex })
    }
    this.startTimer()
  }

  componentDidUpdate(props: CarouselProps, state: any) {
    if (state.activeIndex !== this.state.activeIndex) {
      this.resetItemPosition(state.activeIndex)
      const { onChange } = this.props
      onChange && onChange(this.state.activeIndex, state.activeIndex)
    }
  }

  componentWillUnmount() {
    this.stopTimer()
  }

  getChildContext() {
    return {
      component: this
    }
  }

  handleMouserEnter() {
    this.setState({ hover: true })
    this.stopTimer()
  }

  handleMouserLeave() {
    this.setState({ hover: false })
    this.startTimer()
  }

  handleIndicatorClick(index: number) {
    this.setState({ activeIndex: index })
  }

  handleIndicatorHover = throttle(300, (index: number) => {
    const { trigger } = this.props
    const { activeIndex } = this.state
    if (trigger === 'hover' && index !== activeIndex) {
      this.setState({ activeIndex: index })
    }
  })

  handleArrowClick = throttle(300, () => {
    const { activeIndex } = this.state
    this.setActiveItem(activeIndex - 1)
  })

  resetItemPosition(oldIndex: number) {
    this.state.items.forEach((item: any, index: number) => {
      item.translateItem(index, this.state.activeIndex, oldIndex)
    })
  }

  addItem(item: any) {
    this.state.items.push(item)
    this.setActiveItem(0)
  }

  removeItem(item: any) {
    this.state.items.splice(this.state.items.indexOf(item), 1)
    this.setActiveItem(0)
  }

  setActiveItem(index: number) {
    let { activeIndex } = this.state
    let len = this.state.items.length
    if (index < 0) {
      activeIndex = len -1
    } else if (index >= activeIndex) {
      activeIndex = 0
    } else {
      activeIndex = index
    }
    this.setState({ activeIndex })
  }

  play() {
    let { activeIndex } = this.state
    if (activeIndex < this.state.items.length - 1) {
      activeIndex++
    } else {
      activeIndex = 0
    }
    this.setState({ activeIndex })
  }

  stopTimer() {
    clearInterval(this.timer)
  }

  startTimer() {
    const { interval, autoplay } = this.props
    if (interval < 0 || !autoplay) {
      return
    }
    this.timer = setInterval(this.play.bind(this), interval)
  }

  isCard() {
    const { type } = this.props
    if (type) {
      return type === 'card' || type === 'flatcard'
    }
    return false
  }

  prev() {
    this.setActiveItem(this.state.activeIndex - 1)
  }

  next() {
    this.setActiveItem(this.state.activeIndex + 1)
  }

  renderArrow(type: string) {
    const { arrow } = this.props
    const { hover } = this.state
    if (arrow === 'always' || (arrow === 'hover' && hover)) {
      return <Icon
        type={`${type}circle-o`}
        className={`${this.prefix}-arrow-${type}`}
        onClick={this.handleArrowClick.bind(this)}
      />
    }
    return null
  }

  // 渲染指示器
  renderIndicator(indicator: string, dot: boolean) {
    const cls = classnames(`${this.prefix}-indicator`, {
      [`${this.prefix}-indicator-${indicator}`]: indicator,
      [`${this.prefix}-indicator-dot`]: dot
    })
    const { items, activeIndex } = this.state
    return (
      <ul className={cls}>
        {
          items.map((item: any, index: number) => {
            return <li
              key={`indicator${index}`}
              className={classnames(`${this.prefix}-indicator-item`, {[`${this.prefix}-indicator-active`]: index === activeIndex })}
              onClick={this.handleIndicatorClick.bind(this, index)}
              onMouseEnter={this.handleIndicatorHover.bind(this, index)}
            ><i className={`${this.prefix}-indicator-btn`} /></li>
          })
        }
      </ul>
    )
  }

  render() {
    const { height, indicator, dot, children, ...rest } = this.props
    const viewProps = omit(rest, ['autoplay', 'interval', 'initialIndex', 'props', 'trigger', 'arrow', 'type', 'onChange'])
    return (
      <View config={{...viewProps, prefix: this.prefix}} onMouseEnter={this.handleMouserEnter.bind(this)} onMouseLeave={this.handleMouserLeave.bind(this)}>
        <div className={`${this.prefix}-wrapper`} style={{ height: height }}>
          {this.renderArrow('left')}
          {this.renderArrow('right')}
          {children}
        </div>
        {indicator !== 'none' && this.renderIndicator(indicator, dot)}
      </View>
    )
  }
}
