import * as React from 'react'
import classnames from 'classnames'
import omit from 'omit.js'
import View, { ROOT_PREFIX } from '../../libs/view'
import Icon from '../icon'

export interface OptionProps {
  className?: string,
  style?: object,
  value: number | string,
  disabled?: boolean,
  label?: string,
  // 以下通过父组件获取
  onSelect?: (value: number | string, label: any) => void,
  selected: any,
  multiple: boolean,
  initValue: any
}

export default class Option extends React.Component<OptionProps> {
  private prefix = `${ROOT_PREFIX}-select-option`
  static defaultProps = {
    value: ''
  }

  componentDidMount() {
    const { initValue, value, children, onSelect, label } = this.props
    if (initValue === value) {
      onSelect && onSelect(value, label || children)
    }
  }

  handleClick() {
    const { value, onSelect, children, label } = this.props
    onSelect && onSelect(value, label || children)
  }

  isSelected() {
    const { multiple, value, selected } = this.props
    if (multiple) {
      return selected.some((item : any) => item.value === value)
    }
    return value === selected
  }

  render() {
    const { children, disabled, multiple, label, ...rest } = this.props
    const viewProps = omit(rest, ['onSelect', 'value', 'selected', 'multiple', 'initValue'])
    const cls = classnames({
      [`${this.prefix}-selected`]: this.isSelected(),
      [`${this.prefix}-disabled`]: disabled,
    })
    return (
      <View config={{...viewProps, prefix: this.prefix, cls}} onClick={this.handleClick.bind(this)}>
        {label || children}
        {multiple && this.isSelected() && <Icon type='check' className={`${this.prefix}-check`} />}
      </View>
    )
  }
}
