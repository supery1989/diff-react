import * as React from 'react'
import omit from 'omit.js'
import View, { ROOT_PREFIX } from 'libs/view'
import Moment from 'components/moment'

export interface CountDownProps {
  className?: string
  style?: object
  during?: number
  date?: any
  format?: string,
  onEnd?: () => void
}

export default class CountDown extends React.Component<CountDownProps> {
  private prefix = `${ROOT_PREFIX}-countdown`
  defaultFormat = 'Hms'
  timer: any
  state: any

  constructor(props: CountDownProps) {
    super(props)

    this.state = {
      during: props.during,
      diff: props.date ? Moment.diff(new Date(), props.date) : 0
    }
  }

  componentWillReceiveProps(nextProps: CountDownProps) {
    if (this.props.during !== nextProps.during) {
      this.setState({
        during: nextProps.during
      }, () => {
        this.counter()
      })
    }
  }

  componentDidMount() {
    this.counter()
  }

  componentWillUnmount() {
    this.timer && clearInterval(this.timer)
  }

  counter() {
    const { onEnd } = this.props
    clearInterval(this.timer)
    if (this.state.during > 0) {
      this.timer = setInterval(() => {
        if (this.state.during < 2) {
          clearInterval(this.timer)
          this.setState({
            during: 0,
          }, () => {
            onEnd && onEnd()
          })
          return
        }
        this.setState({
          during: this.state.during - 1,
        })
      }, 1000)
    } else if (this.state.diff > 0) {
      this.timer = setInterval(() => {
        if (this.state.diff < 2000) {
          clearInterval(this.timer)
          this.setState({
            diff: 0,
          }, () => {
            onEnd && onEnd()
          })
          return
        }
        this.setState({
          diff: this.state.diff - 1000,
        })
      }, 1000)
    }
  }

  getLeapYearCount(end: number) {
    const begin = Moment.year()
    let total = 0
    for(let i = begin; i <= end; i++) {
      if (Moment.isLeapYear(i)) {
        total++
      }
    }
    return total
  }

  renderItem(type: string, data: number, info: string) {
    const { format } = this.props
    if (format) {
      if (format.indexOf(type) > -1) {
        return <span>{data}<span className={`${this.prefix}-date-info`}>{info}</span></span>
      }
      return null
    }
    if (data >0 || this.defaultFormat.indexOf(type) > -1) {
      return <span>{data}<span className={`${this.prefix}-date-info`}>{info}</span></span>
    }
    return null
  }

  renderDate(date: any) {
    const { diff } = this.state
    const msValue = 1
    const sValue = msValue * 1000
    const mValue = sValue * 60
    const hValue = mValue * 60
    const dValue = hValue * 24
    const yValue = dValue * 365
    const YY = Math.floor(diff/yValue)
    let leapTotal = 0
    if (YY > 0) {
      leapTotal = this.getLeapYearCount(Moment.year(date))
    }
    const DD = Math.floor(diff/dValue%365) - leapTotal
    const HH = Math.floor(diff/hValue%24)
    const mm = Math.floor(diff/mValue%60)
    const ss = Math.floor(diff/sValue%60)
    return (
      <span className={`${this.prefix}-date`}>
        {this.renderItem('Y', YY, '年')}
        {this.renderItem('D', DD, '天')}
        {this.renderItem('H', HH, '时')}
        {this.renderItem('m', mm, '分')}
        {this.renderItem('s', ss, '秒')}
      </span>
    )
  }

  render() {
    const { date, ...rest } = this.props
    const viewProps = omit(rest, ['during', 'onEnd', 'format'])
    const { during } = this.state
    if (during >= 0) {
      return (
        <View config={{...viewProps, prefix: this.prefix, cls: `${this.prefix}-during`}} tag='span'>{during}</View>
      )
    }
    if (date) {
      return <View config={{...viewProps, prefix: this.prefix}} tag='span'>{this.renderDate(date)}</View>
    }
    return null
  }
}
