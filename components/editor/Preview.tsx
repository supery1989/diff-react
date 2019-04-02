import * as React from 'react'
// import classnames from 'classnames'
// import omit from 'omit.js'
// import { ROOT_PREFIX } from 'libs/view'
// import Button from 'components/button'

export interface PreviewProps {
  className?: string
  style?: object
}

export default class Preview extends React.Component<PreviewProps> {
  // private prefix = `${ROOT_PREFIX}-preview`

  render() {
    // const { ...rest } = this.props
    return (
      <div>预览</div>
    )
  }
}
