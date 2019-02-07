import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Popup from 'components/popup'

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
  if (typeof props === 'string' || React.isValidElement(props)) {
    props = {
      message: props
    }
  } else {
    Popup({
      title: '警告',
      message: '参数类型不对，应为string或者react元素',
      showOkBtn: false
    }, 'warning')
    return { fail: true }
  }

  if (type) {
    props.type = type
  } else {
    if (!props.type) {
      if (prefix === 'diff-toast') {
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