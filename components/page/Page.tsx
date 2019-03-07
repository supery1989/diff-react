import * as React from 'react'
import classnames from 'classnames'
import omit from 'omit.js'
import uuid from 'uuid'
import View, { ROOT_PREFIX } from 'libs/view'
import Icon from 'components/icon'
import Input from 'components/input'
import Toast from 'components/toast'
import Select from 'components/select'

export interface PageProps {
  className?: string
  style?: object
  // 总条数
  total: number
  // 最多显示页数按钮数量
  pagerCount: number
  showPrev: boolean
  showNext: boolean
  showJumper?: boolean
  pageSizes?: boolean | number[]
  small?: boolean
  // 只有一页时是否隐藏分页器
  hideOnSinglePage?: boolean
  prevBtnText: string | React.ReactNode
  nextBtnText: string | React.ReactNode
  showTotal?: (total: number, range?: number[]) => React.ReactNode | boolean
  onChange?: (page: number, pageSize?: number) => void
}

export default class Page extends React.Component<PageProps> {
  private prefix = `${ROOT_PREFIX}-page`
  static defaultProps = {
    pagerCount: 7,
    showPrev: true,
    showNext: true,
    pageSize: 10,
    total: 1,
    showTotal: false,
    prevBtnText: <Icon type='left' />,
    nextBtnText: <Icon type='right' />,
  }
  state: any

  constructor(props: PageProps) {
    super(props)

    this.state = {
      active: 1,
      showPrevBtn: false,
      showNextBtn: false,
      prevBtnIconType: 'ellipsis',
      nextBtnIconType: 'ellipsis',
      pageCount: Math.ceil(props.total / 10),
      pageSize: 10
    }
  }

  componentWillReceiveProps(nextProps: PageProps) {
    if (this.props.total !== nextProps.total) {
      this.setState({
        pageCount: Math.ceil(nextProps.total / 10),
      }, () => {
        this.selected(this.state.active)
      })
    }
  }

  componentDidMount() {
    this.selected(this.state.active)
  }

  setPages() {
    const { pagerCount } = this.props
    const { active, showPrevBtn, showNextBtn, pageCount } = this.state
    let arr = []
    if (showPrevBtn && !showNextBtn) {
      const start = pageCount - (pagerCount - 2)
      for (let i = start; i < pageCount; i++) {
        arr.push(i)
      }
    } else if (!showPrevBtn && showNextBtn) {
      for (let i = 2; i < pagerCount; i++) {
        arr.push(i)
      }
    } else if (showPrevBtn && showNextBtn) {
      const offset = Math.floor(pagerCount / 2) - 1
      for (let i = active - offset; i <= offset + active; i++) {
        arr.push(i)
      }
    } else {
      for (let i = 2; i < pageCount; i++) {
        arr.push(i)
      }
    }
    return arr
  }

  selected(page: number) {
    const { pagerCount, onChange } = this.props
    const { pageCount, pageSize } = this.state
    this.setState({
      active: page
    }, () => {
      let showPrev = false
      let showNext = false
      if (pagerCount < pageCount) {
        if (this.state.active > pagerCount - 3) {
          showPrev = true
        }
        if (this.state.active < pageCount - 3) {
          showNext = true
        }
      }
      this.setState({
        showPrevBtn: showPrev,
        showNextBtn: showNext
      })
    })
    onChange && onChange(page, pageSize)
  }

  prevBtnEnter() {
    this.setState({
      prevBtnIconType: 'doubleleft'
    })
  }

  prevBtnLeave() {
    this.setState({
      prevBtnIconType: 'ellipsis'
    })
  }

  nextBtnEnter() {
    this.setState({
      nextBtnIconType: 'doubleright'
    })
  }

  nextBtnLeave() {
    this.setState({
      nextBtnIconType: 'ellipsis'
    })
  }

  prev() {
    if (this.state.active > 1) {
      this.selected(this.state.active - 1)
    }
  }

  next() {
    if (this.state.active < this.state.pageCount) {
      this.selected(this.state.active + 1)
    }
  }

  getPerPageSize() {
    const { active, pageSize, pageCount } = this.state
    const { total } = this.props
    if (active === pageCount) {
      return total
    }
    return pageSize * active
  }

  jumperHander(value: number) {
    const { pageCount } = this.state
    if (!(/^[0-9]*$/.test(String(value)))) {
      Toast({
        message: `页数应输入数字，范围0~${pageCount}`
      }, 'warning')
      return
    }
    if (value < 1) {
      Toast({
        message: `前往页数不正确，最小为1页`
      }, 'warning')
      return
    }
    if (value > pageCount) {
      Toast({
        message: `前往页数不正确，最大为${pageCount}页`
      }, 'warning')
      return
    }
    if (value < 1) {
      Toast({
        message: `前往页数不正确，最小为1页`
      }, 'warning')
      return
    }
    this.selected(Number(value))
  }

  sizeChange(value: any) {
    this.setState({
      pageSize: value,
      pageCount: Math.ceil(this.props.total / value)
    }, () => {
      this.selected(this.state.active)
    })
  }

  renderTotal() {
    const { showTotal, total } = this.props
    const { active, pageSize } = this.state
    if (showTotal) {
      if (typeof showTotal === 'boolean') {
        return <span className={`${this.prefix}-total`}>共 {total} 条</span>
      } else if (typeof showTotal === 'function') {
        const range = [(active -1) * pageSize + 1, this.getPerPageSize()]
        return <span className={`${this.prefix}-total`}>{showTotal(total, range)}</span>
      }
    }
    return null
  }

  renderPageSizes() {
    const { pageSizes } = this.props
    if (pageSizes) {
      let sizes: any = null
      if (typeof pageSizes === 'boolean') {
        sizes = [10, 15, 20, 30, 50]
      } else if (typeof pageSizes === 'object') {
        sizes = pageSizes
      }
      if (sizes) {
        return (
          <li className={`${this.prefix}-sizes`}>
            <Select style={{width: '100px'}} clearable={false} value={sizes[0]} onChange={this.sizeChange.bind(this)}>
              {sizes.map((size: number, key: number) => {
                return <Select.Option key={key} value={size} label={`${size} 条/页`} />
              })}
            </Select>
          </li>
        )
      }
    }
    return null
  }

  renderPrev(showPrev: boolean) {
    if (showPrev) {
      const cls = classnames(`${this.prefix}-item`, {
        [`${this.prefix}-item-disabled`]: this.state.active === 1
      })
      return (
        <li className={cls} onClick={this.prev.bind(this)}>{this.props.prevBtnText}</li>
      )
    }
    return null
  }

  renderNext(showNext: boolean) {
    if (showNext) {
      const cls = classnames(`${this.prefix}-item`, {
        [`${this.prefix}-item-disabled`]: this.state.active === this.state.pageCount
      })
      return (
        <li className={cls} onClick={this.next.bind(this)}>{this.props.nextBtnText}</li>
      )
    }
    return null
  }

  renderPageItem(page: number) {
    const { active } = this.state
    const cls = classnames(`${this.prefix}-item`, {
      [`${this.prefix}-item-selected`]: active === page
    })
    return <li key={uuid.v1()} className={cls} onClick={this.selected.bind(this, page)}>{page}</li>
  }

  renderPages() {
    const pages = this.setPages()    
    if (pages.length) {
      return pages.map((page: number) => {
        return this.renderPageItem(page)
      })
    }
    return null
  }

  renderJumper() {
    const { showJumper } = this.props
    const { active } = this.state
    if (showJumper) {
      return <li className={`${this.prefix}-jumper`}>前往 <Input className={`${this.prefix}-jumper-input`} clearable={false} value={active} placeholder='' onEnter={this.jumperHander.bind(this)} /> 页</li>
    }
    return null
  }

  render() {
    const { showPrev, showNext, small, hideOnSinglePage, ...rest } = this.props
    const viewProps = omit(rest, ['pagerCount', 'pagerCount', 'onChange', 'pageSize', 'total', 'showTotal', 'showJumper', 'pageSizes', 'prevBtnText', 'nextBtnText'])
    const { showPrevBtn, showNextBtn, prevBtnIconType, nextBtnIconType, pageCount } = this.state
    const cls = classnames({
      [`${this.prefix}-small`]: !!small
    })
    if (pageCount === 1 && hideOnSinglePage) {
      return null
    }
    return (
      <View config={{...viewProps, prefix: this.prefix, cls}} tag='ul'>
        {this.renderTotal()}
        {this.renderPageSizes()}
        {this.renderPrev(showPrev)}
        {pageCount > 0 && this.renderPageItem(1)}
        {showPrevBtn && <li
          className={`${this.prefix}-item`}
          onMouseEnter={this.prevBtnEnter.bind(this)}
          onMouseLeave={this.prevBtnLeave.bind(this)}
          onClick={this.prev.bind(this)}
        >
          <Icon type={prevBtnIconType} />
        </li>}
        {this.renderPages()}
        {showNextBtn && <li
          className={`${this.prefix}-item`}
          onMouseEnter={this.nextBtnEnter.bind(this)}
          onMouseLeave={this.nextBtnLeave.bind(this)}
          onClick={this.next.bind(this)}
        >
          <Icon type={nextBtnIconType} />
        </li>}
        {pageCount > 1 && this.renderPageItem(pageCount)}
        {this.renderNext(showNext)}
        {this.renderJumper()}
      </View>
    )
  }
}
