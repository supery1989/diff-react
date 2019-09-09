import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { ROOT_PREFIX } from 'libs/view'
import Popup from '../popup'

export function setDom(prefix: string) {
  const dom = document.createElement('div')
  let messageBox = document.getElementsByClassName(`${prefix}-wrapper`)[0]
  if (messageBox) {
    messageBox.appendChild(dom)
  } else {
    messageBox = document.createElement('div')
    messageBox.className = `${prefix}-wrapper`
    messageBox.appendChild(dom)
    document.body.appendChild(messageBox)
  }
  return { dom, messageBox }
}

export function setProps(props: any, type: string, prefix: string) {
  if (typeof props === 'string' || typeof props === 'object' || typeof props === 'boolean' || React.isValidElement(props)) {
    if (typeof props !== 'object') {
      if (typeof props === 'boolean') {
        props = String(props)
      }
      props = {
        message: props
      }
    }
  } else {
    Popup({
      title: '警告',
      message: '参数类型不对，应为string、boolean或者react元素',
      showOkBtn: false
    }, 'warning')
    return { fail: true }
  }

  if (type) {
    props.type = type
  } else {
    if (!props.type) {
      if (prefix === `${ROOT_PREFIX}-toast`) {
        props.type = 'info'
      }
    }
  }
  return props
}

export function setComp(props: any, prefix: string, messageBox: any, dom: any, Canvas: any) {
  const component = React.createElement(Canvas, Object.assign(props, {
    prefix,
    willUnmount: () => {
      ReactDOM.unmountComponentAtNode(dom)
      messageBox.removeChild(dom)
      if (!messageBox.hasChildNodes()) {
        ReactDOM.unmountComponentAtNode(messageBox)
        document.body.removeChild(messageBox)
      }

      if (props.onClose instanceof Function) {
        props.onClose()
      }
    }
  }))
  return component
}

export function renderItem(props: any, type: string, prefix: string, messageBox: any, dom: any, Canvas: any) {
  const tempProps = setProps(props, type, prefix)
  if (tempProps.fail) {
    return null
  }
  const component = setComp(tempProps, prefix, messageBox, dom, Canvas)
  
  return ReactDOM.render(component, dom)
}