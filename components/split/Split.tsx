import * as React from 'react'
import * as ReactDom from 'react-dom'
import classnames from 'classnames'
import omit from 'omit.js'
import View, { ROOT_PREFIX } from 'libs/view'
import WindowEventHandler from 'libs/windowEventHandler/index'

export interface SplitProps {
  className?: string
  style?: object
  lineBar?: boolean
  onDragging?: (preSize: number, nextSize: number, paneNumber: number) => void
  onDragEnd?: (preSize: number, nextSize: number, paneNumber: number) => void
  mode: 'h' | 'v'
  disable: boolean | Array<number>
  visiable: boolean | Array<number>
}

export default class Split extends React.Component<SplitProps> {
  private prefix = `${ROOT_PREFIX}-split`
  static defaultProps = {
    mode: 'h',
    disable: false,
    visiable: true
  }
  move: boolean
  wrapper: any
  panelNumber: number
  startX: number
  startY: number
  target: any
  boxWidth: number
  boxHeight: number
  preWidth: number
  preHeight: number
  nextWidth: number
  nextHeight: number
  preSize: number
  nextSize: number
  state: any

  constructor(props: SplitProps) {
    super(props)

    this.state = {
      dragging: false
    }
  }

  onMouseDown(paneNumber: number, e: any) {
    if (!e.target || !this.wrapper) {
      return
    }
    this.panelNumber = paneNumber
    this.startX = e.clientX
    this.startY = e.clientY
    this.move = true
    this.target = e.target as HTMLDivElement
    const prevNode = this.target.previousElementSibling
    const nextNode = this.target.nextElementSibling
    const wrapperNode = ReactDom.findDOMNode(this.wrapper) as HTMLElement
    this.boxWidth = wrapperNode.clientWidth
    this.boxHeight = wrapperNode.clientHeight
    if (prevNode) {
      this.preWidth = prevNode.clientWidth
      this.preHeight = prevNode.clientHeight
    }
    if (nextNode) {
      this.nextWidth = nextNode.clientWidth
      this.nextHeight = nextNode.clientHeight
    }
    this.setState({ dragging: true })
  }

  onDragging(e: any) {
    if (!this.move) return
    if (!this.state.dragging) {
      this.setState({ dragging: true })
    }
    const { mode, onDragging } = this.props
    const nextNode = this.target.nextElementSibling
    const prevNode = this.target.previousElementSibling
    const x = e.clientX - this.startX
    const y = e.clientY - this.startY
    this.preSize = 0
    this.nextSize = 0
    if (mode === 'h') {
      this.preSize = this.preWidth + x > -1 ? this.preWidth + x : 0
      this.nextSize = this.nextWidth - x > -1 ? this.nextWidth - x : 0
      if (this.preSize === 0 || this.nextSize === 0) {
        return
      }
      this.preSize = (this.preSize / this.boxWidth >= 1 ? 1 : this.preSize / this.boxWidth) * 100
      this.nextSize = (this.nextSize / this.boxWidth >= 1 ? 1 : this.nextSize / this.boxWidth) * 100
      if (nextNode && prevNode) {
        prevNode.style.width = `${this.preSize}%`
        nextNode.style.width = `${this.nextSize}%`
      }
    }
    if (mode === 'v' && this.preHeight + y > -1 && this.nextHeight - y > -1) {
      this.preSize = this.preHeight + y > -1 ? this.preHeight + y : 0
      this.nextSize = this.nextHeight - y > -1 ? this.nextHeight - y : 0
      this.preSize = (this.preSize / this.boxHeight >= 1 ? 1 : this.preSize / this.boxHeight) * 100
      this.nextSize = (this.nextSize / this.boxHeight >= 1 ? 1 : this.nextSize / this.boxHeight) * 100
      if (this.preSize === 0 || this.nextSize === 0) {
        return
      }
      if (prevNode && nextNode) {
        prevNode.style.height = `${this.preSize}%`
        nextNode.style.height = `${this.nextSize}%`
      }
    }
    onDragging && onDragging(this.preSize, this.nextSize, this.panelNumber)
  }

  onDragEnd() {
    const { onDragEnd } = this.props
    this.move = false
    this.setState({ dragging: false })
    onDragEnd && onDragEnd(this.preSize, this.nextSize, this.panelNumber)
  }

  render() {
    const { lineBar, mode, disable, visiable, children, ...rest } = this.props
    const viewProps = omit(rest, ['onDragging', 'onDragEnd'])
    const cls = classnames({
      [`${this.prefix}-${mode}`]: mode
    })
    return (
      <View config={{...viewProps, prefix: this.prefix, cls}} ref={(node: any) => this.wrapper = node}>
        {React.Children.map(children, (element: any, index: number) => {
          const props = Object.assign({}, element.props, {
            className: classnames(`${this.prefix}-panel`, element.props.className)
          })
          const visiableBar = (visiable === true || (visiable && (visiable as any).includes((index + 1) as never))) || false
          const barProps = {
            className: classnames(`${this.prefix}-bar`, {
              [`${this.prefix}-line`]: !!lineBar
            }),
            onMouseDown: this.onMouseDown.bind(this, index + 1)
          }
          if (disable === true || (disable && (disable as any).includes((index + 1) as never))) {
            barProps.className = classnames(barProps.className, { disable });
            delete barProps.onMouseDown
          }
          return (
            <React.Fragment>
              {index !== 0 && visiableBar && React.createElement('div', { ...barProps })}
              {React.cloneElement(element, { ...props })}
              <WindowEventHandler name='mousemove' callback={this.onDragging.bind(this)} />
              <WindowEventHandler name='mouseup' callback={this.onDragEnd.bind(this)} />
            </React.Fragment>
          )
        })}
      </View>
    )
  }
}
