import * as React from 'react'
import View from '../../libs/view'
import DatePicker from '../datepicker'
import Moment from '../moment'
import RangePicker from '../panel/range/RangePicker'
import { DateCommonProps, RangeCommonProps } from '../panel/utils/TimeBase'

export interface DateRangeCommonProps extends DateCommonProps, RangeCommonProps {}

export default class DateRangePicker extends RangePicker<DateRangeCommonProps> {
  static defaultProps = {
    placeholder: ['开始日期', '结束日期'],
    value: ['', ''],
    toText: '至'
  }

  constructor(props: DateRangeCommonProps) {
    super(props)

    if (props.format) {
      this.format = props.format
    } else {
      this.format = 'YYYY-MM-DD'
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
      <View config={{className: wrapperClassName, style: wrapperStyle, prefix: this.prefix}}>{this.renderPicker(DatePicker)}</View>
    )
  }
}
