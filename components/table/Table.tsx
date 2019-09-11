import * as React from 'react'
import * as ReactDom from 'react-dom'
import classnames from 'classnames'
import omit from 'omit.js'
import PropTypes from 'prop-types'
import View, { ROOT_PREFIX } from '../../libs/view'
import { getScrollBarWidth } from '../../libs/utils'
import Loading from '../loading'
import TableHeader from './Header'
import TableBody from './Body'

export interface TableProps {
  className?: string
  style?: object
  showHeader: boolean
  data: any[]
  columns: any[]
  height?: number
  maxHeight?: number
  stripe: boolean
  border: boolean
  highlightCurrentRow: boolean
  rowClassName?: ((row: object, index: number) => string) | string
  rowStyle?: ((row: object, index: number) => object) | object
  emptyText: string | React.ReactNode
  defaultSort?: {
    prop: string,
    order?: 'desc' | 'asc',
  }
  loading?: boolean
  onCurrentChange?: (row: object, oldRow: object | null) => void
  onSelect?: (row: object, checked: boolean) => void
  onSelectAll?: (rows: any[]) => void
  onSelectChange?: (rows: any[]) => void
  onSort?: (column: object) => void
  onExpand?: (row: any, expanded: boolean) => void
}

export default class Table extends React.Component<TableProps> {
  private prefix = `${ROOT_PREFIX}-table`
  static defaultProps = {
    showHeader: true,
    border: true,
    stripe: true,
    columns: [],
    data: [],
    highlightCurrentRow: false,
    emptyText: '暂无数据',
  }
  static childContextTypes = {
    table: PropTypes.any
  }
  state: any
  tableEl: any
  headerWrapper: any
  bodyWrapper: any
  fixedBodyWrapper: any
  fixedRightBodyWrapper: any
  barWidth: number

  constructor(props: TableProps) {
    super(props)

    this.state = {
      columns: props.columns,
      bodyHeight: null,
      fixedBodyHeight: null,
      headerHeight: null,
      fixedColumns: this.getFixedColumns(props.columns),
      fixedRightColumns: this.getRightFixedColumns(props.columns),
      fixedWidth: null,
      fixedRightWidth: null,
      bodyWidth: null,
      scrollX: null,
      scrollY: null,
      rowIndex: null,
      currentRow: null,
      selectedRows: [],
      sortColumn: null,
      expandingRows: []
    }
    this.barWidth = getScrollBarWidth()
  }

  componentWillReceiveProps(nextProps: TableProps) {
    if (this.props.data !== nextProps.data) {
      this.updateHeight()
    }
  }

  // 获取左侧固定列
  getFixedColumns(columns: any[]) {
    let fixedColumns: any = []
    if (columns.length > 0) {
      fixedColumns = columns.filter(column => column.fixed === true || column.fixed === 'left')
    }
    return fixedColumns
  }

  // 获取右侧固定列
  getRightFixedColumns(columns: any[]) {
    let fixedRightColumns: any = []
    if (columns.length > 0) {
      fixedRightColumns = columns.filter(column => column.fixed === 'right')
    }
    return fixedRightColumns
  }

  getBodyWidth() {
    const { columns } = this.state
    const bodyMinWidth = columns.reduce((pre: any, col: any) => pre + (col.width || col.minWidth || 0), 0)
    const tableElDom = ReactDom.findDOMNode(this.tableEl)
    const flexColumns = columns.filter((column: any) => typeof column.width !== 'number')
    let bodyWidth = (tableElDom as HTMLElement).clientWidth
    if (flexColumns.length > 0) {
      bodyWidth = Math.max(bodyMinWidth, bodyWidth)
    } else {
      bodyWidth = bodyMinWidth
    }
    return bodyWidth
  }

  // 更新鼠标滑过的行
  updateHoverRow(rowIndex: number) {
    this.setState({
      rowIndex
    })
  }

  // 更新固定列的宽度
  updateFixedWidth() {
    let fixedWidth
    let fixedRightWidth
    let scrollX
    const { fixedColumns, fixedRightColumns } = this.state
    if (fixedColumns.length > 0 || fixedRightColumns.length > 0) {
      scrollX = true
      fixedWidth = fixedColumns.reduce((pre: any, col: any) => pre + col.width, 0)
      fixedRightWidth = fixedRightColumns.reduce((pre: any, col: any) => pre + col.width, 0)
    } else {
      scrollX = false
    }
    this.setState({
      fixedWidth,
      fixedRightWidth,
      scrollX
    }, () => {
      this.updateHeight()
    })
  }

  // 判断某列是否隐藏
  isColumnHidden(index: number, fixed: boolean | string) {
    const { columns, fixedRightColumns, fixedColumns } = this.state
    const leftFixedCount = fixedColumns.length
    const rightFixedCount = fixedRightColumns.length
    if (fixed === true || fixed === 'left') {
      return index >= leftFixedCount
    } else if (fixed === 'right') {
      return index < columns.length - rightFixedCount 
    }
    return (index < leftFixedCount)
  }

  // 设置高度
  updateHeight() {
    const { scrollX } = this.state
    const tableElDom = ReactDom.findDOMNode(this.tableEl)
    const tableHeight = (tableElDom as HTMLElement).offsetHeight    

    this.setState({
      bodyWidth: this.getBodyWidth(),
    }, () => {
      let headerHeight = 0
      if (this.headerWrapper) {
        const headerDom = ReactDom.findDOMNode(this.headerWrapper)
        headerHeight = (headerDom as HTMLElement).offsetHeight
      }
      const bodyHeight = tableHeight - headerHeight
      const fixedBodyHeight = bodyHeight - (scrollX ? this.barWidth : 0)
      const bodyWrapperDom = ReactDom.findDOMNode(this.bodyWrapper);
      const bodyTableDom = (bodyWrapperDom as HTMLElement).firstChild;
      const scrollY = (bodyTableDom as HTMLElement).offsetHeight > bodyHeight
      if (scrollY && !scrollX) {
        (tableElDom as HTMLElement).style.borderBottomWidth = '1px'
      }
      this.setState({
        bodyHeight,
        fixedBodyHeight,
        headerHeight,
        scrollY,
        // bodyWidth
      })
    })
  }

  componentDidMount() {
    this.updateFixedWidth()
  }

  // 获取table body高度
  getBodyHeight() {
    const { height, maxHeight } = this.props
    const { bodyHeight, headerHeight } = this.state
    const style: any = {}
    if (height) {
      style.height = bodyHeight
    } else if (maxHeight) {
      style.maxHeight = maxHeight - headerHeight
    }
    return style
  }

  bindRef(key: string) {
    return (node: any) => { this[key] = node}
  }

  getChildContext() {
    return {
      table: this
    }
  }

  // 更新列的宽度
  updateColumnWidth(columns: any) {
    this.setState({
      columns
    }, () => {
      this.setState({
        bodyWidth: this.getBodyWidth()
      })
      this.updateFixedWidth()
    })
  }

  // 滚动条滚动事件
  handleScroll() {
    const { headerWrapper, bodyWrapper, fixedBodyWrapper, fixedRightBodyWrapper } = this
    const bodyWrapperDom = ReactDom.findDOMNode(bodyWrapper)
    if (headerWrapper) {
      const headerWrapperDom = ReactDom.findDOMNode(headerWrapper);
      (headerWrapperDom as Element).scrollLeft = (bodyWrapperDom as Element).scrollLeft
    }
    if (fixedBodyWrapper) {
      const fixedBodyWrapperDom = ReactDom.findDOMNode(fixedBodyWrapper);
      (fixedBodyWrapperDom as Element).scrollTop = (bodyWrapperDom as Element).scrollTop
    }
    if (fixedRightBodyWrapper) {
      const fixedRightBodyWrapperDom = ReactDom.findDOMNode(fixedRightBodyWrapper);
      (fixedRightBodyWrapperDom as Element).scrollTop = (bodyWrapperDom as Element).scrollTop
    }
  }

  // 单选设置选中当前行
  setCurrentRow(row: object) {
    const { currentRow: oldRow } = this.state
    const { onCurrentChange } = this.props
    this.setState({
      currentRow: row
    }, () => {
      onCurrentChange && onCurrentChange(row, oldRow)
    })
  }

  // 判断是否全选
  isAllSelected() {
    // const { currentRowKey, rowKey } = this.props
    const { selectedRows, columns } = this.state
    const { data } = this.props
    const selectableData = columns[0].selectable ? data.filter((row: any, index: number) =>  columns[0].selectable(row, index)) : data.slice()

    if (!selectableData.length) {
      return false;
    }
    return selectedRows && selectedRows.length === selectableData.length
  }

  // 全选复选框点击事件
  toggleAllSelection() {
    const { data, onSelectAll, onSelectChange } = this.props
    const { columns } = this.state
    let tempSelectedRows: any[]
    if (this.isAllSelected()) {
      tempSelectedRows = []
    } else {
      const allSelectableRows = columns[0].selectable ? data.filter((row: any, index: number) =>  columns[0].selectable(row, index)) : data.slice()
      tempSelectedRows = allSelectableRows
    }
    this.setState({
      selectedRows: tempSelectedRows
    }, () => {
      onSelectAll && onSelectAll(tempSelectedRows)
      onSelectChange && onSelectChange(tempSelectedRows)
    })
  }

  // 判断所在行是否被选
  isRowSelected(row: object) {
    // TODO currentRowKey
    const { selectedRows } = this.state
    return selectedRows.includes(row)
  }

  // 复选框点击
  toggleRowSelection(row: object, isSelected?: boolean) {
    const selectedRows = this.state.selectedRows.slice()
    const rowIndex = selectedRows.indexOf(row)
    const { onSelectChange, onSelect } = this.props
    if (isSelected !== undefined) {
      if (isSelected) {
        rowIndex === -1 && selectedRows.push(row)
      } else {
        rowIndex !== -1 && selectedRows.splice(rowIndex, 1)
      }
    } else {
      rowIndex === -1 ? selectedRows.push(row) : selectedRows.splice(rowIndex, 1)
    }
    this.setState({
      selectedRows
    }, () => {
      onSelect && onSelect(row, rowIndex === -1 ? true : false)
      onSelectChange && onSelectChange(selectedRows)
    })
  }

  // 设置排序的列
  setSortColumn(column: object) {
    this.setState({
      sortColumn: column
    }, () => {
      const { onSort } = this.props
      onSort && onSort(column)
    })
  }

  // expand 图标点击
  toggleRowExpanded(row: any) {
    const { expandingRows } = this.state
    const { onExpand } = this.props
    const index = expandingRows.indexOf(row)
    if (index > -1) {
      expandingRows.splice(index, 1)
    } else {
      expandingRows.push(row)
    }
    this.setState({
      expandingRows
    }, () => {
      onExpand && onExpand(row, index > -1 ? false : true)
    })
  }

  // 所在行是否展开
  isRowExpanding(row: any) {
    const { expandingRows } = this.state
    return expandingRows.includes(row)
  }

  // 渲染loading
  renderLoading(loading?: boolean) {
    if (loading) {
      const { headerHeight, bodyHeight } = this.state
      return (
        <Loading className={`${this.prefix}-loading`} style={{height: bodyHeight, top: headerHeight}} />
      )
    }
    return null
  }

  renderCol(columns: any) {
    if (columns.length > 0 ) {
      return columns.map((column: any, index: number) => {
        if (!column.width && (column.type === 'index' || column.type === 'select' || column.type === 'expand')) {
          column.width = 48
        }
        if (!column.width && column.type === 'button') {
          column.width = 72
        }
        return <col width={column.width} style={{ width: column.width }} key={index} />
      })
    }
    return null
  }

  renderHeader(className: string, refName: string, fixed: any = false) {
    let barProps = {}
    let width = this.state.bodyWidth
    if (!fixed) {
      const { scrollY } = this.state
      barProps = {
        scrollY,
        barWidth: this.barWidth
      }
    }
    return (
      <div className={className} ref={this.bindRef(refName)}>
        <TableHeader
          {...this.props}
          columns={this.state.columns}
          fixed={fixed}
          bodyWidth={width}
          sortColumn={this.state.sortColumn}
          {...barProps}
        />
      </div>
    )
  }

  renderBody(className: string, refName: string, fixed: any = false) {
    let sty: any
    let width = this.state.bodyWidth
    if (fixed) {
      sty = { height: `${this.state.fixedBodyHeight}px`, top: `${this.state.headerHeight}px` }
    } else {
      sty = this.getBodyHeight()
    }
    if (this.state.scrollY && (!this.state.scrollX || !fixed)) {
      width = this.state.bodyWidth - this.barWidth
    }
    const renderExpanded = (this.state.columns.find((column: any) => column.type === 'expand') || {}).expandPannel;
    return (
      <div className={className} ref={this.bindRef(refName)} style={sty} onScroll={this.handleScroll.bind(this)}>
        <TableBody
          {...this.props}
          columns={this.state.columns}
          fixed={fixed}
          bodyWidth={width}
          hoverRow={this.state.rowIndex}
          currentRow={this.state.currentRow}
          renderExpanded={renderExpanded}
        />
      </div>
    )
  }

  renderFixedColumns(showHeader: boolean) {
    const { fixedWidth } = this.state
    const sty = {
      width: `${fixedWidth}px`
    }
    return (
      <div className={`${this.prefix}-fixed`} style={sty}>
        {showHeader && this.renderHeader(`${this.prefix}-fixed-header-wrapper`, 'headerFixedWrapper', true)}
        {this.renderBody(`${this.prefix}-fixed-body-wrapper`, 'fixedBodyWrapper', true)}
      </div>
    )
  }

  renderRightFixedColumns(showHeader: boolean) {
    const { fixedRightWidth, scrollY } = this.state
    const sty = {
      width: `${fixedRightWidth}px`,
      right: scrollY ? `${this.barWidth}px` : 0
    }
    return (
      <div className={`${this.prefix}-fixed-right`} style={sty}>
        {showHeader && this.renderHeader(`${this.prefix}-fixed-right-header-wrapper`, 'headerFixedRightWrapper', 'right')}
        {this.renderBody(`${this.prefix}-fixed-right-body-wrapper`, 'fixedRightBodyWrapper', 'right')}
      </div>
    )
  }

  render() {
    const { showHeader, border, stripe, height, maxHeight, loading, ...rest } = this.props
    const viewProps = omit(rest, ['columns', 'data', 'rowClassName', 'highlightCurrentRow', 'onCurrentChange', 'onSelectChange', 'onSelectAll', 'onSelect', 'onSort', 'emptyText', 'defaultSort', 'onExpand', 'rowStyle'])
    const { fixedColumns, fixedRightColumns, scrollY, headerHeight } = this.state
    const cls = classnames({
      [`${this.prefix}-border`]: !!border,
      [`${this.prefix}-stripe`]: !!stripe,
    })
    const sty: any = {}
    if (height) {
      sty.height = `${height}px` 
    }
    if (maxHeight) {
      sty.maxHeight = `${maxHeight}px`
    }
    return (
      <View config={{...viewProps, prefix: this.prefix, cls, sty}} ref={this.bindRef('tableEl')}>
        {showHeader && this.renderHeader(`${this.prefix}-header-wrapper`, 'headerWrapper')}
        {this.renderBody(`${this.prefix}-body-wrapper`, 'bodyWrapper')}
        {fixedColumns.length > 0 && this.renderFixedColumns(showHeader)}
        {fixedRightColumns.length > 0 && this.renderRightFixedColumns(showHeader)}
        {scrollY && <div className={`${this.prefix}-gutter`} style={{ width: this.barWidth, height: `${headerHeight}px` }} />}
        <div className={`${this.prefix}-resize-proxy`} ref={this.bindRef('resizeProxy')} style={{ visibility: 'hidden' }} />
        {this.renderLoading(loading)}
      </View>
    )
  }
}
