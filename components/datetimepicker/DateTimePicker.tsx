import * as React from 'react'
import DatePicker from '../datepicker'
import Moment from '../moment'
import { DateCommonProps } from '../panel/utils/TimeBase'
import TimePanel from '../panel/time/TimePanel'

export interface DateTimePickerProps extends DateCommonProps {
  placeholder: string
  onChange?: (moment: any, time: string) => void
  disabledTime?: () => {}
}

export default class DateTimePicker extends DatePicker<DateTimePickerProps> {
  static defaultProps = {
    placeholder: '请选择日期时间',
    width: 200,
    nowText: '此刻'
  }

  setFormat() {
    if (this.props.format) {
      this.format = this.props.format
    } else {
      this.format = 'YYYY-MM-DD HH:mm:ss'
    }
  }

  changeTime(val: number, type: number) {
    const { value } = this.state
    const temp = new Date(value)
    const v = temp[`set${type}s`](val)
    this.setState({
      value: v,
      selected: v,
    })
  }

  isDisabled(val: any) {
    const { min, max } = this.props
    if (min && Moment.unix(val) < Moment.unix(min)) return true
    if (max && Moment.unix(val) > Moment.unix(max)) return true
    return false
  }

  // 选中日期
  changeDate(value: number) {
    this.setState({
      value,
      selected: value,
    })
  }

  renderTimePanel() {
    const { selected, value, current } = this.state
    const { disabledTime, min, max } = this.props
    return (
      <TimePanel actived={value} selected={selected || current} current={current} onSelect={this.changeTime.bind(this)} disabledTime={disabledTime} min={min} max={max} />
    )
  }

  // render() {
  //   const { ...rest } = this.props
  //   return (
  //     <View config={{...rest, prefix: this.prefix}}>开发中...</View>
  //   )
  // }
}
