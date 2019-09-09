import * as React from 'react'
import View from '../../libs/view'
import MonthPicker from '../monthpicker'
import Moment from '../moment'
import RangePicker from '../panel/range/RangePicker'
import { DateCommonProps, RangeCommonProps } from '../panel/utils/TimeBase'

export interface MonthRangeCommonProps extends DateCommonProps, RangeCommonProps {}

export default class MonthRangePicker extends RangePicker<MonthRangeCommonProps> {
  static defaultProps = {
    placeholder: ['开始月份', '结束月份'],
    value: ['', ''],
    toText: '至'
  }

  constructor(props: MonthRangeCommonProps) {
    super(props)

    if (props.format) {
      this.format = props.format
    } else {
      this.format = 'YYYY-MM'
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
      <View config={{className: wrapperClassName, style: wrapperStyle, prefix: this.prefix}}>{this.renderPicker(MonthPicker)}</View>
    )
  }
}
