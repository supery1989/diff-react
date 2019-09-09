import * as React from 'react'
import View, { ROOT_PREFIX } from '../../libs/view'
import Moment from '../moment'
import Icon from '../icon'

export interface CopyrightProps {
  className?: string
  style?: object
  icon: boolean
  date: boolean
  start?: number
  author?: string
}

export default class Copyright extends React.Component<CopyrightProps> {
  private prefix = `${ROOT_PREFIX}-copyright`
  static defaultProps = {
    icon: true,
    date: true,
  }

  render() {
    const { icon, date, start, author, ...rest } = this.props
    return (
      <View config={{...rest, prefix: this.prefix}} tag='span'>
        {icon ? <Icon className={`${this.prefix}-icon`} type='copyright' /> : <span className={`${this.prefix}-icon`}>Copyright</span>}
        {date && <span className={`${this.prefix}-date`}>{start && `${start}-`}{Moment.year()}</span>}
        {author && <span>{author}版权所有</span>}
      </View>
    )
  }
}
