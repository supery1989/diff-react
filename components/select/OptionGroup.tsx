import * as React from 'react'
// import classnames from 'classnames'
import omit from 'omit.js'
import View, { ROOT_PREFIX } from 'libs/view'

export interface OptionGroupProps {
  className?: string,
  style?: object,
  label?: string,
  // 以下通过父组件传入
  selected: any,
  multiple: boolean,
  onSelect: (value: any, label: any) => void
}

export default class OptionGroup extends React.Component<OptionGroupProps> {
  private prefix = `${ROOT_PREFIX}-select-group`

  renderOption(component: any) {
    if (!component) {
      return null
    }
    const { selected, multiple, onSelect } = this.props
    return React.cloneElement(component, {
      ...component.props,
      selected,
      multiple,
      onSelect
    })
  }

  render() {
    const { label, children, ...rest } = this.props
    const viewProps = omit(rest, ['selected', 'multiple', 'onSelect'])
    return (
      <View config={{...viewProps, prefix: this.prefix}}>
        <div className={`${this.prefix}-title`}>{label}</div>
        {React.Children.map(children, this.renderOption.bind(this))}
      </View>
    )
  }
}
