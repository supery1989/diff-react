import * as React from 'react'
import omit from 'omit.js'
import View, { ROOT_PREFIX } from 'libs/view'
import Radio from './Radio'

export interface RadioGroupProps {
  className?: string,
  style?: object,
  value?: number | string | boolean,
  disabled?: boolean,
  options?: {label?: string, value?: string | number | boolean, disabled?: boolean},
  fill?: string,
  color?: string,
  buttonStyle?: 'solid' | 'outline',
  onChange?: (value: any) => void
}

export default class RadioGroup extends React.Component<RadioGroupProps> {
  private prefix = `${ROOT_PREFIX}-radio-group`

  onChange(value: any) {
    const { onChange } = this.props
    onChange && onChange(value)
  }

  renderOptions(options: any) {
    if (!options.length) {
      return null
    }
    return options.map((option: any, index: number) => {
      return (
        <Radio
          {...this.props}
          key={index}
          value={option.value}
          disabled={option.disabled}
          checked={this.props.value === option.value}
          onChange={this.onChange.bind(this)}
        >
          {option.label}
        </Radio>
      )
    })
  }

  renderChild(children: any, value: any) {
    return React.Children.map(children, (element: any) => {
      if (!element) {
        return null
      }
      return React.cloneElement(element, Object.assign({}, element.props, {
        checked: element.props.value === value,
        onChange: this.onChange.bind(this),
        fill: this.props.fill,
        color: this.props.color,
        buttonStyle: this.props.buttonStyle
      }))
    })
  }

  render() {
    const { value, children, options, ...rest } = this.props
    const viewProps = omit(rest, ['onChange', 'disabled', 'fill', 'color', 'buttonStyle'])
    return (
      <View config={{...viewProps, prefix: this.prefix}}>
        {options && this.renderOptions(options)}
        {!options && this.renderChild(children, value)}
      </View>
    );
  }
}
