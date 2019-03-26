import * as React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import omit from 'omit.js'
import View, { ROOT_PREFIX } from 'libs/view'

export interface CheckboxProps {
  className?: string,
  style?: object,
  value?: string | boolean,
  label?: string,
  checked?: boolean,
  disabled?: boolean,
  group?: boolean,
  min?: number,
  max?: number,
  indeterminate?: boolean,
  fill?: string,
  color?: string,
  type?: 'button',
  buttonStyle?: 'solid' | 'outline',
  circle?: boolean,
  onChange?: (value: any, checked?: boolean) => void
}

export default class Checkbox extends React.Component<CheckboxProps> { 
  private prefix = `${ROOT_PREFIX}-checkbox`
  static Group: any
  static Button: any
  static Indeterminate: any
  static defaultProps = {
    checked: false,
    disabled: false
  }
  static contextTypes = {
    childCheckedValues: PropTypes.array
  }
  state: any

  constructor(props: CheckboxProps) {
    super(props)
    this.state = {
      checked: props.checked
    }
  }

  componentWillReceiveProps(nextProps: CheckboxProps) {
    if (this.state.checked !== nextProps.checked) {
      this.setState({
        checked: nextProps.checked
      })
    }
  }

  onChange(e: any) {
    const { onChange, value, group, min, max } = this.props
    const checked = e.target.checked
    const values = this.context.childCheckedValues

    if (group) {
      const len = values.length + (checked ? 1 : -1)
      if (min !== undefined && min > len) {
        return
      }
      if (max !== undefined && max < len) {
        return
      }
    }
    this.setState({
      checked
    }, () => {
      if (group) {
        onChange && onChange(value, checked)
      } else {
        onChange && onChange(checked ? value : '')
      }
    })
  }

  render() {
    const { children, value, className, disabled, label, indeterminate, style, fill, color, type, buttonStyle, circle, ...rest } = this.props
    const viewProps = omit(rest, ['value', 'checked', 'onChange', 'group', 'min', 'max', 'style', 'circle'])
    const { checked } = this.state
    const wrapperCls = classnames(className, `${this.prefix}-wrapper`, {
      [`${this.prefix}-wrapper-disabled`]: !!disabled,
      [`${this.prefix}-wrapper-${type}`]: !!type,
      [`${this.prefix}-wrapper-${type}-checked`]: !!type && checked,
      [`${this.prefix}-wrapper-${type}-disabled`]: !!type && disabled,
      [`${this.prefix}-wrapper-${type}-solid`]: !!type && buttonStyle === 'solid',
      [`${this.prefix}-wrapper-circle`]: !!circle
    })
    const cls = classnames(this.prefix, `${this.prefix}-box`, {
      [`${this.prefix}-${type}`]: !!type,
      [`${this.prefix}-checked`]: !!checked,
      [`${this.prefix}-disabled`]: !!disabled,
      [`${this.prefix}-indeterminate`]: !!indeterminate,
    })
    let innerStyle = {}
    let labelStyle = {}
    let wrapperStyle = {}
    if (fill && checked) {
      if (type === 'button') {
        wrapperStyle = {
          borderColor: fill,
          backgroundColor: fill,
          color: '#fff',
          boxShadow: `-1px 0 0 0 ${fill}`
        }
      } else {
        innerStyle = {
          borderColor: fill,
          backgroundColor: fill
        }
      }
    }
    if (color && checked) {
      labelStyle = {
        color
      }
    }
    const labelValue = label || children || value || ''
    return (
      <label className={wrapperCls} style={{ ...style, ...wrapperStyle }}>
        <span className={cls}>
          <span className={`${this.prefix}-inner`} style={innerStyle} />
          <View config={{...viewProps, cls: `${this.prefix}-input`, type: 'checkbox', checked, disabled }} tag='input' onChange={this.onChange.bind(this)} />
        </span>
        {labelValue && <span className={`${this.prefix}-label`} style={labelStyle}>{labelValue}</span>}
      </label>
    );
  }
}
