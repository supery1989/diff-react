import * as React from 'react'
import classnames from 'classnames';

export interface ViewProps {
  config?: any,
  tag?: any,
  onClick?: React.MouseEventHandler,
  onMouseEnter?: React.MouseEventHandler,
  onMouseLeave?: React.MouseEventHandler,
}

export default class View extends React.Component<ViewProps>{
  onClick = (e: any) => {
    const { onClick } = this.props;
    if (onClick) {
      onClick(e)
    }
  }

  onMouseLeave = (e: any) => {
    const { onMouseLeave } = this.props;
    if (onMouseLeave) {
      onMouseLeave(e)
    }
  }

  onMouseEnter = (e: any) => {
    const { onMouseEnter } = this.props;
    if (onMouseEnter) {
      onMouseEnter(e)
    }
  }

  render() {
    const { config, tag, children } = this.props
    const { prefix, className, style, cls, sty, ...rest } = config
    const viewCls = classnames(prefix, className, cls)
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
        onMouseLeave={this.onMouseLeave}
        onMouseEnter={this.onMouseEnter}
        onClick={this.onClick}
      >{children}</Comp>
    )
  }
}
