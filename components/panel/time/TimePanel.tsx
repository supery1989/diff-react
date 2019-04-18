import * as React from 'react'
// import classnames from 'classnames'
import omit from 'omit.js'
import View, { ROOT_PREFIX } from 'libs/view'
import Moment from 'components/moment'
import Button from 'components/button'
import HourPanel from '../hour/HourPanel'
import MinutePanel from '../minute/MinutePanel'
import SecondPanel from '../second/SecondPanel'

export interface TimePanelProps {
  className?: string
  style?: object
  current: number
  actived: number
  selected: number
  min?: any
  max?: any
  onSelect: (value: number, type: string) => void
  disabledTime?: () => {}
}

export default class TimePanel extends React.Component<TimePanelProps> {
  private prefix = `${ROOT_PREFIX}-time-panel`
  private disabledMap: any = {
    hour: 'disabledHour',
    minute: 'disabledMinute',
    second: 'disabledSecond'
  }
  state: any

  constructor(props: TimePanelProps){
    super(props)

    this.state = {
      openHour: false,
      openMinute: false,
      openSecond: false
    }
  }

  openPanel(type: string) {
    this.setState({
      [`open${type}`]: true
    })
  }

  hidePanel(type: string) {
    this.setState({
      [`open${type}`]: false
    })
  }

  onSelectTime(type: any, value: any) {
    this.props.onSelect(value, type)
    this.hidePanel(type)
  }

  isSameDate(val: number, current: number) {
    return (
      Moment.year(val) === Moment.year(current) &&
      Moment.month(val) === Moment.month(current) &&
      Moment.date(val) === Moment.date(current)
    )
  }

  handleDisabled() {
    const { min, max, actived } = this.props
    let unix = null
    let minHour = 0
    let minMinute = 0
    let minSecond = 0
    let maxHour = 23
    let maxMinute = 59
    let maxSecond = 59
    if (min && this.isSameDate(min, actived)) {
      unix = Moment.unix(min)
      minHour = Moment.hour(unix)
      minMinute = Moment.minute(unix)
      minSecond = Moment.second(unix)
    }
    if (max && this.isSameDate(max, actived)) {
      unix = Moment.unix(max)
      maxHour = Moment.hour(unix)
      maxMinute = Moment.minute(unix)
      maxSecond = Moment.second(unix)
    }
    return {
      hour: (h: number) => h < minHour || h > maxHour,
      minute: (m: number) =>
        (Moment.hour(actived) === minHour && m < minMinute) ||
        (Moment.hour(actived) === maxHour && m > maxMinute),
      second: (s: number) =>
        (Moment.hour(actived) === minHour && Moment.minute(actived) === minMinute && s < minSecond) ||
        (Moment.hour(actived) === maxHour && Moment.minute(actived) === maxMinute && s > maxSecond)
    }
  }

  isDisabled(type: string) {
    const { disabledTime } = this.props
    if (disabledTime) {
      return disabledTime[this.disabledMap[type]]
    }
    return this.handleDisabled()[type]
  }

  renderTimePanel() {
    const { selected, current } = this.props
    const { openHour, openMinute, openSecond } = this.state
    if (openHour || openMinute || openSecond) {
      return (
        <div className={`${this.prefix}-content`}>
          {openHour && (
            <HourPanel
              selected={selected}
              hidePanel={this.hidePanel.bind(this, 'Hour')}
              onSelect={this.onSelectTime.bind(this, 'Hour')}
              disabled={this.isDisabled('hour')}
            />
          )}
          {openMinute && (
            <MinutePanel
              selected={selected}
              hidePanel={this.hidePanel.bind(this, 'Minute')}
              onSelect={this.onSelectTime.bind(this, 'Minute')}
              disabled={this.isDisabled('minute')}
            />
          )}
          {openSecond && (
            <SecondPanel
              selected={selected}
              current={current}
              hidePanel={this.hidePanel.bind(this, 'Second')}
              onSelect={this.onSelectTime.bind(this, 'Second')}
              disabled={this.isDisabled('second')}
            />
          )}
        </div>
      )
    }
    return null
  }

  render() {
    const { selected, ...rest } = this.props
    const viewProps = omit(rest, ['onChange', 'onSelect', 'selected', 'isDisabled', 'disabledTime'])
    return (
      <View config={{...viewProps, prefix: this.prefix}}>
        <Button.Group style={{ textAlign: 'center' }}>
          <Button onClick={this.openPanel.bind(this, 'Hour')}>{Moment.hour(selected, 'fill')}时</Button>
          <Button onClick={this.openPanel.bind(this, 'Minute')}>{Moment.minute(selected, 'fill')}分</Button>
          <Button onClick={this.openPanel.bind(this, 'Second')}>{Moment.second(selected, 'fill')}秒</Button>
        </Button.Group>
        {this.renderTimePanel()}
      </View>
    )
  }
}
