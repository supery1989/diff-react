import * as React from 'react'
import classnames from 'classnames'
import omit from 'omit.js'
import View, { ROOT_PREFIX } from '../../libs/view'

export interface RadioProps {
  className?: string,
  style?: object,
  value?: string | number | boolean,
  label?: string,
  checked?: boolean,
  disabled?: boolean,
  fill?: string,
  color?: string,
  type?: 'button',
  circle?: boolean,
  buttonStyle?: 'solid' | 'outline',
  onChange?: (value: any) => void
}

export default class Radio extends React.Component<RadioProps> {
  private prefix = `${ROOT_PREFIX}-radio`
  static Group: any
  static Button: any
  static defaultProps = {
    checked: false,
    disabled: false
  }
  state: any

  constructor(props: RadioProps) {
    super(props)
    this.state = {
      checked: props.checked
    }
  }

  componentWillReceiveProps(nextProps: RadioProps) {
    if (this.state.checked !== nextProps.checked) {
      this.setState({
        checked: nextProps.checked
      })
    }
  }

  handleChange() {
    const { onChange, value } = this.props
    onChange && onChange(value)
  }

  render() {
    const { children, value, disabled, className, fill, color, type, buttonStyle, label, style, circle, ...rest } = this.props
    const viewProps = omit(rest, ['checked', 'onChange', 'disabled', 'className', 'style'])
    const { checked } = this.state
    const wrapperCls = classnames(className, `${this.prefix}-wrapper`, {
      [`${this.prefix}-wrapper-${type}`]: !!type,
      [`${this.prefix}-wrapper-${type}-checked`]: !!type && checked,
      [`${this.prefix}-wrapper-${type}-disabled`]: !!type && disabled,
      [`${this.prefix}-wrapper-circle`]: !!circle,
      [`${this.prefix}-wrapper-${type}-solid`]: !!type && buttonStyle === 'solid',
    })
    const cls = classnames(this.prefix, `${this.prefix}-box`, {
      [`${this.prefix}-${type}`]: !!type,
      [`${this.prefix}-checked`]: !!checked,
      [`${this.prefix}-disabled`]: !!disabled
    })
    let innerStyle = {}
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
    let textStyle = {}
    if (color && checked) {
      textStyle = {
        color
      }
    }
    return (
      <label className={wrapperCls} style={{...style, ...wrapperStyle}}>
        <span className={cls}>
          <span className={`${this.prefix}-inner`} style={innerStyle} />
          <View config={{...viewProps, cls: `${this.prefix}-input`, checked, type: 'radio', disabled }} tag='input' onChange={this.handleChange.bind(this)} />
        </span>
        <span className={`${this.prefix}-label`} style={textStyle}>{ label || children || value }</span>
      </label>
    )
  }
}
