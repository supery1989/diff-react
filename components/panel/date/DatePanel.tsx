import * as React from 'react'
import classnames from 'classnames'
import omit from 'omit.js'
import View, { ROOT_PREFIX } from 'libs/view'
import Moment from 'components/moment'
import TimeCell from '../utils/TimeCell'

export interface DatePanelProps {
  className?: string
  style?: object
  current: number
  actived: number
  selected: number
  onSelect?: (value: any) => void
  isDisabled?: (value: any) => void
}

const ROW = 6
const COL = 7

export default class DatePanel extends React.Component<DatePanelProps> {
  private prefix = `${ROOT_PREFIX}-date-panel`
  static defaultProps = {
  }

  isBeforeMonth(val: number, cur: number) {
    if (Moment.year(val) < Moment.year(cur)) {
      return true
    }
    return (
      Moment.year(val) === Moment.year(cur) && Moment.month(val) < Moment.month(cur)
    )
  }

  isAfterMonth(val: number, cur: number) {
    if (Moment.year(val) > Moment.year(cur)) {
      return true
    }
    return (
      Moment.year(val) === Moment.year(cur) && Moment.month(val) > Moment.month(cur)
    )
  }

  isSelected(val: number, cur: any) {
    return (
      Moment.year(val) === Moment.year(cur)
      && Moment.month(val) === Moment.month(cur)
      && Moment.date(val) === Moment.date(cur)
    )
  }

  getDays() {
    const { actived, selected, isDisabled, current } = this.props
    const days: any = []
    const temp = new Date(actived)
    const firstDay = new Date(temp.setDate(1))
    const diff = firstDay.getDay()
    let index = 0
    for (let rowIndex = 0; rowIndex < ROW; rowIndex++) {
      days[rowIndex] = []
      for (let colIndex = 0; colIndex < COL; colIndex++) {
        const val = Moment.add(firstDay, index-diff)
        const text = Moment.date(val)
        const isBefore = this.isBeforeMonth(val, actived)
        const isAfter = this.isAfterMonth(val, actived)
        const disabled = isDisabled && isDisabled(val)
        const className = classnames({
          [`${ROOT_PREFIX}-time-cell-different`]: isBefore || isAfter,
          [`${ROOT_PREFIX}-time-cell-current`]: this.isSelected(val, current),
          [`${ROOT_PREFIX}-time-cell-selected`]: this.isSelected(val, selected),
          [`${ROOT_PREFIX}-time-cell-disabled`]: disabled,
        })
        days[rowIndex][colIndex] = {
          text,
          value: val,
          disabled,
          className,
        }
        index++
      }
    }
    return days
  }

  render() {
    const { onSelect, ...rest } = this.props
    const viewProps = omit(rest, ['actived', 'selected', 'isDisabled'])
    const names = ['日', '一', '二', '三', '四', '五', '六']
    const cells = this.getDays()
    return (
      <View config={{...viewProps, prefix: this.prefix}}>
        <div className={`${this.prefix}-table`}>
          <ul className={classnames(`${this.prefix}-table-head`, `${ROOT_PREFIX}-time-cell-tr`)}>
            {names.map((name, i) => (
              <li key={i} className={`${ROOT_PREFIX}-time-cell-td`}><div className={`${ROOT_PREFIX}-time-cell-td-time`}>{name}</div></li>
            ))}
          </ul>
          <TimeCell type='time' cells={cells} onSelect={onSelect} />
        </div>
      </View>
    )
  }
}
