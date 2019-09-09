import * as React from 'react'
import omit from 'omit.js'
import View, { ROOT_PREFIX } from '../../libs/view'
import Popup from '../popup'

export interface CopyProps {
  className?: string,
  style?: object,
  value?: any,
  showStatus?: boolean,
  onCopy?: (isCopy: boolean) => void
}

export default class Copy extends React.Component<CopyProps> {
  private prefix = `${ROOT_PREFIX}-copy`
  static defaultProps = {
    showStatus: true
  }
  timer: any
  state: any

  constructor(props: CopyProps) {
    super(props)
    this.state = {
      status: false
    }
  }

  componentWillUnmount() {
    if (this.timer) {
      clearTimeout(this.timer)
    }
  }

  copy() {
    const { value, onCopy } = this.props
    const dom: any = document.createElement('textarea')
    dom.style = {
      position: 'fixed',
      left: '0',
      top: '-9999px'
    }
    dom.value = value
    document.body.appendChild(dom)
    dom.select()
    let result: any = {}
    try {
      const isSuc = document.execCommand('copy')
      result.success = isSuc
      if (!isSuc) {
        result.reason = '复制失败:浏览器版本较低'
      } else {
        this.setState({
          status: true
        }, () => {
          this.timer = setTimeout(() => {
            this.setState({
              status: false
            })
          }, 1000)
        })
      }
      onCopy && onCopy(result)
    } catch(e) {
      Popup({
        title: '复制失败',
        message: e.message
      }, 'alert')
    }
    document.body.removeChild(dom)
  }

  render() {
    const { children, showStatus, ...rest } = this.props
    const { status } = this.state
    const viewProps = omit(rest, ['value', 'onCopy', 'showStatus'])
    return (
      <View config={{...viewProps, prefix: this.prefix}} tag='span' onClick={this.copy.bind(this)}>
        {children}
        {showStatus && status && <span className={`${this.prefix}-status`}>已复制</span>}
      </View>
    )
  }
}
