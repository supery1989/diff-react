import * as React from 'react'
import omit from 'omit.js'
import View, { ROOT_PREFIX } from 'libs/view'
import Input from 'components/input'
import Popover from 'components/popover'
import Radio from 'components/radio'
import PanelFooter from 'components/panel/footer/PanelFooter'
import { HourPanel, MinutePanel, SecondPanel } from 'components/panel'
import Moment from 'components/moment'
import { CURRENT } from '../panel/utils/util'
import { TimeCommonProps } from '../panel/utils/TimeBase'

export interface TimePickerProps extends TimeCommonProps {
  placeholder: string
  onChange?: (moment: any, time: string) => void
}

export default class TimePicker extends React.Component<TimePickerProps> {
  static Range: any
  private prefix = `${ROOT_PREFIX}-time-picker`
  private types: any = {
    HOUR: 'hour',
    MINUTE: 'minute',
    SECOND: 'second'
  }
  private TIME_SET_FN: any = {
    hour: 'setHours',
    minute: 'setMinutes',
    second: 'setSeconds'
  }
  private disabledMap: any = {
    hour: 'disabledHour',
    minute: 'disabledMinute',
    second: 'disabledSecond'
  }
  state: any
  format: string
  static defaultProps = {
    placeholder: '请选择时间',
    width: 200,
    showSecond: true,
  }

  constructor(props: TimePickerProps) {
    super(props)

    if (props.format) {
      this.format = props.format
    } else {
      this.format = props.showSecond ? 'HH:mm:ss' : 'HH:mm'
    }
    
    this.state = {
      value: this.initTime(),
      tab: this.types.HOUR,
      inputValue: props.value ? Moment(this.initTime(), this.format) : '',
      showPop: props.disabled ? false : true,
    }
  }

  initTime() {
    return Moment.unix(this.props.value || CURRENT)
  }

  changeTime(type: string, val: number) {
    const { value, tab } = this.state
    const temp = new Date(value)
    let nextTab = tab
    temp[this.TIME_SET_FN[tab]](val)
    if (type === this.types.HOUR) {
      nextTab = this.types.MINUTE
    } else if (type === this.types.MINUTE && this.props.showSecond) {
      nextTab = this.types.SECOND
    }
    this.setState({
      value: temp,
      tab: nextTab,
      errorText: ''
    })
  }

  handleDisabled() {
    const { min, max } = this.props
    const { value } = this.state
    let unix = null
    let minHour = 0
    let minMinute = 0
    let minSecond = 0
    let maxHour = 23
    let maxMinute = 59
    let maxSecond = 59
    if (min) {
      unix = Moment.unix(min)
      minHour = Moment.hour(unix)
      minMinute = Moment.minute(unix)
      minSecond = Moment.second(unix)
    }
    if (max) {
      unix = Moment.unix(max)
      maxHour = Moment.hour(unix)
      maxMinute = Moment.minute(unix)
      maxSecond = Moment.second(unix)
    }
    return {
      [this.types.HOUR]: (h: number) => h < minHour || h > maxHour,
      [this.types.MINUTE]: (m: number) =>
        (Moment.hour(value) === minHour && m < minMinute) ||
        (Moment.hour(value) === maxHour && m > maxMinute),
      [this.types.SECOND]: (s: number) =>
        (Moment.hour(value) === minHour && Moment.minute(value) === minMinute && s < minSecond) ||
        (Moment.hour(value) === maxHour && Moment.minute(value) === maxMinute && s > maxSecond)
    }
  }

  isCellDisabled(type: string) {
    const { disabledTime } = this.props
    if (disabledTime) {
      return disabledTime[this.disabledMap[type]]
    }
    return this.handleDisabled()[type]
  }

  renderPanelContent() {
    const { hourStep, minuteStep, secondStep } = this.props
    const { value, tab } = this.state
    switch(tab) {
      case this.types.HOUR:
        return (
          <HourPanel
            step={hourStep}
            selected={value}
            onSelect={this.changeTime.bind(this, this.types.HOUR)}
            disabled={this.isCellDisabled(this.types.HOUR)}
            hideHeader
          />
        )
      case this.types.MINUTE:
        return (
          <MinutePanel
            step={minuteStep}
            selected={value}
            onSelect={this.changeTime.bind(this, this.types.MINUTE)}
            disabled={this.isCellDisabled(this.types.MINUTE)}
            hideHeader
          />
        )
      case this.types.SECOND:
        return (
          <SecondPanel
            step={secondStep}
            selected={value}
            onSelect={this.changeTime.bind(this, this.types.SECOND)}
            disabled={this.isCellDisabled(this.types.SECOND)}
            hideHeader
          />
        )
      default:
        return null
    }
    
  }

  switchTab(tab: string) {
    this.setState({
      tab,
      errorText: ''
    })
  }

  handleClear() {
    const { onChange, onBeforeClear } = this.props
    if (onBeforeClear && !onBeforeClear()) return
    this.setState({
      inputValue: '',
      value: this.initTime(),
      tab: this.types.HOUR,
      showPop: false
    }, () => {
      this.setState({
        showPop: true
      })
    })
    onChange && onChange('', '')
  }

  onReset() {
    this.setState({
      value: this.initTime(),
      tab: this.types.HOUR
    })
  }

  // 判断当前时间是否在disabled状态
  justIsInDisabled(time: any) {
    const { showSecond } = this.props
    const isDisabledHour = this.isCellDisabled(this.types.HOUR)(Moment.hour(time))
    const isDisabledMinute = this.isCellDisabled(this.types.MINUTE)(Moment.minute(time))
    const isDisabledSecond = showSecond ? this.isCellDisabled(this.types.SECOND)(Moment.second(time)) : false
    return isDisabledHour || isDisabledMinute || isDisabledSecond
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
    if (this.justIsInDisabled(value)) {
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
      inputValue: Moment(temp, this.format),
      tab: this.types.HOUR,
      errorText: ''
    }, () => {
      (this.refs.timepicker as any).hide()
      onChange && onChange(Moment.unix(temp), this.state.inputValue)
    })
  }

  onNow(e: any) {
    this.onConfirm(e, true)
  }

  panelContent() {
    const { showNow, showReset, nowText, resetText, confirmText, showSecond, showError, ...rest } = this.props
    const { value, tab, errorText } = this.state
    const viewProps = omit(rest, ['hourStep', 'minuteStep', 'secondStep', 'disabledTime', 'min', 'max', 'placeholder', 'width', 'disabled', 'onBeforeClear', 'onBeforeConfirm', 'format', 'value'])
    return (
      <View config={{...viewProps, prefix: this.prefix}}>
        <div className={`${this.prefix}-panel-header`}>
          <Radio.Group value={tab} buttonStyle='solid' onChange={this.switchTab.bind(this)}>
            <Radio.Button value={this.types.HOUR} checked>{Moment[this.types.HOUR](value, 'fill')}时</Radio.Button>
            <Radio.Button value={this.types.MINUTE} checked>{Moment[this.types.MINUTE](value, 'fill')}分</Radio.Button>
            {showSecond &&<Radio.Button value={this.types.SECOND} checked>{Moment[this.types.SECOND](value, 'fill')}秒</Radio.Button>}
          </Radio.Group>
        </div>
        <div className={`${this.prefix}-panel-content`}>
          {this.renderPanelContent()}
        </div>
        <div className={`${this.prefix}-panel-footer`}>
          <PanelFooter
            showNow={showNow}
            showReset={showReset}
            nowText={nowText}
            resetText={resetText}
            confirmText={confirmText}
            errorText={errorText}
            showError={showError}
            onReset={this.onReset.bind(this)}
            onConfirm={this.onConfirm.bind(this)}
            onNow={this.onNow.bind(this)}
          />
        </div>
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
      suffix='clockcircle-o'
      value={this.state.inputValue}
      onClear={this.handleClear.bind(this)}
      // onClick={this.handleInputClick.bind(this)}
    />
  }

  render() {
    const { showPop } = this.state
    if (showPop) {
      return (
        <Popover ref='timepicker' popClass={`${this.prefix}-popover`} trigger='click' content={this.panelContent()}>
          {this.renderInput()}
        </Popover>
      )
    }
    return this.renderInput()
  }
}
