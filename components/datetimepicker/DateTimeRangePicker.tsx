import * as React from 'react'
import View from 'libs/view'
import DateTimePicker from 'components/datetimepicker'
import Moment from 'components/moment'
import RangePicker from 'components/panel/range/RangePicker'
import { DateCommonProps, RangeCommonProps } from '../panel/utils/TimeBase'

export interface DateTimeRangeCommonProps extends DateCommonProps, RangeCommonProps {}

export default class DateTimeRangePicker extends RangePicker<DateTimeRangeCommonProps> {
  static defaultProps = {
    placeholder: ['开始日期时间', '结束日期时间'],
    value: ['', ''],
    toText: '至'
  }

  constructor(props: DateTimeRangeCommonProps) {
    super(props)

    if (props.format) {
      this.format = props.format
    } else {
      this.format = 'YYYY-MM-DD HH:mm:ss'
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
      <View config={{className: wrapperClassName, style: wrapperStyle, prefix: this.prefix}}>{this.renderPicker(DateTimePicker)}</View>
    )
  }
}
