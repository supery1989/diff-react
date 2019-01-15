
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Canvas from './Canvas'

export default function Toast(props: any={}, type: string) {
  const dom = document.createElement('div')
  let messageBox = document.getElementsByClassName('diff-toast-wrapper')[0]
  if (messageBox) {
    messageBox.appendChild(dom)
  } else {
    messageBox = document.createElement('div')
    messageBox.className = 'diff-toast-wrapper'
    messageBox.appendChild(dom)
    document.body.appendChild(messageBox)
  }

  if (typeof props === 'string' || React.isValidElement(props)) {
    props = {
      message: props
    }
  }

  if (props.position) {
    switch(props.position) {
      case 'top':
        (messageBox as HTMLElement).setAttribute("style", "top: 16px; bottom: unset")
        break
      case 'bottom':
      (messageBox as HTMLElement).setAttribute("style", "bottom: 16px; top: unset")
        break
      case 'middle':
        (messageBox as HTMLElement).setAttribute("style", "bottom: unset; top: 50%")
        break
      default:
        (messageBox as HTMLElement).setAttribute("style", props.position)
        break
    }
  } else {
    (messageBox as HTMLElement).style.top = '16px'
  }

  if (type) {
    props.type = type
  }

  const component = React.createElement((Canvas as any), Object.assign(props, {
    willUnmount: () => {
      ReactDOM.unmountComponentAtNode(dom)
      messageBox.removeChild(dom)

      if (props.onClose instanceof Function) {
        props.onClose()
      }
    }
  }))

  ReactDOM.render(component, dom)
}

['success', 'error', 'warning', 'info'].forEach(type => {
  Toast[type] = (options = {}) => {
    return Toast(options, type)
  }
})
