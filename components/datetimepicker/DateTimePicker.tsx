import * as React from 'react'
// import classnames from 'classnames'
// import omit from 'omit.js'
// import { ROOT_PREFIX } from 'libs/view'
import DatePicker from 'components/datepicker'
// import Moment from 'components/moment'
import { DateCommonProps } from '../panel/utils/TimeBase'
import TimePanel from 'components/panel/time/TimePanel'

export interface DateTimePickerProps extends DateCommonProps {
  placeholder: string
  onChange?: (moment: any, time: string) => void
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

  renderTimePanel() {
    const { selected, value, current } = this.state
    return (
      <TimePanel actived={value} selected={selected || current} current={current} onSelect={this.changeTime.bind(this)} />
    )
  }

  // render() {
  //   const { ...rest } = this.props
  //   return (
  //     <View config={{...rest, prefix: this.prefix}}>开发中...</View>
  //   )
  // }
}
