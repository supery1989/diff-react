import * as React from 'react'
import classnames from 'classnames';

export interface ViewProps {
  config?: any,
  tag?: any,
  onClick?: React.MouseEventHandler,
  onChange?: React.MouseEventHandler,
  onBlur?: React.MouseEventHandler,
  onFocus?: React.MouseEventHandler,
  onMouseEnter?: React.MouseEventHandler,
  onMouseLeave?: React.MouseEventHandler,
  onKeyDown?: React.MouseEventHandler,
  onMouseUp?: React.MouseEventHandler,
}

export const ROOT_PREFIX = 'diff'

export default class View extends React.Component<ViewProps>{
  onClick = (e: any) => {
    // e.persist()
    const { onClick } = this.props;
    if (onClick) {
      onClick(e)
    }
  }

  onChange = (e: any) => {
    // e.persist()
    const { onChange } = this.props;
    if (onChange) {
      onChange(e)
    }
  }

  onMouseLeave = (e: any) => {
    // e.persist()
    const { onMouseLeave } = this.props;
    if (onMouseLeave) {
      onMouseLeave(e)
    }
  }

  onMouseEnter = (e: any) => {
    // e.persist()
    const { onMouseEnter } = this.props;
    if (onMouseEnter) {
      onMouseEnter(e)
    }
  }

  onMouseUp = (e: any) => {
    const { onMouseUp } = this.props
    onMouseUp && onMouseUp(e)
  }

  onBlur = (e: any) => {
    const { onBlur } = this.props
    onBlur && onBlur(e)
  }

  onFocus(e: any) {
    const { onFocus } = this.props
    onFocus && onFocus(e)
  }

  onKeyDown = (e: any) => {
    const { onKeyDown } = this.props
    onKeyDown && onKeyDown(e)
  }

  render() {
    const { config, tag, children } = this.props
    const { prefix, className, style, cls, sty, ...rest } = config
    const viewCls = classnames(prefix, cls, className)
    const viewStyle = {
      ...style,
      ...sty
    }
    const Comp = tag ? tag : 'div';
    return (
      <Comp
        className={viewCls}
        style={viewStyle}
        {...rest}
        ref='viewRef'
        onMouseLeave={this.onMouseLeave}
        onMouseEnter={this.onMouseEnter}
        onClick={this.onClick}
        onKeyDown={this.onKeyDown}
        onMouseUp={this.onMouseUp}
        onChange={this.onChange}
        onBlur={this.onBlur}
        onFocus={this.onFocus.bind(this)}
      >{children}</Comp>
    )
  }
}
