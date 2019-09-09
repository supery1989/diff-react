import * as React from 'react'
import classnames from 'classnames'
import omit from 'omit.js'
import addEventListener from 'add-dom-event-listener'
import raf from 'raf'
import View, { ROOT_PREFIX } from '../../libs/view'
import Button from '../button'

export interface BackTopProps {
  className?: string,
  style?: object,
  during?: number,
  showBelow?: number,
  target?: string,
  useAnimate?: boolean,
  onClick?: React.MouseEventHandler<HTMLAnchorElement>,
  icon?: string,
  rectangle?: boolean,
  fixed?: boolean,
}

// 动画效果
const EaseInOutAnimate = (t: any, b: any, c: any, d: any) => {
  const cc = c - b
  t /= d / 2
  if (t < 1) {
      return cc / 2 * t * t * t + b
  } else {
      return cc / 2 * ((t -= 2) * t * t + 2) + b
  }
}

export default class Temp extends React.Component<BackTopProps> {
  private prefix = `${ROOT_PREFIX}-back-top`
  static defaultProps = {
    during: 450,
    showBelow: 100,
    fixed: true,
    useAnimate: true
  };

  state: any;

  scrollEvent: any

  constructor(props: BackTopProps) {
    super(props);
    this.state = {
        show: false,
        compStyle: {}
    };
  }

  getCurrentScrollTop() {
    const targetNode = this.getTarget()
    if (targetNode === window) {
      return window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop
    }
    return (targetNode as HTMLElement).scrollTop
  }

  getTarget() {
    if (this.props.target) {
      return document.getElementById(this.props.target)
    } else {
      return window
    }
  }

  move2Top = (e: any) => {
    const scrollTop = this.getCurrentScrollTop()
    const startScrollTime = Date.now()
    const run = () => {
      const runStartTime = Date.now()
      const timestamp = runStartTime - startScrollTime
      if (this.props.useAnimate) {
        this.setScrollTop(EaseInOutAnimate(timestamp, scrollTop, 0, this.props.during))
      } else {
        this.setScrollTop(0);
      }
      if (timestamp < (this.props.during as number)) {
        raf(run)
      }
    }
    raf(run)
    if(this.props.onClick){
      this.props.onClick(e)
    }
  }

  setScrollTop(value: number) {
    const targetNode = this.getTarget()
    if (targetNode === window) {
      document.body.scrollTop = value
      document.documentElement.scrollTop = value
    } else {
      (targetNode as HTMLElement).scrollTop = value
    }
  }

  handleScroll = () => {
    const { showBelow } = this.props
    const h = this.getCurrentScrollTop()
    this.setState({
      show: h >= (showBelow as number)
    })
  }

  componentDidMount() {
    const targetNode = this.getTarget()
    if (targetNode === window) {
      this.setState({
        compStyle: {
          right: '-20px',
          bottom: '-50px',
        }
      })
    } else {
      const domH = (targetNode as HTMLElement).offsetHeight + (targetNode as HTMLElement).offsetTop
      const domW = (targetNode as HTMLElement).offsetLeft + (targetNode as HTMLElement).offsetWidth
      this.setState({
        compStyle: {
          top: `${domH - 20 - 45}px`,
          left: `${domW - 20 - 45}px`
        }
      })
    }
    this.scrollEvent = addEventListener(targetNode, 'scroll', this.handleScroll)
    this.handleScroll()
  }

  componentWillUnmount() {
    if (this.scrollEvent) {
      this.scrollEvent.remove()
    }
  }

  render() {
    const { children, target, icon, rectangle, fixed, ...rest } = this.props;
    const cls = classnames({
        [`${this.prefix}-has-target`]: target,
        [`${this.prefix}-not-fixed`]: !fixed
    })
    const viewProps = omit(rest, ['target', 'useAnimate', 'during', 'showBelow', 'rectangle', 'fixed', 'icon'])

    const defaultComp = (
        <Button circle={!rectangle} icon={icon || "totop"} type="primary" className={`${this.prefix}-button`} size="large" />
    )
    if (!this.state.show) {
      return null;
    }
    return (
      <View config={{...viewProps, prefix: this.prefix, cls}} onClick={this.move2Top}>{children || defaultComp}</View>
    );
  }
}
