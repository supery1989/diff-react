import * as React from 'react'
import omit from 'omit.js'
import View, { ROOT_PREFIX } from 'libs/view'
import Input from 'components/input'
import Popover from 'components/popover'
import Moment from 'components/moment'
import PanelHeader from '../panel/header/PanelHeader'
import PanelFooter from '../panel/footer/PanelFooter'
import DatePanel from '../panel/date/DatePanel'
import MonthPanel from '../panel/month/MonthPanel'
import { DateCommonProps } from '../panel/utils/TimeBase'
import { CURRENT } from '../panel/utils/util'

export interface DatePickerProps extends DateCommonProps {
  placeholder: string
  onChange?: (moment: any, time: string) => void
}

export default class DatePicker extends React.Component<DatePickerProps> {
  static Range: any
  private prefix = `${ROOT_PREFIX}-date-picker`
  static defaultProps = {
    placeholder: '请选择日期',
    width: 200,
  }
  state: any
  format: string

  constructor(props: DatePickerProps) {
    super(props)

    if (props.format) {
      this.format = props.format
    } else {
      this.format = 'YYYY-MM-DD'
    }

    this.state = {
      showPop: props.disabled ? false : true,
      // 当前的时间
      value: this.initTime(),
      // 选择的时间
      selected: this.initTime(),
      // 文本框显示的内容
      inputValue: props.value ? Moment(this.initTime(), this.format) : '',
      // 显示月份选择器
      showMonth: false,
      errorText: ''
    }
  }

  handleClose() {
    this.setState({
      showMonth: false,
      errorText: ''
    })
  }

  initTime() {
    return Moment.unix(this.props.value || CURRENT)
  }

  // 日期选择器顶部左右箭头
  onChangeMonth(type: string) {
    const typeMap = {
      prev: -1,
      next: 1
    }
    const { value } = this.state
    const temp = Moment.add(value, typeMap[type], 'M')
    this.setState({
      value: temp
    })
  }

  // 显示月份选择器
  showMonth() {
    this.setState({ showMonth: true })
  }

  onSelectMonth(val: number, hide: boolean) {
    this.setState({
      showMonth: hide || false,
      value: val,
    });
  }

  // 选中日期
  changeDate(value: number) {
    const { onChange, onBeforeConfirm } = this.props
    if (onBeforeConfirm && !onBeforeConfirm()) return
    this.setState({
      value,
      selected: value,
      showPop: false,
      inputValue: Moment(value, this.format)
    }, () => {
      onChange && onChange(Moment.unix(value), this.state.inputValue)
      this.setState({
        showPop: true
      })
    })
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

  handleClear() {
    const { onChange, onBeforeClear } = this.props
    if (onBeforeClear && !onBeforeClear()) return
    this.setState({
      inputValue: '',
      value: this.initTime(),
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

  renderMonthPanel() {
    const { value, selected } = this.state
    return (
      <MonthPanel
        actived={value}
        selected={selected}
        onChange={this.onSelectMonth.bind(this)}
        onSelect={this.onSelectMonth.bind(this)}
        isDisabled={this.isDisabled.bind(this)}
      />
    )
  }

  panelContent() {
    const { showNow, nowText, confirmText, showError, ...rest } = this.props
    const { value, selected, showMonth, errorText } = this.state
    const viewProps = omit(rest, ['min', 'max', 'placeholder', 'width', 'disabled', 'onBeforeClear', 'onBeforeConfirm', 'format', 'value', 'disabledDate'])
    return (
      <View config={{...viewProps, prefix: this.prefix}}>
        <div className={`${this.prefix}-panel-header`}>
          <PanelHeader
            title={`${Moment(value, 'YYYY年MM月')}`}
            onClickTitle={this.showMonth.bind(this)}
            prev={this.onChangeMonth.bind(this, 'prev')}
            next={this.onChangeMonth.bind(this, 'next')}
          />
        </div>
        <div className={`${this.prefix}-panel-content`}>
          <DatePanel
            actived={value}
            selected={selected}
            onSelect={this.changeDate.bind(this)}
            isDisabled={this.isDisabled.bind(this)}
          />
        </div>
        <div className={`${this.prefix}-panel-footer`}>
          <PanelFooter
            showNow={showNow}
            showReset={false}
            nowText='今天'
            confirmText={confirmText}
            errorText={errorText}
            showError={showError}
            onConfirm={this.onConfirm.bind(this)}
            onNow={this.onNow.bind(this)}
          />
        </div>
        {showMonth && this.renderMonthPanel()}
      </View>
    )
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

  render() {
    const { showPop } = this.state
    if (showPop) {
      return (
        <Popover ref='timepicker' popClass={`${this.prefix}-popover`} trigger='click' content={this.panelContent()} onClose={this.handleClose.bind(this)}>
          {this.renderInput()}
        </Popover>
      )
    }
    return this.renderInput()
  }
}
