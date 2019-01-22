// TODO ghost 竖排
import * as React from 'react'
import classnames from 'classnames'
import omit from 'omit.js'
import View from '../../libs/view'
import Icon from '../icon'

export interface ButtonProps {
  className?: string,
  style?: object,
  loading?: boolean,
  ghost?: boolean,
  type?: 'default' | 'primary' | 'success' | 'info' | 'warning' | 'danner' | 'link',
  href?: string,
  target?: '' | '_blank',
  disabled?: boolean,
  onClick?: React.MouseEventHandler,
  onMouseLeave?: React.MouseEventHandler,
  text?: string,
  size?: 'large' | 'small',
  plain?: boolean,
  round?: boolean,
  circle?: boolean,
  icon?: string,
  nativeType?: 'submit' | 'reset',
  block?: boolean,
  during?: number
}

export default class Button extends React.Component<ButtonProps> {
  private prefix = 'diff-button'
  timer: any
  state: any
  static defaultProps = {
    loading: false,
    type: 'default',
    round: true,
    disabled: false
  }

  constructor(props: ButtonProps) {
    super(props)
    this.state = {
      sec: -1,
      disabled: props.disabled,
      during: props.during
    }
  }

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer)
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
    const { loading } = this.props
    const { during, disabled } = this.state
    if (loading || disabled) {
      return
    }
    if (during) {
      this.setState({
        sec: during,
        disabled: true
      }, () => {
        this.timer = setInterval(() => {
          if (this.state.sec < 2) {
            clearInterval(this.timer)
            this.setState({
              disabled: false,
              sec: -1,
              during: 0,
            })
            return
          }
          this.setState({
            sec: this.state.sec - 1,
          })
        }, 1000)
      })
    } else {
      this.clickFn(e)
    }
  }

  handleMouseLeave = (e: any) => {
    if (this.props.onMouseLeave) {
      this.props.onMouseLeave(e);
    }
  }

  render() {
    const { type, text, size, plain, round, circle, icon, loading, nativeType, block, during, ...rest } = this.props
    const { sec, disabled } = this.state
    const viewProps = omit(rest, 'during', 'disabled')
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
    const text1 = text ? text : ''
    const text2 = sec > 0 ? `${sec}秒后${text1}` : text1
    const text3 = icon || loading ? ` ${text2}` : text2

    return (
      <View config={{...viewProps, prefix: this.prefix, tag: Comp, cls, type: nativeType}} onClick={this.handleClick} onMouseLeave={this.handleMouseLeave}>{IconComp}{text3}</View>
    )
  }
}
