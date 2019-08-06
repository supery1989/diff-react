import * as React from 'react'
import omit from 'omit.js'
import Popover from 'components/popover'
import View, { ROOT_PREFIX } from 'libs/view'

export interface CropLineProps {
  className?: string
  style?: object
  text?: string
  extra?: React.ReactNode | string
  lines: number
  ellipsis: string
  showInfo: boolean
  infoTrigger: 'hover' | 'click' | 'focus'
}

export default class CropLine extends React.Component<CropLineProps> {
  private prefix = `${ROOT_PREFIX}-crop-line`
  static defaultProps = {
    lines: 2,
    ellipsis: '...',
    showInfo: true,
    infoTrigger: 'hover'
  }
  element: any
  textNode: any
  lineHeight: number
  maxHeight: number
  state: any

  constructor(props: CropLineProps) {
    super(props)

    this.state = {
      original: props.text || '',
      content: '.',
      noCrop: false,
      popWidth: 150
    }
  }

  componentDidUpdate(prevProps: CropLineProps) {
    const { text } = prevProps
    if (text && text !== this.state.original) {
      this.calcText()
    }
  }

  componentDidMount() {
    const { text } = this.props
    if (text) {
      this.lineHeight = this.element.clientHeight + 1
      this.calcText()
    }
  }

  componentWillReceiveProps(nextProps: CropLineProps) {
    if (this.props.text !== nextProps.text) {
      this.setState({
        original: nextProps.text,
        noCrop: false
      })
    }
  }

  getEllipsis() {
    return !this.state.noCrop ? this.props.ellipsis : ''
  }

  calcText() {
    const { original } = this.state
    const { lines } = this.props
    this.maxHeight = this.lineHeight * lines + 1
    let start = 0
    let middle = 0
    let end = original.length
    if (!this.textNode) {
      return
    }
    this.setState({
      content: ''
    })
    while(start <= end) {
      middle = Math.floor((start + end) / 2)
      this.textNode.textContent = original.slice(0, middle) + this.getEllipsis()
      if (middle === original.length) {
        this.setState({
          content: original,
          noCrop: true,
          popWidth: this.element.clientWidth
        })
        return
      }
      if (this.element.clientHeight <= this.maxHeight) {
        start = middle + 1
      } else {
        end = middle - 1
      }
    }
    const content = original.slice(0, middle - 1) + this.getEllipsis()
    this.textNode.textContent = content
    this.setState({
      content,
      popWidth: this.element.clientWidth
    })
  }

  showMore() {
    this.setState({
      noCrop: true,
      content: this.state.original
    })
  }

  renderCropText() {
    const { extra, ...rest } = this.props
    const viewProps = omit(rest, ['lines', 'ellipsis', 'showInfo', 'text', 'infoTrigger'])
    const { content } = this.state
    const sty = { maxHeight: this.maxHeight, overflowY: 'hidden' }
    return (
      <View config={{...viewProps, prefix: this.prefix, sty}}>
        <div ref={(node: any) => this.element = node}>
          <span ref={(node: any) => this.textNode = node}>{content}</span>
          <span className={`${this.prefix}-extra`} onClick={this.showMore.bind(this)}>{extra}</span>
        </div>
      </View>
    )
  }

  render() {
    const { text, showInfo, extra, infoTrigger, ...rest } = this.props
    const { noCrop, content, popWidth } = this.state
    const viewProps = omit(rest, ['lines', 'ellipsis'])
    if (!text) {
      return null
    }
    if (noCrop) {
      return (
        <View config={{...viewProps, prefix: this.prefix}}>
          {content}
        </View>
      )
    }
    if (!extra && showInfo) {
      return (
        <Popover show={this.state.show} width={popWidth} placement='top' popClass={`${this.prefix}-popover`} trigger={infoTrigger} content={text}>
          {this.renderCropText()}
        </Popover>
      )
    }
    return this.renderCropText()
  }
}
