import * as React from 'react'
import omit from 'omit.js'
import View, { ROOT_PREFIX } from 'libs/view'
import Popover from 'components/popover'
import Moment from 'components/moment'
import PanelHeader from '../panel/header/PanelHeader'
import PanelFooter from '../panel/footer/PanelFooter'
import DatePanel from '../panel/date/DatePanel'
import MonthPanel from '../panel/month/MonthPanel'
import { DateCommonProps } from '../panel/utils/TimeBase'
import BasePicker from '../panel/base/BasePicker'

export interface DatePickerProps extends DateCommonProps {
  placeholder: string
  onChange?: (moment: any, time: string) => void
}

export default class DatePicker<T> extends BasePicker<DatePickerProps> {
  protected prefix = `${ROOT_PREFIX}-date-picker`
  static defaultProps = {
    placeholder: '请选择日期',
    width: 200,
    nowText: '今天'
  }

  constructor(props: DatePickerProps) {
    super(props)

    this.setFormat()

    this.state = {
      showPop: props.disabled ? false : true,
      // 当前的世界
      current: this.initTime(),
      // 临时存储的时间
      value: this.initTime(),
      // 选择的时间
      selected: null,
      // 文本框显示的内容
      inputValue: props.value ? Moment(this.initTime(), this.format) : '',
      // 显示月份选择器
      showMonth: false,
      errorText: ''
    }
  }

  setFormat() {
    if (this.props.format) {
      this.format = this.props.format
    } else {
      this.format = 'YYYY-MM-DD'
    }
  }

  handleClose() {
    this.setState({
      showMonth: false,
      errorText: ''
    })
  }

  handleShow() {
    this.setState({
      current: this.initTime()
    })
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

  renderMonthPanel() {
    const { value, selected, current } = this.state
    return (
      <MonthPanel
        current={current}
        actived={value}
        selected={selected || current}
        onChange={this.onSelectMonth.bind(this)}
        onSelect={this.onSelectMonth.bind(this)}
        isDisabled={this.isDisabled.bind(this)}
      />
    )
  }

  renderTimePanel(): any {
    return null
  }

  panelContent() {
    const { showNow, nowText, confirmText, showError, ...rest } = this.props
    const { value, selected, showMonth, errorText, current } = this.state
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
            current={current}
            selected={selected || current}
            onSelect={this.changeDate.bind(this)}
            isDisabled={this.isDisabled.bind(this)}
          />
          {this.renderTimePanel()}
        </div>
        <div className={`${this.prefix}-panel-footer`}>
          <PanelFooter
            showNow={showNow}
            showReset={false}
            nowText={nowText}
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

  render() {
    const { showPop } = this.state
    if (showPop) {
      return (
        <Popover ref='timepicker' popClass={`${this.prefix}-popover`} trigger='click' content={this.panelContent()} onClose={this.handleClose.bind(this)} onShow={this.handleShow.bind(this)}>
          {this.renderInput()}
        </Popover>
      )
    }
    return this.renderInput()
  }
}
