
import * as React from 'react'
import View, { ROOT_PREFIX } from '../../libs/view'

export interface HeaderProps {
  className?: string,
  style?: object,
}

class Header extends React.Component<HeaderProps> {
  public prefix = `${ROOT_PREFIX}-layout-header`
  constructor(props: HeaderProps) {
    super(props);
  }

  render() {
    const { children, ...rest } = this.props
    return (
      <View config={{...rest, prefix: this.prefix}}>{children}</View>
    )
  }
}

export default Header
