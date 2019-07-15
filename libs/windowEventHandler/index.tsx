import * as React from 'react'
import addEventListener from 'add-dom-event-listener'

export interface WindowEventHandlerProps {
  // 需为id
  target?: string | HTMLDivElement
  name: string
  callback: () => void
}

export default class WindowEventHandler extends React.Component<WindowEventHandlerProps>{
  scrollEvent: any

  getTarget() {
    const { target } = this.props
    if (target) {
      if (typeof target === 'string') {
        return document.getElementById(target)
      }
      return target
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
