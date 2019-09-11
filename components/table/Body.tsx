import * as React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import { ROOT_PREFIX } from '../../libs/view'
import Checkbox from '../checkbox'
import Button from '../button'
import Icon from '../icon'
import { TableProps } from './Table'

export interface TableBodyProps extends TableProps {
  fixed: true | 'left' | 'right'
  bodyWidth: any
  hoverRow: number
  currentRow: object
  renderExpanded?: (row: any) => React.ReactNode
}

export default class TableBody extends React.Component<TableBodyProps> {
  private prefix = `${ROOT_PREFIX}-table`
  static contextTypes = {
    table: PropTypes.any
  }

  getValueByPath(data: any, path?: string) {
    if (typeof path !== 'string') return null
    return path.split('.').reduce((pre: object, cur) => (pre || {})[cur], data)
  }

  isColumnHidden(index: number) {
    const { fixed, columns } = this.props
    const { table } = this.context
    if (fixed || fixed === 'left') {
      return index < table.getFixedColumns(columns).length
    }
    return null
  }

  handleMouseEnter(rowIndex: number) {
    const { table } = this.context
    table.updateHoverRow(rowIndex)
  }

  handleMouseLeave() {
    const { table } = this.context
    table.updateHoverRow(null)
  }

  handleClick(row: object) {
    const { table } = this.context
    table.setCurrentRow(row)
  }

  handleExpand(row: any) {
    const { table } = this.context
    table.toggleRowExpanded(row)
  }

  handleButtonClick(row: any, column: any) {
    const { btnConfig } = column
    if (btnConfig) {
      const { onClick } = btnConfig
      onClick && onClick(row)
    }
  }

  renderBody(data: any, columns: any) {
    if (data.length > 0) {
      const { rowClassName, rowStyle } = this.props
      
      return data.map((row: any, rowIndex: number) => {
        let rowCls = ''
        let rowSty = rowStyle || {}
        if (typeof rowClassName === 'string') {
          rowCls = rowClassName
        } else if (typeof rowClassName === 'function') {
          rowCls = rowClassName(row, rowIndex)
        }
        if (typeof rowStyle === 'function') {
          rowSty = rowStyle.call(null, row, rowIndex)
        }
        const trCls = classnames(rowCls)
        const { table } = this.context
        const { renderExpanded } = this.props
        return [(
          <tr
            className={trCls}
            style={rowSty}
            key={rowIndex}
            onMouseEnter={this.handleMouseEnter.bind(this, rowIndex)}
            onMouseLeave={this.handleMouseLeave.bind(this)}
            onClick={this.handleClick.bind(this, row)}
          >
            {this.renderTr(row, rowIndex, columns)}
          </tr>
        ), table.isRowExpanding(row) && (
          <tr key={`${rowIndex}-expanded`}>
            <td
              colSpan={columns.length}
              className="el-table__expanded-cell"
            >
              {typeof renderExpanded === 'function' && renderExpanded(row)}
            </td>
          </tr>
        )]
      })
    }
    return (
      <tr>
        <td align='center' colSpan={columns.length}>
          <div className={`${this.prefix}-empty`}>{!this.props.fixed && this.props.emptyText}</div>
        </td>
      </tr>
    )
  }

  renderLabel(column: any, row: any, rowIndex: number) {
    if (column.type === 'index') {
      return rowIndex + 1
    }
    if (column.type === 'expand') {
      const iconType = this.context.table.isRowExpanding(row) ? 'down' : 'right'
      return (
        <Icon className={`${this.prefix}-expand-arrow`} type={iconType} onClick={this.handleExpand.bind(this, row, rowIndex)} />
      )
    }
    if (column.type === 'select') {
      const isSelected = this.context.table.isRowSelected(row)
      return (
        <Checkbox
          checked={isSelected}
          disabled={column.selectable && !column.selectable(row, rowIndex)}
          onChange={() => { this.context.table.toggleRowSelection(row, !isSelected) }}
        />
      )
    }
    if (column.type === 'button') {
      return (
        <Button type='primary' size='small' className={`${this.prefix}-button`} {...column.btnConfig} onClick={this.handleButtonClick.bind(this, row, column)}>按钮</Button>
      )
    }
    if (column.render) {
      return column.render(row)
    }
    return this.getValueByPath(row, column.prop)
  }

  renderTr(row: any, rowIndex: number, columns: any) {
    if (columns.length > 0) {
      const { table } = this.context
      const { highlightCurrentRow, fixed, hoverRow, currentRow } = this.props
      return columns.map((column: any, cellIndex: number) => {
        const columnsHidden = table.isColumnHidden(cellIndex, fixed)
        return (
          <td
            key={`${rowIndex}-${cellIndex}`}
            className={classnames({
              ['is-hidden']: columnsHidden,
              ['is-hover']: rowIndex === hoverRow,
              ['is-current']: highlightCurrentRow && row === currentRow,
              [`align-${column.align}`]: column.align,
            }, column.className)}
          >
            <div className={`${this.prefix}-cell`}>{this.renderLabel(column, row, rowIndex)}</div>
          </td>
        )
      })
    }
    return null
  }

  render() {
    const { columns, data, bodyWidth } = this.props
    return (
      <table className={`${this.prefix}-body`} cellPadding={0} cellSpacing={0} style={{borderSpacing: 0, border: 0, width: bodyWidth}}>
        <colgroup>{this.context.table.renderCol(columns)}</colgroup>
        <tbody>
          {this.renderBody(data, columns)}
        </tbody>
      </table>
    )
  }
}
