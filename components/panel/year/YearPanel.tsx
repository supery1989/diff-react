import * as React from 'react'
import classnames from 'classnames'
import omit from 'omit.js'
import View, { ROOT_PREFIX } from 'libs/view'
import Moment from 'components/moment'
import PanelHeader from '../header/PanelHeader'
import TimeCell from '../utils/TimeCell'
import { CURRENT } from '../utils/util'

export interface YearPanelProps {
  className?: string
  style?: object
  actived: number
  selected: number
  onChange: (acitved: number, hide: boolean) => void
  onSelect: (date: any) => void
  isDisabled?: (value: any) => void
}

const ROW = 4
const COL = 3

export default class YearPanel extends React.Component<YearPanelProps> {
  private prefix = `${ROOT_PREFIX}-year-panel`
  static defaultProps = {
  }

  isSelected(val: number, cur: any) {
    return (
      val - Moment.year(cur) === 0
    )
  }

  // 顶部左右箭头
  onChangeYears(type: string) {
    console.dir(888)
    const { actived, onChange } = this.props
    const step = type === 'prev' ? -12 : 12
    const temp = Moment.add(actived, step, 'Y')
    onChange && onChange(Moment.year(temp), true)
  }

  getYears() {
    const years: any = []
    let index = 0
    const { actived, selected, isDisabled } = this.props;
    const beginYear = Moment.year(actived)-4;
    for (let rowIndex = 0; rowIndex < ROW; rowIndex++) {
      years[rowIndex] = [];
      for (let colIndex = 0; colIndex < COL; colIndex++) {
        const val = beginYear + index
        const disabled = isDisabled && isDisabled(new Date(actived).setFullYear(val))
        const className = classnames(`${ROOT_PREFIX}-time-cell-td-month`, {
          [`${ROOT_PREFIX}-time-cell-current`]: this.isSelected(val, CURRENT),
          [`${ROOT_PREFIX}-time-cell-selected`]: this.isSelected(val, selected),
          [`${ROOT_PREFIX}-time-cell-disabled`]: disabled,
        })
        years[rowIndex][colIndex] = {
          text: val,
          value: val,
          className,
          disabled,
        };
        index++;
      }
    }
    return years
  }

  render() {
    const { actived, onSelect, ...rest } = this.props
    const viewProps = omit(rest, ['onChange', 'selected', 'isDisabled'])
    return (
      <View config={{...viewProps, prefix: this.prefix}}>
        <div className={`${this.prefix}-header`}>
          <PanelHeader
            title={`${Moment(actived, 'YYYY')-4}~${Number(Moment(actived, 'YYYY'))+7}年`}
            prev={this.onChangeYears.bind(this, 'prev')}
            next={this.onChangeYears.bind(this, 'next')}
          />
        </div>
        <div className={`${this.prefix}-table`}>
          <TimeCell type='time' cells={this.getYears()} onSelect={onSelect} />
        </div>
      </View>
    )
  }
}
