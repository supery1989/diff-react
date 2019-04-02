import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { ICON_TYPE_MAP } from 'libs/utils'
import Canvas from './Canvas'

function confirm(props: any) {
  props = Object.assign({
    showCancelBtn: true
  }, props)
  return props
}

function success(props: any) {
  props = Object.assign({
    icon: ICON_TYPE_MAP['success'],
    okBtnText: '我知道了'
  }, props)
  return props
}

function info(props: any) {
  props = Object.assign({
    icon: ICON_TYPE_MAP['info'],
    okBtnText: '我知道了'
  }, props)
  return props
}

function warning(props: any) {
  props = Object.assign({
    icon: ICON_TYPE_MAP['warning'],
    showCancelBtn: true,
    okBtnText: '继续前往',
    cancelBtnText: '我知道了'
  }, props)
  return props
}

function error(props: any) {
  props = Object.assign({
    icon: ICON_TYPE_MAP['error'],
    showCancelBtn: true,
    okBtnText: '再试一次',
    cancelBtnText: '我知道了'
  }, props)
  return props
}

function getProps(props: any, type: string) {
  switch(type) {
    case 'confirm':
      return confirm(props)
    case 'success':
      return success(props)
    case 'info':
      return info(props)
    case 'warning':
      return warning(props)
    case 'error':
      return error(props)
    default:
      return props
  }
}

export default function Popup(props: any = {}, type: string) {
  const dom = document.createElement('div')
  dom.style.position = 'absolute'
  dom.style.zIndex = '1'
  document.body.appendChild(dom)

  if (type) {
    props.type = type
  }

  props = getProps(props, props.type)

  const component = React.createElement(Canvas, Object.assign(props, {
    willUnmount: () => {
      ReactDOM.unmountComponentAtNode(dom)
      document.body.removeChild(dom)

      if (props.onClose instanceof Function) {
        props.onClose()
      }
    }
  }))

  return ReactDOM.render(component, dom)
}

['alert', 'confirm', 'success', 'warning', 'info', 'error'].forEach(type => {
  Popup[type] = (options = {}) => {
    return Popup(options, type)
  }
})