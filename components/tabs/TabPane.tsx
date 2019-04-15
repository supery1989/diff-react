import * as React from 'react'
import omit from 'omit.js'
import View, { ROOT_PREFIX } from 'libs/view'

export interface TempProps {
  className?: string
  style?: object
  label?: string | React.ReactNode
  name?: string
  disabled?: boolean
  closable?: boolean
}

export default class TabsPane extends React.Component<TempProps> {
  private prefix = `${ROOT_PREFIX}-tabs-pane`

  render() {
    const { children, ...rest } = this.props
    const viewProps = omit(rest, ['label', 'name', 'disabled', 'closable'])
    return (
      <View config={{...viewProps, prefix: this.prefix}}>{children}</View>
    )
  }
}
