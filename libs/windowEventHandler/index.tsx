import * as React from 'react'
import addEventListener from 'add-dom-event-listener'

export interface WindowEventHandlerProps {
  // 需为id
  target?: string
  name: string
  callback: () => void
}

export default class WindowEventHandler extends React.Component<WindowEventHandlerProps>{
  scrollEvent: any

  getTarget() {
    if (this.props.target) {
      return document.getElementById(this.props.target)
    } else {
      return window
    }
  }

  componentDidMount() {
    const { name, callback } = this.props
    this.scrollEvent = addEventListener(this.getTarget(), name, callback)
  }

  componentWillUnmount() {
    this.scrollEvent.remove()
  }

  render() {
    return null
  }
}
