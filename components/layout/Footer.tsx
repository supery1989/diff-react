
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
    return (
      <View config={{...this.props, prefix: this.prefix}} />
    )
  }
}

export default Footer
