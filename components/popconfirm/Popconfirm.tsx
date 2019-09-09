import * as React from 'react'
import omit from 'omit.js'
import Popover from '../popover'
import Icon from '../icon'
import Button from '../button'
import View, { ROOT_PREFIX } from '../../libs/view'

export interface PopconfirmProps {
  className?: string
  style?: object
  cancelText?: string
  okText?: string
  okType: "primary" | "link" | "default" | "success" | "info" | "warning" | "danger"
  icon: string
  title: string | React.ReactNode
  placement: 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end'
  onCancel?: () => void
  onConfirm?: () => void
}

export default class Popconfirm extends React.Component<PopconfirmProps> {
  private prefix = `${ROOT_PREFIX}-popconfirm`
  static defaultProps = {
    cancelText: '取消',
    okText: '确定',
    okType: 'primary',
    icon: 'warningcircle',
    title: '确定要删除吗？',
    placement: 'top'
  }
  state: any

  constructor(props: PopconfirmProps) {
    super(props)

    this.state = {
      show: null
    }
  }

  onConfirm() {
    this.setState({
      show: this.state.show === undefined ? null : undefined
    })
    const { onConfirm } = this.props
    onConfirm && onConfirm()
  }

  onCancel() {
    this.setState({
      show: this.state.show === undefined ? null : undefined
    })
    const { onCancel } = this.props
    onCancel && onCancel()
  }

  panelContent() {
    const { onCancel, onConfirm, cancelText, okText, okType, icon, title, ...rest } = this.props
    const viewProps = omit(rest, ['placement'])
    return (
      <View config={{...viewProps, prefix: this.prefix}}>
        <div className={`${this.prefix}-message`}>
          <Icon type={icon} className={`${this.prefix}-message-icon`} />
          <div className={`${this.prefix}-message-content`}>{title}</div>
        </div>
        <div className={`${this.prefix}-buttons`}>
          <Button className={`${this.prefix}-button`} size='small' onClick={this.onCancel.bind(this)}>{cancelText}</Button>
          <Button className={`${this.prefix}-button`} size='small' onClick={this.onConfirm.bind(this)} type={okType}>{okText}</Button>
        </div>
      </View>
    )
  }

  render() {
    const { children, placement } = this.props
    return (
      <Popover show={this.state.show} width={150} placement={placement} popClass={`${this.prefix}-popover`} trigger='click' content={this.panelContent()}>{children}</Popover>
    )
  }
}
