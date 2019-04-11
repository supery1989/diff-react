import * as React from 'react'
import classnames from 'classnames'
import omit from 'omit.js'
import View, { ROOT_PREFIX } from 'libs/view'
import Moment from 'components/moment'
import PanelHeader from '../header/PanelHeader'
import YearPanel from '../year/YearPanel'
import TimeCell from '../utils/TimeCell'
import { CURRENT } from '../utils/util'

export interface MonthPanelProps {
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

export default class MonthPanel extends React.Component<MonthPanelProps> {
  private prefix = `${ROOT_PREFIX}-month-panel`
  private monthNames = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
  static defaultProps = {
  }
  state: any

  constructor(props: MonthPanelProps){
    super(props)

    this.state = {
      showYear: false
    }
  }

  showYears() {
    this.setState({ showYear: true })
  }

  // 顶部左右箭头
  onChangeYear(type: string) {
    const { actived, onChange } = this.props
    const step = type === 'prev' ? -1 : 1
    const temp = Moment.add(actived, step, 'Y')
    onChange && onChange(temp, true)
  }

  isSelected(val: number, cur: any) {
    const { actived } = this.props
    const year = Moment.year(actived)
    return (
      year === Moment.year(cur)
      && val === Moment.month(cur) - 1
    )
  }

  getMonths() {
    const { selected, actived, isDisabled } = this.props
    const months: any = []
    let index = 0
    for (let rowIndex = 0; rowIndex < ROW; rowIndex++) {
      months[rowIndex] = []
      for (let colIndex = 0; colIndex < COL; colIndex++) {
        const disabled = isDisabled && isDisabled(new Date(actived).setMonth(index))
        const className = classnames(`${ROOT_PREFIX}-time-cell-td-month`, {
          [`${ROOT_PREFIX}-time-cell-current`]: this.isSelected(index, CURRENT),
          [`${ROOT_PREFIX}-time-cell-selected`]: this.isSelected(index, selected),
          [`${ROOT_PREFIX}-time-cell-disabled`]: disabled,
        })
        months[rowIndex][colIndex] = {
          text: this.monthNames[index],
          value: index,
          className,
          disabled,
        };
        index++
      }
    }
    return months
  }

  // 选中月份
  onSelectMonth(month: number) {
    const { actived, onSelect } = this.props
    const temp = new Date(actived).setMonth(month)
    onSelect && onSelect(temp)
  }

  // 选中年
  onSelectYear(year: number, hide: boolean) {
    const { actived, onChange } = this.props
    const temp = new Date(actived).setFullYear(year)
    onChange(Moment.unix(temp), true)
    this.setState({
      showYear: hide || false,
    })
  }

  renderYearPanel() {
    const { actived, selected, isDisabled } = this.props
    return (
      <YearPanel
        actived={actived}
        selected={selected}
        onChange={this.onSelectYear.bind(this)}
        onSelect={this.onSelectYear.bind(this)}
        isDisabled={isDisabled}
      />
    )
  }

  render() {
    const { actived, ...rest } = this.props
    const viewProps = omit(rest, ['onChange', 'onSelect', 'selected', 'isDisabled'])
    const { showYear } = this.state
    return (
      <View config={{...viewProps, prefix: this.prefix}}>
        <div className={`${this.prefix}-header`}>
          <PanelHeader
            title={`${Moment(actived, 'YYYY年')}`}
            onClickTitle={this.showYears.bind(this)}
            prev={this.onChangeYear.bind(this, 'prev')}
            next={this.onChangeYear.bind(this, 'next')}
          />
        </div>
        <div className={`${this.prefix}-table`}>
          <TimeCell type='time' cells={this.getMonths()} onSelect={this.onSelectMonth.bind(this)} />
        </div>
        {showYear && this.renderYearPanel()}
      </View>
    )
  }
}
