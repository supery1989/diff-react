import * as React from 'react'
import View from 'libs/view'
import YearPicker from 'components/yearpicker'
import Moment from 'components/moment'
import RangePicker from 'components/panel/range/RangePicker'
import { DateCommonProps, RangeCommonProps } from '../panel/utils/TimeBase'

export interface YearRangeCommonProps extends DateCommonProps, RangeCommonProps {}

export default class YearRangePicker extends RangePicker<YearRangeCommonProps> {
  static defaultProps = {
    placeholder: ['开始年份', '结束年份'],
    value: ['', ''],
    toText: '至'
  }

  constructor(props: YearRangeCommonProps) {
    super(props)

    if (props.format) {
      this.format = props.format
    } else {
      this.format = 'YYYY'
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
      <View config={{className: wrapperClassName, style: wrapperStyle, prefix: this.prefix}}>{this.renderPicker(YearPicker)}</View>
    )
  }
}