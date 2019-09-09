import * as React from 'react'
import * as ReactDOM from 'react-dom'
import classnames from 'classnames'
import omit from 'omit.js'
import View, { ROOT_PREFIX } from '../../libs/view'
import WindowEventHandler from '../../libs/windowEventHandler'
import Loading from '../loading'

export interface InfiniteScrollProps {
  className?: string
  style?: object
  useWindow: boolean
  hasMore: boolean
  initialLoad?: boolean
  offset: number
  loader: string | React.ReactNode
  end: string | React.ReactNode
  loadMore?: (() => Promise<unknown>) | ((closing?: () => void) => void)
}

export default class InfiniteScroll extends React.Component<InfiniteScrollProps> {
  private prefix = `${ROOT_PREFIX}-infinite-scroll`
  scrolNode: any
  state: any
  static defaultProps = {
    useWindow: false,
    offset: 20,
    hasMore: true,
    initialLoad: false,
    loader: <Loading><div style={{ height: '40px' }} /></Loading>,
    end: '没有更多数据了'
  }

  constructor(props: InfiniteScrollProps) {
    super(props)

    this.state = {
      loading: false,
      mounted: false
    }
  }

  componentDidMount() {
    this.setState({
      mounted: true
    })
    const { initialLoad, loadMore } = this.props
    initialLoad && loadMore && loadMore()
  }

  stopLoading() {
    this.setState({
      loading: false
    })
  }

  calculateTopPosition(element: any): any {
    if (!element) {
      return 0
    }
    return element.offsetTop + this.calculateTopPosition(element.offsetParent)
  }

  getWindowTop() {
    return window.pageYOffset !== undefined
      ? window.pageYOffset
      : (
          document.documentElement ||
          (document.body.parentNode as HTMLHtmlElement) ||
          document.body
        ).scrollTop
  }

  isAtBottom() {
    const { offset, useWindow } = this.props
    const dom = ReactDOM.findDOMNode(this.scrolNode) as HTMLElement
    let distance
    if (useWindow) {
      const windowTop = this.getWindowTop()
      distance = this.calculateTopPosition(dom) +
      dom.offsetHeight -
        windowTop -
        window.innerHeight
    } else {
      const { scrollHeight, clientHeight, scrollTop } = dom
      distance = scrollHeight - clientHeight - scrollTop
    }
    return distance < offset
  }

  handleScroll() {
    const { hasMore, loadMore } = this.props
    const { loading } = this.state
    if (!hasMore || loading || !this.isAtBottom()) {
      return
    }
    this.setState({
      loading: true
    })
    if (loadMore) {
      if (loadMore.length > 0) {
        loadMore(this.stopLoading.bind(this))
      } else {
        (loadMore() as Promise<unknown>)
          .then(this.stopLoading.bind(this))
          .catch(this.stopLoading.bind(this))
      }
    }
  }

  getTarget() {
    const { useWindow } = this.props
    if (useWindow) {
      return ''
    }
    return this.scrolNode.refs.viewRef
  }

  renderLoader(loader: any) {
    if (typeof loader === 'string') {
      return <div className={`${this.prefix}-loader`}>{loader}</div>
    }
    return loader
  }

  renderEnd(end: any) {
    if (typeof end === 'string') {
      return <div className={`${this.prefix}-end`}>{end}</div>
    }
    return end
  }

  render() {
    const { useWindow, hasMore, loader, end, children, ...rest } = this.props
    const viewProps = omit(rest, ['loadMore', 'initialLoad', 'offset'])
    const { loading, mounted } = this.state
    const cls = classnames({
      [`${this.prefix}-y`]: !useWindow
    })
    return (
      <View ref={node => this.scrolNode = node} config={{...viewProps, prefix: this.prefix, cls}}>
        {children}
        {loading && hasMore && this.renderLoader(loader)}
        {!hasMore && this.renderEnd(end)}
        {mounted && <WindowEventHandler target={this.getTarget()} name='scroll' callback={this.handleScroll.bind(this)} />}
      </View>
    )
  }
}
