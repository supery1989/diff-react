import * as React from 'react'
import omit from 'omit.js'
import View, { ROOT_PREFIX } from '../../libs/view'

export interface IconProps {
  className?: string,
  style?: object,
  type?: string,
  spin?: boolean,
  onClick?: React.MouseEventHandler,
}

export default class Icon extends React.Component<IconProps> {
  private prefix = `${ROOT_PREFIX}-icon`
  constructor(props: IconProps) {
    super(props);
  }

  handleClick = (e: any) => {
    const { onClick } = this.props;
    if (onClick) {
      onClick(e)
    }
  }

  render() {
    const { type, spin, ...rest } = this.props
    const cls = {
      [`${this.prefix}-${type}`]: type,
      [`${this.prefix}-spin`]: spin
    }
    const viewProps = omit(rest, ['onClick'])
    return (
      <View config={{...viewProps, prefix: this.prefix, cls}} onClick={this.handleClick} tag='i' />      
    )
  }
}
