// TODO ghost 竖排
import * as React from 'react'
import classnames from 'classnames'
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
}

export default class Button extends React.Component<ButtonProps> {
  private prefix = 'diff-button';
  static defaultProps = {
    loading: false,
    type: 'default'
  };

  handleClick = (e: any) => {
    e.preventDefault();
    if (this.props.type === 'link') {
      if (this.props.href) {
        if (this.props.target === '_blank') {
          window.open(this.props.href);
        } else {
          window.location.href = this.props.href;
        }
      }
    }
    if (!this.props.loading && !this.props.disabled) {
      const onClick = this.props.onClick;
      if (onClick) {
        onClick(e);
      }
    }
  }

  handleMouseLeave = (e: any) => {
    if (this.props.onMouseLeave) {
      this.props.onMouseLeave(e);
    }
  }

  render() {
    const { type, text, disabled, size, plain, round, circle, icon, loading, nativeType, ...rest } = this.props;
    const type1 = type ? type : 'default';
    const cls = classnames({
      [`${this.prefix}-${type1}`]: type1,
      [`${this.prefix}-${size}`]: size,
      [`${this.prefix}-plain`]: plain,
      [`${this.prefix}-round-${round}`]: round,
      [`${this.prefix}-circle`]: circle,
      [`${this.prefix}-disabled`]: disabled,
      [`${this.prefix}-loading`]: loading
    });
    const Comp = type1 === 'link' ? 'a' : 'button';
    const iconStr  = icon ? icon : '';
    const iconType = loading ? 'spinner' : iconStr;
    const iconSpin = loading ? true : false;
    const IconComp = icon || loading ? <Icon type={iconType} spin={iconSpin} /> : null;
    const text1 = text ? text : '';
    const text2 = icon || loading ? `  ${text1}` : text1;

    return (
      <View config={{...rest, prefix: this.prefix, tag: Comp, cls, type: nativeType}} onClick={this.handleClick} onMouseLeave={this.handleMouseLeave}>{IconComp}{text2}</View>
    )
  }
}
