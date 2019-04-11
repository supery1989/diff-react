import * as React from 'react'
import classnames from 'classnames'
import omit from 'omit.js'
import View, { ROOT_PREFIX } from 'libs/view'
import './style/TimeCell.scss'

export interface TimeCellProps {
  className?: string
  style?: object
  cells?: any[]
  onSelect?: (value: any) => void
  type?: string
}

export default class TimeCell extends React.Component<TimeCellProps> {
  private prefix = `${ROOT_PREFIX}-time-cell`

  handleClick(cell: any) {
    if (cell.disabled) return
    const { onSelect } = this.props
    !cell.isDisabled && onSelect && onSelect(cell.value)
  }

  getBody() {
    const { cells, type } = this.props
    if (cells && cells.length > 0) {
      return cells.map((row: any, i: number) => {
        let tds = row.map((col: any, j: number) => {
          const tdCls = classnames(`${this.prefix}-td`, col.className)
          return (
            <li
              className={tdCls}
              key={j}
              onClick={this.handleClick.bind(this, col)}
            >
              <div className={`${this.prefix}-td-${type}`}>{col.text}</div>
            </li>
          )
        })
        return (
          <ul className={`${this.prefix}-tr`} key={i}>{tds}</ul>
        )
      })
    }
    return null
  }

  render() {
    const { ...rest } = this.props
    const viewProps = omit(rest, ['onSelect', 'cells', 'type'])
    return (
      <View config={{...viewProps, prefix: this.prefix}}>{this.getBody()}</View>
    )
  }
}
