import * as React from 'react'
import View, { ROOT_PREFIX } from '../../libs/view'

export interface ButtonGroupProps {
  className?: string
  style?: object
  size?: 'large' | 'small',
}

export default class ButtonGroup extends React.Component<ButtonGroupProps> {
  private prefix = `${ROOT_PREFIX}-button-group`

  render() {
    const { size, children, ...rest } = this.props
    return (
      <View config={{...rest, prefix: this.prefix}}>
        {React.Children.map(children, (element: any) => {
          return React.cloneElement(element, Object.assign({}, {
            size
          }, element.props));
        })}
      </View>
    )
  }
}
