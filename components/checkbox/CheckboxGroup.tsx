import * as React from 'react'
import PropTypes from 'prop-types'
import omit from 'omit.js'
import classnames from 'classnames'
import View, { ROOT_PREFIX } from 'libs/view'
import Checkbox from './Checkbox'

export interface CheckboxGroupProps {
  className?: string,
  style?: object,
  values?: any[],
  options?: [{label?: string, value?: string | number | boolean, disabled?: boolean}],
  min?: number,
  max?: number,
  fill?: string,
  color?: string,
  circle?: boolean,
  buttonStyle?: 'solid' | 'outline',
  direction?: 'v' | 'h',
  onChange?: (value: any) => void
}

export default class CheckboxGroup extends React.Component<CheckboxGroupProps> {
  private prefix = `${ROOT_PREFIX}-checkbox-group`
  static defaultProps = {
    values: [],
    direction: 'h'
  }
  static childContextTypes = {
    childCheckedValues: PropTypes.array
  }
  state: any

  constructor(props: CheckboxGroupProps) {
    super(props)
    this.state = {
      values: props.values
    }
  }

  componentWillReceiveProps(nextProps: CheckboxGroupProps) {
    if (this.props.values !== nextProps.values) {
      this.setState({
        values: nextProps.values
      })
    }
  }

  getChildContext() {
    return {
      childCheckedValues: this.state.values
    }
  }

  onChange(value: any, checked: boolean) {
    const { values } = this.state
    const index = values.indexOf(value)
    if (checked) {
      if (index === -1) {
        values.push(value);
      }
    } else {
      values.splice(index, 1)
    }
    const { onChange } = this.props
    onChange && onChange(values)
  }

  renderChild(children: any, value: any) {
    return React.Children.map(children, (element: any) => {
      if (!element) {
        return null
      }
      return React.cloneElement(element, Object.assign({}, element.props, {
        checked: value.indexOf(element.props.value) > -1,
        onChange: this.onChange.bind(this),
        group: true,
        min: this.props.min,
        max: this.props.max,
        fill: this.props.fill,
        color: this.props.color,
        circle: this.props.circle,
        buttonStyle: this.props.buttonStyle
      }))
    })
  }

  renderOptions(options: any, value: any) {
    if (!options.length) {
      return null
    }
    return options.map((option: any, index: number) => {
      return (
        <Checkbox
          {...this.props}
          key={index}
          value={option.value}
          disabled={option.disabled}
          checked={value.indexOf(option.value) > -1}
          onChange={this.onChange.bind(this)}
          group={true}
        >
          {option.label}
        </Checkbox>
      )
    })
  }

  render() {
    const { values, children, options, direction, ...rest } = this.props
    const viewProps = omit(rest, ['onChange', 'disabled', 'fill', 'color', 'buttonStyle', 'direction', 'circle'])
    const cls = classnames(`${this.prefix}-${direction}`)
    return (
      <View config={{...viewProps, prefix: this.prefix, cls}}>
        {options && this.renderOptions(options, values)}
        {!options && this.renderChild(children, values)}
      </View>
    );
  }
}