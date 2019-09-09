import * as React from 'react'
import * as ReactDom from 'react-dom'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import { ROOT_PREFIX } from '../../libs/view'
import Checkbox from '../checkbox'
import Icon from '../icon'
import { TableProps } from './Table'

export interface TableHeaderProps extends TableProps {
  fixed: true | 'left' | 'right'
  bodyWidth: number
  scrollY?: boolean
  barWidth?: number
  sortColumn?: object
}

export default class TableHeader extends React.Component<TableHeaderProps> {
  private prefix = `${ROOT_PREFIX}-table`
  static contextTypes = {
    table: PropTypes.any
  }
  draggingColumn: any
  dragging: boolean = false

  handleMouseMove(column: any, e: any) {
    if (column.notResize) return
    if (!this.dragging && this.props.border) {
      let target = e.target
      while ( target && target.tagName !== 'TH' ) {
        target = target.parentNode
      }
      const rect = target.getBoundingClientRect()
      const bodySty = document.body.style
      if (rect.width > 12 && rect.right - e.pageX < 3) {
        bodySty.cursor = 'col-resize'
        this.draggingColumn = column
      } else {
        bodySty.cursor = ''
        this.draggingColumn = null
      }
    }
  }

  handleSortClick(column: any) {
    if (this.props.sortColumn === column) {
      column.order = column.order === 'asc' ? 'desc' : 'asc'
    } else {
      if (!column.order) {
        column.order = 'desc'
      }
    }
    this.context.table.setSortColumn(column)
  }

  handleMouseDown(column: any, e: any) {
    if (this.draggingColumn) {
      this.dragging = true
      const { table } = this.context
      const { tableEl, resizeProxy } = table
      const tableNode = ReactDom.findDOMNode(tableEl)
      const tableLeft = (tableNode as Element).getBoundingClientRect().left
      let columnEl = e.target
      while (columnEl && columnEl.tagName !== 'TH') {
        columnEl = columnEl.parentNode
      }
      const columnRect = columnEl.getBoundingClientRect()
      const minLeft = columnRect.left - tableLeft + 30
      // columnEl.classList.add('noclick')
      const startMouseLeft = e.clientX
      const startLeft = columnRect.right - tableLeft
      const startColumnLeft = columnRect.left - tableLeft
      resizeProxy.style.left = startLeft + 'px'
      resizeProxy.style.visibility = 'visible'
      /** eslint-disable */
      document['onselectstart'] = () => false
      document['ondragstart'] = () => false

      const handleMouseMove = (e: any) => {
        const deltaLeft = e.clientX - startMouseLeft
        const proxyLeft = startLeft + deltaLeft
        resizeProxy.style.left = Math.max(minLeft, proxyLeft) + 'px'
      }
      const handleMouseUp = (e: any) => {
        if (this.dragging) {
          const finalLeft = parseInt(resizeProxy.style.left, 10)
          const columnWidth = finalLeft - startColumnLeft
          // const oldWidth = column.realWidth
          column.width = columnWidth

          this.dragging = false
          this.draggingColumn = null

          document.body.style.cursor = ''
          resizeProxy.style.visibility = 'hidden'
          document.removeEventListener('mousemove', handleMouseMove)
          document.removeEventListener('mouseup', handleMouseUp)
          document['onselectstart'] = null
          document['ondragstart'] = null
          // setTimeout(() => {
          //   columnEl.classList.remove('noclick')
          // })
          table.updateColumnWidth(this.props.columns)
          // this.dispatchEvent('onHeaderDragEnd', columnWidth, oldWidth, column, event);
        }
      }
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    }
  }

  handleMouseOut() {
    document.body.style.cursor = ''
  }

  renderLabel(column: any) {
    if (column.type === 'index') {
      return column.label || '#'
    }
    if (column.type === 'expand') {
      return column.label || ''
    }
    if (column.type === 'select') {
      return (
        <Checkbox
          checked={this.context.table.isAllSelected()}
          onChange={() => this.context.table.toggleAllSelection()}
        />
      )
    }
    if (column.sort) {
      const { order } = column
      const { defaultSort, sortColumn } = this.props
      let iconType = 'arrowdown'
      if (sortColumn) {
        if (order === 'asc') {
          iconType = 'arrowup'
        }
      } else {
        if (defaultSort && defaultSort.order) {
          if (column.prop === defaultSort.prop) {
            iconType = defaultSort.order === 'asc' ? 'arrowup' : 'arrowdown'
          }
        }
      }
      return (
        <span>
          {column.label}
          <Icon className={`${this.prefix}-sort-arrow`} type={iconType} onClick={this.handleSortClick.bind(this, column)} />
        </span>
      )
    }
    return column.renderHeader ? column.renderHeader(column) : column.label
  }

  renderTr(columns: any) {
    if (columns.length > 0) {
      const { table } = this.context
      const { sortColumn, defaultSort } = this.props
      return columns.map((column: any, index: number) => {
        const columnsHidden = table.isColumnHidden(index, this.props.fixed)
        const align = column.headerAlign || column.align || ''
        return (
          <th
            key={index}
            className={classnames({
              ['is-hidden']: columnsHidden,
              ['is-sort']: sortColumn ? sortColumn === column : defaultSort && defaultSort.prop === column.prop,
              [`align-${align}`]: align
            }, column.className)}
            onMouseMove={this.handleMouseMove.bind(this, column)}
            onMouseDown={this.handleMouseDown.bind(this, column)}
            onMouseOut={this.handleMouseOut.bind(this)}
          >
            <div className={`${this.prefix}-cell`}>{this.renderLabel(column)}</div>
          </th>
        )
      })
    }
    return null
  }

  render() {
    // const { ...rest } = this.props
    // const viewProps = omit(rest, ['border', 'showHeader'])
    const { columns, bodyWidth, scrollY, barWidth } = this.props
    return (
      <table className={`${this.prefix}-header`} cellPadding={0} cellSpacing={0} style={{borderSpacing: 0, border: 0, width: bodyWidth}}>
        <colgroup>
          {this.context.table.renderCol(columns)}
          {scrollY && <col width={barWidth} style={{ width: barWidth }} />}
        </colgroup>
        <thead>
          <tr>
            {this.renderTr(columns)}
            {scrollY && <th style={{ width: barWidth }} />}
          </tr>
        </thead>
      </table>
    )
  }
}
