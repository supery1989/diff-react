import * as React from 'react'
import classnames from 'classnames'
import omit from 'omit.js'
import Icon from '../icon'
import View, { ROOT_PREFIX } from '../../libs/view'

export interface TabsProps {
  className?: string
  style?: object
  current?: string | number
  type?: 'card' | 'tab'
  children: any
  closable?: boolean
  addable?: boolean
  extra?: string | React.ReactNode
  onAdd?: () => void
  onTabClick?: (name: any, content: any) => void
  onDelete?: (name: any, content: any) => void
}

export default class Tabs extends React.Component<TabsProps> {
  private prefix = `${ROOT_PREFIX}-tabs`
  static Pane: any
  state: any
  tabs: any[]

  constructor(props: TabsProps) {
    super(props)
    const child = React.Children.toArray(props.children)
    this.state = {
      current: props.current || 0,
      barStyle: {},
      navStyle: {
        transform: ''
      },
      children: child,
      scrollable: false,
      scrollablePrev: false,
      scrollableNext: false,
    }
  }

  componentWillReceiveProps(nextProps: TabsProps) {
    if (nextProps.current !== this.props.current) {
      this.setState({
        current: nextProps.current
      }, () => {
        this.calcBarStyle()
      })
    }
    if (nextProps.children !== this.props.children) {
      this.setState({
        children: React.Children.toArray(nextProps.children)
      }, () => {
        this.update()
      })
    }
  }

  componentDidMount() {
    this.calcBarStyle()
    this.update()
  }

  update() {
    const navWidth = (this.refs.nav as HTMLElement).offsetWidth
    const wrapperWidth = (this.refs.scroll as HTMLElement).offsetWidth
    const currentOffset = this.getCurrentScrollOffset()
    if (wrapperWidth < navWidth) {
      this.setState({
        scrollable: true,
        scrollablePrev: currentOffset,
        scrollableNext: currentOffset + wrapperWidth < navWidth,
      })

      if (navWidth - currentOffset < wrapperWidth) {
        this.setOffset(navWidth - wrapperWidth)
      }
    } else {
      this.setState({
        scrollable: false,
      })
      if (currentOffset > 0) {
        this.setOffset(0)
      }
    }
  }

  getCurrentScrollOffset() {
    const { navStyle } = this.state
    return navStyle.transform
      ? Number(navStyle.transform.replace(/[^0-9]/ig,''))
      : 0
  }

  setOffset(value: number) {
    this.setState({
      navStyle: {
        transform: `translateX(-${value}px)`,
      }
    }, () => {
      this.update()
    })
  }

  calcBarStyle() {
    const { type } = this.props
    if (type || !this.tabs.length) return {}
    let style: any = {}
    let offset = 0
    let tabWidth = 0
    let children = this.state.children instanceof Array ? this.state.children : [this.state.children]

    children.every((item: any, index: number) => {
      let $el = this.tabs[index]
      let { name } = item.props
      if (name === undefined) {
        name = index
      }
      if (name !== this.state.current) {
        offset += $el.offsetWidth
        return true
      } else {
        tabWidth = $el.offsetWidth
        return false
      }
    })
    style.width = tabWidth + 'px'
    style.transform = `translateX(${offset}px)`
    this.setState({
      barStyle: style,
    })
    return style
  }

  handleTabClick(element: any, index: number, e: any) {
    if (e.target.className.indexOf(`${this.prefix}-close`) > -1) return
    const { disabled, name } = element.props
    if (disabled) {
      return false
    }
    const cur = name === undefined ? index : name
    this.setState({
      current: cur
    }, () => {
      const { onTabClick } = this.props
      this.calcBarStyle()
      // this.scrollToActiveTab()
      const { content } = element.props
      onTabClick && onTabClick(cur, content)
    })
    return true
  }

  handleTabRemove(element: any, index: number) {
    const { children, current } = this.state
    const { onDelete } = this.props
    if (children[index].props.name === current) {
      const nextChild = children[index + 1]
      const prevChild = children[index - 1]
      this.setState({
        current: (nextChild && !nextChild.props.disabled) ? nextChild.props.name : (prevChild && !prevChild.props.disabled) ? prevChild.props.name : '-1'
      })
    }
    children.splice(index, 1)
    this.setState({
      children
    }, () => {
      this.calcBarStyle()
    })
    const { name, content } = element.props
    const cur = name === undefined ? index : name
    onDelete && onDelete(cur, content)
  }

  handleTabAdd() {
    const { onAdd } = this.props
    onAdd && onAdd()
  }

  handlePrev() {
    const { scrollablePrev } = this.state
    if (!scrollablePrev) return
    const wrapperWidth = (this.refs.scroll as HTMLElement).offsetWidth
    const currentOffset = this.getCurrentScrollOffset()
    if (!currentOffset) return
    let newOffset = currentOffset > wrapperWidth
      ? currentOffset - wrapperWidth
      : 0
    this.setOffset(newOffset)
  }

  handleNext() {
    const { scrollableNext } = this.state
    if (!scrollableNext) return
    const navWidth = (this.refs.nav as HTMLElement).offsetWidth
    const wrapperWidth = (this.refs.scroll as HTMLElement).offsetWidth
    const currentOffset = this.getCurrentScrollOffset()
    if (navWidth - currentOffset <= wrapperWidth) return
    let newOffset = navWidth - currentOffset > wrapperWidth * 2
      ? currentOffset + wrapperWidth
      : (navWidth - wrapperWidth)
    this.setOffset(newOffset)
  }

  renderAdd() {
    const { addable } = this.props
    if (!addable) return
    return <Icon type='plussquare-o' className={`${this.prefix}-add`} onClick={this.handleTabAdd.bind(this)} />
  }

  renderExtra() {
    const { extra } = this.props
    if (!extra) return
    return 
  }

  renderRight() {
    const { addable, extra } = this.props
    if (!addable && !extra) {
      return null
    }
    return (
      <div className={`${this.prefix}-right`}>
        {extra && <span className={`${this.prefix}-right-extra`}>{extra}</span>}
        {addable && <Icon type='plussquare-o' className={`${this.prefix}-right-add`} onClick={this.handleTabAdd.bind(this)} />}
      </div>
    )
  }

  renderScroll() {
    const { scrollable, scrollablePrev, scrollableNext } = this.state
    if (!scrollable) return
    const prevCls = classnames(`${this.prefix}-scroll-btn`, `${this.prefix}-prev-btn`, {
      [`${this.prefix}-scroll-btn-disabled`]: !scrollablePrev
    })
    const nextCls = classnames(`${this.prefix}-scroll-btn`, `${this.prefix}-next-btn`, {
      [`${this.prefix}-scroll-btn-disabled`]: !scrollableNext
    })
    return (
      [
        (<span key={`${this.prefix}-prev-btn`} className={prevCls} onClick={this.handlePrev.bind(this)}><Icon type='left' /></span>),
        (<span key={`${this.prefix}-next-btn`} className={nextCls} onClick={this.handleNext.bind(this)}><Icon type='right' /></span>)
      ]
    )
  }

  renderNav() {
    const { children } = this.state
    this.tabs = []
    return React.Children.map(children, (element: any, index: number) => {
      if (!element) return null
      const { label, disabled, closable } = element.props
      let { name } = element.props
      if (name === undefined) {
        name = index
      }
      const { current } = this.state
      const isClose = (!!this.props.closable || !!closable) && !disabled
      const tabCls = classnames(`${this.prefix}-item`, {
        [`${this.prefix}-item-current`]: current === name,
        [`${this.prefix}-item-disabled`]: !!disabled,
        [`${this.prefix}-item-closable`]: isClose,
      })
      return (
        <div
          key={`${this.prefix}-item-${index}`}
          className={tabCls}
          ref={(node: any) => node && this.tabs.push(node)}
          onClick={this.handleTabClick.bind(this, element, index)}
        >
          {label}
          {isClose && <Icon type='close' className={`${this.prefix}-close`} onClick={this.handleTabRemove.bind(this, element, index)} />}
        </div>
      )
    })
  }

  renderContent() {
    const { children } = this.state
    return React.Children.map(children, (element: any, index: number) => {
      if (!element) return null
      let { name } = element.props
      if (name === undefined) {
        name = index
      }
      const { current } = this.state
      if (name === current ) {
        return element
      }
    })
  }

  render() {
    const { type, extra, ...rest } = this.props
    const viewProps = omit(rest, ['closable', 'addable', 'onTabClick', 'onAdd', 'current', 'onDelete'])
    const { barStyle, scrollable, navStyle } = this.state
    const cls = classnames({
      [`${this.prefix}-${type}`]: type
    })
    const wrapCls = classnames(`${this.prefix}-nav-wrap`, {
      [`${this.prefix}-nav-scrollable`]: !!scrollable,
      [`${this.prefix}-nav-extra`]: extra
    })
    return (
      <View config={{...viewProps, prefix: this.prefix, cls}}>
        <div className={`${this.prefix}-header`}>
          {this.renderRight()}
          {/* {this.renderExtra()} */}
          <div className={wrapCls}>
            {this.renderScroll()}
            <div className={`${this.prefix}-nav-scroll`} ref='scroll'>
              <div className={`${this.prefix}-nav`} style={navStyle} ref='nav'>
                {this.renderNav()}
                <div className={`${this.prefix}-bar`} style={barStyle} />
              </div>
            </div>
          </div>
        </div>
        <div className={`${this.prefix}-content`}>{this.renderContent()}</div>
      </View>
    )
  }
}
