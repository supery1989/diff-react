import * as React from 'react'
import View from 'libs/view'
import TimePicker from 'components/timepicker'
import Moment from 'components/moment'
import RangePicker from 'components/panel/range/RangePicker'
import { TimeCommonProps, RangeCommonProps } from '../panel/utils/TimeBase'

export interface TimeRangePickerProps extends TimeCommonProps, RangeCommonProps {}

export default class TimeRangePicker extends RangePicker<TimeRangePickerProps> {
  static defaultProps = {
    placeholder: ['开始时间', '结束时间'],
    value: ['', ''],
    showSecond: true,
    toText: '至'
  }

  constructor(props: TimeRangePickerProps) {
    super(props)

    if (props.format) {
      this.format = props.format
    } else {
      this.format = props.showSecond ? 'HH:mm:ss' : 'HH:mm'
    }
    const val0 = props.value[0] ? Moment(this.initTime(props.value[0]), this.format) : ''
    const val1 = props.value[1] ? Moment(this.initTime(props.value[0]), this.format) : ''
    this.inputValue = [val0, val1]
    this.state = {
      tempValue: props.value
    }
  }

  render() {
    const { wrapperClassName, wrapperStyle } = this.props
    return (
      <View config={{className: wrapperClassName, style: wrapperStyle, prefix: this.prefix}}>{this.renderPicker(TimePicker)}</View>
    )
  }
}
