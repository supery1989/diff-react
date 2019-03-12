// TODO ghost 竖排
import * as React from 'react'
import classnames from 'classnames'
import omit from 'omit.js'
import View from '../../libs/view'
import Icon from 'components/icon'
import CountDown from 'components/countdown'

export interface ButtonProps {
  className?: string,
  style?: object,
  loading?: boolean,
  ghost?: boolean,
  type?: 'default' | 'primary' | 'success' | 'info' | 'warning' | 'danger' | 'link',
  href?: string,
  target?: '' | '_blank',
  disabled?: boolean,
  onClick?: React.MouseEventHandler,
  onMouseLeave?: React.MouseEventHandler,
  onMouseEnter?: React.MouseEventHandler,
  text?: string,
  size?: 'large' | 'small',
  plain?: boolean,
  round?: boolean,
  circle?: boolean,
  icon?: string,
  iconPosition?: 'left' | 'right',
  nativeType?: 'submit' | 'reset',
  block?: boolean,
  during?: number,
  initDuring?: boolean
}

export default class Button extends React.Component<ButtonProps> {
  private prefix = 'diff-button'
  static Group: any
  timer: any
  state: any
  static defaultProps = {
    loading: false,
    type: 'default',
    round: true,
    iconPosition: 'left',
    disabled: false
  }

  constructor(props: ButtonProps) {
    super(props)
    this.state = {
      disabled: props.disabled,
      during: 0
    }
  }

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer)
    }
  }

  componentDidMount() {
    const { initDuring, during } = this.props
    if (during && initDuring) {
      this.countStart(during)
    }
  }

  clickFn = (e: any) => {
    if (this.props.type === 'link') {
      if (this.props.href) {
        if (this.props.target === '_blank') {
          window.open(this.props.href);
        } else {
          window.location.href = this.props.href;
        }
      }
    }
    const { onClick } = this.props
    if (onClick) {
      onClick(e)
    }
  }

  handleClick = (e: any) => {
    e.preventDefault()
    const { loading, during } = this.props
    const { disabled } = this.state
    if (loading || disabled) {
      return
    }
    if (during) {
      this.countStart(during)
    } else {
      this.clickFn(e)
    }
  }

  handleMouseLeave = (e: any) => {
    if (this.props.onMouseLeave) {
      this.props.onMouseLeave(e);
    }
  }

  handleMouseEnter = (e: any) => {
    if (this.props.onMouseEnter) {
      this.props.onMouseEnter(e);
    }
  }

  countStart(during: number) {
    this.setState({
      during,
      disabled: true
    })
  }

  countEnd() {
    this.setState({
      during: 0,
      disabled: false
    })
  }

  renderText() {
    const { text, loading, icon, iconPosition, children } = this.props
    const { during } = this.state
    const leftSpace = (loading || (icon && iconPosition === 'left')) ? ' ' : ''
    const rightSpace = icon && iconPosition === 'right' ? ' ' : ''
    const title = text || children || ''
    if (during && during > 0) {
      return (
        <span>
          {leftSpace}
          <CountDown during={during} onEnd={this.countEnd.bind(this)} />
          秒后{title}
          {rightSpace}
        </span>
      )
    }
    return `${leftSpace}${title}${rightSpace}`
  }

  renderContent(IconComp: any) {
    if (IconComp) {
      const { iconPosition } = this.props
      if (iconPosition === 'right') {
        return <span>{this.renderText()}{IconComp}</span>
      }
      return <span>{IconComp}{this.renderText()}</span>
    }
    return this.renderText()
  }

  render() {
    const { type, size, plain, round, circle, icon, loading, nativeType, block, ...rest } = this.props
    const { disabled } = this.state
    const viewProps = omit(rest, ['during', 'disabled', 'onMouseEnter', 'onMouseLeave', 'onClick', 'text', 'iconPosition', 'initDuring'])
    const type1 = type ? type : 'default';
    const cls = classnames({
      [`${this.prefix}-${type1}`]: type1,
      [`${this.prefix}-${size}`]: size,
      [`${this.prefix}-plain`]: plain,
      [`${this.prefix}-round`]: round,
      [`${this.prefix}-circle`]: circle,
      [`${this.prefix}-disabled`]: disabled,
      [`${this.prefix}-loading`]: loading,
      [`${this.prefix}-block`]: block
    });
    const Comp = type1 === 'link' ? 'a' : 'button'
    const iconStr  = icon ? icon : ''
    const iconType = loading ? 'loading' : iconStr
    const iconSpin = loading ? true : false
    const IconComp = icon || loading ? <Icon type={iconType} spin={iconSpin} /> : null

    return (
      <View config={{...viewProps, prefix: this.prefix, tag: Comp, cls, type: nativeType}} onClick={this.handleClick} onMouseLeave={this.handleMouseLeave} onMouseEnter={this.handleMouseEnter}>
        {this.renderContent(IconComp)}
      </View>
    )
  }
}
