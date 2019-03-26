
import * as React from 'react'
import View from 'libs/view'

interface FooterProps {
  className?: string,
  style?: object,
}

class Footer extends React.Component<FooterProps> {
  public prefix = 'diff-layout-footer'
  constructor(props: FooterProps) {
    super(props)
  }

  render() {
    const { children, ...rest } = this.props
    return (
      <View config={{...rest, prefix: this.prefix}}>{children}</View>
    )
  }
}

export default Footer
