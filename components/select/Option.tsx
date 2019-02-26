import * as React from 'react'
import classnames from 'classnames'
import omit from 'omit.js'
import View, { ROOT_PREFIX } from 'libs/view'
import Icon from 'components/icon'

export interface OptionProps {
  className?: string,
  style?: object,
  value: number | string,
  disabled?: boolean,
  // 以下通过父组件获取
  onSelect?: (value: number | string, label: any) => void,
  selected: any,
  multiple: boolean,
}

export default class Option extends React.Component<OptionProps> {
  private prefix = `${ROOT_PREFIX}-select-option`
  static defaultProps = {
    value: ''
  }

  handleClick() {
    const { value, onSelect, children } = this.props
    onSelect && onSelect(value, children)
  }

  isSelected() {
    const { multiple, value, selected } = this.props
    if (multiple) {
      return selected.some((item : any) => item.value === value)
    }
    return value === selected
  }

  render() {
    const { children, disabled, multiple, ...rest } = this.props
    const viewProps = omit(rest, ['onSelect', 'value', 'selected', 'multiple'])
    const cls = classnames({
      [`${this.prefix}-selected`]: this.isSelected(),
      [`${this.prefix}-disabled`]: disabled,
    })
    return (
      <View config={{...viewProps, prefix: this.prefix, cls}} onClick={this.handleClick.bind(this)}>
        {children}
        {multiple && this.isSelected() && <Icon type='check' className={`${this.prefix}-check`} />}
      </View>
    )
  }
}
