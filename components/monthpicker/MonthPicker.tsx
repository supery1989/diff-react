import * as React from 'react'
import omit from 'omit.js'
import Popover from '../popover'
import Moment from '../moment'
import View, { ROOT_PREFIX } from '../../libs/view'
import MonthPanel from '../panel/month/MonthPanel'
import PanelFooter from '../panel/footer/PanelFooter'
import { DateCommonProps } from '../panel/utils/TimeBase'
import BasePicker from '../panel/base/BasePicker'

export interface MonthPickerProps extends DateCommonProps {
  placeholder: string
  onChange?: (moment: any, time: string) => void
}

export default class MonthPicker extends BasePicker<MonthPickerProps> {
  protected prefix = `${ROOT_PREFIX}-month-picker`
  static defaultProps = {
    placeholder: '请选择月份',
    width: 200,
  }

  constructor(props: MonthPickerProps) {
    super(props)

    if (props.format) {
      this.format = props.format
    } else {
      this.format = 'YYYY-MM'
    }

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
      errorText: ''
    }
  }

  // 选中月份
  changeMonth(val: number, hide: boolean) {
    const { onChange, onBeforeConfirm } = this.props
    if (onBeforeConfirm && !onBeforeConfirm()) return
    this.setState({
      value: val,
      selected: val,
      showPop: false,
      inputValue: Moment(val, this.format),
      errorText: ''
    }, () => {
      onChange && onChange(Moment.unix(val), this.state.inputValue)
      this.setState({
        showPop: true
      })
    })
  }

  onSelectMonth(val: number, hide: boolean) {
    this.setState({
      showPop: hide || false,
      value: val,
    }, () => {
      if (!this.state.showPop) {
        this.setState({
          showPop: true
        })
      }
    })
  }

  handleClose() {
    this.setState({
      errorText: ''
    })
  }

  handleShow() {
    this.setState({
      current: this.initTime()
    })
  }

  panelContent() {
    const { showNow, nowText, confirmText, showError, ...rest } = this.props
    const { errorText, current, value, selected } = this.state
    const viewProps = omit(rest, ['min', 'max', 'placeholder', 'width', 'disabled', 'onBeforeClear', 'onBeforeConfirm', 'format', 'value', 'disabledDate'])
    return (
      <View config={{...viewProps, prefix: this.prefix}}>
        <MonthPanel
          current={current}
          actived={value}
          selected={selected || current}
          onChange={this.onSelectMonth.bind(this)}
          onSelect={this.changeMonth.bind(this)}
          isDisabled={this.isDisabled.bind(this)}
        />
        <div className={`${this.prefix}-panel-footer`}>
          <PanelFooter
            showNow={showNow}
            showReset={false}
            nowText='当前'
            confirmText={confirmText}
            errorText={errorText}
            showError={showError}
            onConfirm={this.onConfirm.bind(this)}
            onNow={this.onNow.bind(this)}
          />
        </div>
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
