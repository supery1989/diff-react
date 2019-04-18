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
  onSelect: (value: number, type: string) => void
}

export default class TimePanel extends React.Component<TimePanelProps> {
  private prefix = `${ROOT_PREFIX}-time-panel`
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
              // disabled={this.isCellDisabled(this.types.HOUR)}
            />
          )}
          {openMinute && (
            <MinutePanel
              selected={selected}
              hidePanel={this.hidePanel.bind(this, 'Minute')}
              onSelect={this.onSelectTime.bind(this, 'Minute')}
            />
          )}
          {openSecond && (
            <SecondPanel
              selected={selected}
              current={current}
              hidePanel={this.hidePanel.bind(this, 'Second')}
              onSelect={this.onSelectTime.bind(this, 'Second')}
            />
          )}
        </div>
      )
    }
    return null
  }

  render() {
    const { selected, ...rest } = this.props
    const viewProps = omit(rest, ['onChange', 'onSelect', 'selected', 'isDisabled'])
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
