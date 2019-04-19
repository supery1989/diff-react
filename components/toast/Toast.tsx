import { ROOT_PREFIX } from 'libs/view'
import { setDom, renderItem } from '../notification/func'
import Canvas from './Canvas'

export default function Toast(props: any = {}, type: string) {
  const prefix = `${ROOT_PREFIX}-toast`
  const { dom, messageBox } = setDom(prefix)

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

  if (typeof(props) === 'object') {
    props = Object.assign({}, props)
  }

  renderItem(props, type, prefix, messageBox, dom, Canvas)
}

['success', 'error', 'warning', 'info'].forEach(type => {
  Toast[type] = (options = {}) => {
    return Toast(options, type)
  }
})
