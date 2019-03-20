import * as React from 'react'
import omit from 'omit.js'
import View, { ROOT_PREFIX } from 'libs/view'
import TimePicker from 'components/timepicker'
import Moment from 'components/moment'
import { TimeCommonProps } from '../panel/utils/TimeBase'

export interface TimeRangePickerProps extends TimeCommonProps {
  wrapperClassName?: string,
  wrapperStyle?: object
  placeholder: string[]
  value: any[]
  onChange?: (moment: any[], time: string[]) => void
  toText: string | React.ReactNode
}

export default class TimeRangePicker extends React.Component<TimeRangePickerProps> {
  private prefix = `${ROOT_PREFIX}-time-range-picker`
  static defaultProps = {
    placeholder: ['开始时间', '结束时间'],
    value: ['', ''],
    showSecond: true,
    toText: '至'
  }
  state: any
  format: string
  inputValue: any

  constructor(props: TimeRangePickerProps) {
    super(props)

    if (props.format) {
      this.format = props.format
    } else {
      this.format = props.showSecond ? 'HH:mm:ss' : 'HH:mm'
    }
    console.dir(this.format)
    const val0 = props.value[0] ? Moment(this.initTime(props.value[0]), this.format) : ''
    const val1 = props.value[1] ? Moment(this.initTime(props.value[0]), this.format) : ''
    this.inputValue = [val0, val1]
    console.dir(this.inputValue)
    this.state = {
      tempValue: props.value
    }
  }

  initTime(value: any) {
    return Moment.unix(value)
  }

  handleChange(key: number, val: any, inputVal: string) {
    const { onChange } = this.props
    const { tempValue } = this.state
    tempValue[key] = val
    this.inputValue[key] = inputVal
    this.setState({
      tempValue
    }, () => {
      onChange && onChange(tempValue, this.inputValue)
    })
  }

  renderPicker() {
    const { placeholder, value, max, min, toText, ...rest } = this.props
    const viewProps = omit(rest, ['wrapperClassName', 'wrapperStyle'])
    const { tempValue } = this.state
    return (
      <div>
        <TimePicker
          {...viewProps}
          placeholder={placeholder[0]}
          max={tempValue[1] || max}
          onChange={this.handleChange.bind(this, 0)}
          value={value[0] || ''}
        />
        <span className={`${this.prefix}-to`}>{toText}</span>
        <TimePicker
          {...viewProps}
          placeholder={placeholder[1]}
          min={tempValue[0] || min}
          onChange={this.handleChange.bind(this, 1)}
          value={value[1] || ''}
        />
      </div>
    )
  }

  render() {
    const { wrapperClassName, wrapperStyle } = this.props
    return (
      <View config={{className: wrapperClassName, style: wrapperStyle, prefix: this.prefix}}>{this.renderPicker()}</View>
    )
  }
}
