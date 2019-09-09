import * as React from 'react'
import classnames from 'classnames'
import omit from 'omit.js'
import View, { ROOT_PREFIX } from '../../libs/view'

export interface TimelineItemProps {
  className?: string
  style?: object
  time?: string | React.ReactNode
  title?: string | React.ReactNode
  message?: string | React.ReactNode
  dot?: string | React.ReactNode
  dotColor?: string
}

export default class TimelineItem extends React.Component<TimelineItemProps> {
  private prefix = `${ROOT_PREFIX}-timeline-item`

  renderDot(dot: any) {
    const { dotColor } = this.props
    let sty: any = {}
    if (dot) {
      if (dotColor) {
        sty = {
          color: dotColor
        }
      }
      const cls = classnames(`${this.prefix}-dot`, `${this.prefix}-dot-custom`)
      return <div className={cls} style={sty}>{dot}</div>
    }
    if (dotColor) {
      sty = {
        boxShadow: `0 0 0 4px ${dotColor}`
      }
    }
    const cls = classnames(`${this.prefix}-dot`, `${this.prefix}-dot-pred`)
    return <div className={cls} style={sty} />
  }

  render() {
    const { time, title, message, dot, ...rest } = this.props
    const viewProps = omit(rest, ['dotColor'])
    return (
      <View config={{...viewProps, prefix: this.prefix, 'data-date': time}} tag='li'>
        <div className={`${this.prefix}-content`}>
          {title && <div className={`${this.prefix}-title`}>{title}</div>}
          {message && <div className={`${this.prefix}-message`}>{message}</div>}
        </div>
        {this.renderDot(dot)}
      </View>
    )
  }
}
