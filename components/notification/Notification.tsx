import { setDom, renderItem } from './func'
import Canvas from './Canvas'

export default function Notification(props: any = {}, type: string) {
  const prefix = 'diff-notification'
  const { dom, messageBox } = setDom(prefix)

  if (props.position) {
    switch(props.position) {
      case 'topRight':
        (messageBox as HTMLElement).setAttribute("style", "top: 16px; bottom: unset; left: unset; right: 16px;")
        break
      case 'topLeft':
        (messageBox as HTMLElement).setAttribute("style", "top: 16px; bottom: unset; right: unset; left: 16px;")
        break
      case 'bottomLeft':
        (messageBox as HTMLElement).setAttribute("style", "bottom: 16px; left: unset; right: unset; left: 16px;")
        break
      case 'bottomRight':
        (messageBox as HTMLElement).setAttribute("style", "bottom: 16px; left: unset; left: unset; right: 16px;")
        break
      default:
        (messageBox as HTMLElement).setAttribute("style", props.position)
        break
    }
  } else {
    (messageBox as HTMLElement).setAttribute("style", "top: 16px; bottom: unset; left: unset; right: 16px;")
  }

  if (typeof(props) === 'object') {
    props = Object.assign({}, props)
  }

  renderItem(props, type, prefix, messageBox, dom, Canvas)
}

['success', 'error', 'warning', 'info'].forEach(type => {
  Notification[type] = (options = {}) => {
    return Notification(options, type)
  }
})
