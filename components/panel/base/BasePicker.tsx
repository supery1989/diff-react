import * as React from 'react'
import { ROOT_PREFIX } from '../../../libs/view'
import Moment from '../../moment'
import Input from '../../input'
import { DateCommonProps } from '../utils/TimeBase'

export interface BasePickerProps extends DateCommonProps {
  placeholder: string
  onChange?: (moment: any, time: string) => void
}

export default class BasePicker<T> extends React.Component<BasePickerProps> {
  protected prefix = `${ROOT_PREFIX}-base-picker`
  static Range: any
  state: any
  format: string

  initTime() {
    return Moment.unix(this.props.value || new Date())
  }

  handleClear() {
    const { onChange, onBeforeClear } = this.props
    if (onBeforeClear && !onBeforeClear()) return
    this.setState({
      inputValue: '',
      value: this.initTime(),
      selected: this.initTime(),
      showPop: false
    }, () => {
      this.setState({
        showPop: true
      })
    })
    onChange && onChange('', '')
  }

  isDisabled(val: any) {
    const { disabledDate, min, max } = this.props
    if (disabledDate && disabledDate(val)) return true
    const format = 'YYYYMMDD'
    if (min && Moment(val, format) < Moment(min, format)) return true
    if (max && Moment(val, format) > Moment(max, format)) return true
    return false
  }

  onConfirm(e: any, now?: boolean) {
    const { min, onChange, onBeforeConfirm } = this.props
    if (onBeforeConfirm && !onBeforeConfirm()) return
    let value
    if (now) {
      value = new Date()
    } else {
      value = this.state.value
    }
    if (this.isDisabled(value)) {
      this.setState({
        errorText: '选择了不允许选择的时间!'
      })
      return
    }
    let temp = value
    if (min) {
      if (temp < Moment.unix(min)) {
        temp = Moment.unix(min)
      }
    }
    this.setState({
      value: temp,
      selected: value,
      inputValue: Moment(temp, this.format),
      errorText: '',
      showPop: false
    }, () => {
      this.setState({
        showPop: true
      })
      onChange && onChange(Moment.unix(temp), this.state.inputValue)
    })
  }

  onNow(e: any) {
    this.onConfirm(e, true)
  }

  renderInput() {
    const { placeholder, width, disabled } = this.props
    return <Input
      style={{ width: `${width}px` }}
      placeholder={placeholder}
      readOnly
      disabled={disabled}
      suffix='calendar'
      value={this.state.inputValue}
      onClear={this.handleClear.bind(this)}
    />
  }
}
