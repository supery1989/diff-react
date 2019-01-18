import * as React from 'react'
import classnames from 'classnames'
import omit from 'omit.js'
// import { ICON_TYPE_MAP } from 'libs/utils'
import View from 'libs/view'
import Icon from 'components/icon'
import Button from 'components/button'
import { ButtonProps } from 'components/button/Button'
import Transtion from 'components/transition'

export interface CanvasProps {
  className?: string,
  style?: object,
  okBtnText?: string,
  cancelBtnText?: string,
  okBtnStyle?: object,
  cancelBtnStyle?: object,
  title?: string,
  closable?: boolean,
  showOkBtn?: boolean,
  showCancelBtn?: boolean,
  okBtnProps?: ButtonProps,
  cancelBtnProps?: ButtonProps,
  message?: string | React.ReactElement<any>,
  type?: 'alert' | 'confirm' | 'success' | 'warning' | 'info' | 'error' | 'default',
  icon?: string,
  confirmLoading?: boolean,
  maskClosable?: boolean,
  width?: number,
  top?: number,
  maskStyle?: object,
  willUnmount?: () => void,
  onOk?: () => void,
  onCancel?: () => void
}

export default class Canvas extends React.Component<CanvasProps> {
  private prefix = 'diff-popup'

  static defaultProps = {
    okBtnText: '确 定',
    cancelBtnText: '取 消',
    closable: true,
    showOkBtn: true,
    confirmLoading: false,
    maskClosable: true,
  }

  state: any

  constructor(props: CanvasProps) {
    super(props)
    this.state = {
      show: false,
      loading: false,
      errorInfo: ''
    }
  }

  componentDidMount() {
    this.setState({
      show: true
    })
    document.activeElement && (document.activeElement as HTMLElement).blur()
  }

  // onchange
  // validate

  close = () => {
    this.setState({
      show: false
    })
  }

  fail = (info: string) => {
    this.setState({
      loading: false,
      errorInfo: info
    })
  }

  onOk = () => {
    const { confirmLoading, onOk } = this.props
    onOk && onOk()
    if (!confirmLoading) {
      this.close()
    } else {
      this.setState({
        errorInfo: '',
        loading: true
      })
    }
  }

  onCancel = () => {
    const { onCancel } = this.props
    onCancel && onCancel()
    this.close()
  }

  onMaskClick = (e:any) => {
    const { maskClosable, closable } = this.props
    const { loading } = this.state
    if (!loading && maskClosable && closable && e.target === e.currentTarget) {
      this.onCancel()
    }
  }

  renderHeader = () => {
    const { title, closable, icon, type, confirmLoading } = this.props
    if (!title && !closable && !icon) {
      return null
    }
    const cls = classnames(`${this.prefix}-title`, {
      [`${this.prefix}-title-has-icon`]: !!icon
    })
    const iconCls = classnames(`${this.prefix}-icon`, {
      [`${this.prefix}-icon-${type}`]: !!icon && !!type
    })
    return (
      <div className={`${this.prefix}-header`}>
        {icon && <Icon className={iconCls} type={icon} />}
        {title && <div className={cls}>{title}</div>}
        {closable && !confirmLoading && <Icon type='close' className={`${this.prefix}-close`} onClick={this.onCancel} />}
      </div>
    )
  }

  renderContent = ()=> {
    const { message, icon } = this.props
    const { errorInfo } = this.state
    if (!message) {
      return null
    }
    const cls = classnames(`${this.prefix}-content`, {
      [`${this.prefix}-title-has-icon`]: !!icon
    })
    return (
      <div className={cls}>
        {message && <div className={`${this.prefix}-message`}>{message}</div>}
        {errorInfo && <div className={`${this.prefix}-fail`}>{errorInfo}</div>}
      </div>
    )
  }

  renderBtns = () => {
    const { showCancelBtn, showOkBtn, okBtnText, cancelBtnText, cancelBtnStyle, okBtnStyle, okBtnProps, cancelBtnProps } = this.props
    if (!showOkBtn && !showCancelBtn) {
      return null
    }
    return (
      <div className={`${this.prefix}-btns`}>
        {showCancelBtn && <Button className={`${this.prefix}-btn`} style={cancelBtnStyle} text={cancelBtnText} onClick={this.onCancel} {...cancelBtnProps} />}
        {showOkBtn && <Button type='primary' className={`${this.prefix}-btn`} style={okBtnStyle} text={okBtnText} loading={this.state.loading} onClick={this.onOk} {...okBtnProps} />}
      </div>
    )
  }

  afterLeave = () => {
    if (!this.state.show) {
      const { willUnmount } = this.props
      willUnmount && willUnmount()
    }
  }

  render() {
    const { width, maskStyle, top, ...rest } = this.props
    const viewProps = omit(rest, ['title', 'closable', 'showCancelBtn', 'showOkBtn', 'okBtnText', 'cancelBtnText', 'message', 'icon', 'cancelBtnStyle', 'okBtnStyle', 'willUnmount', 'confirmLoading', 'onOk', 'onCancel', 'okBtnProps', 'cancelBtnProps', 'maskClosable', 'width', 'maskStyle', 'top'])
    const { show } = this.state
    const sty = { width: `${width}px`, top: `${top}px` }
    const boxCls = classnames(`${this.prefix}-box`, {
      [`${this.prefix}-box-top`]: top
    })

    return (
      <Transtion type="fade" show={show} unmount init onEnd={this.afterLeave}>
        <div className={`${this.prefix}-wrapper`}>
          <div className={boxCls} onClick={this.onMaskClick}>
            <View config={{...viewProps, prefix: this.prefix, sty}}>
              {this.renderHeader()}
              {this.renderContent()}
              {this.renderBtns()}
            </View>
          </div>
          <div className={`${this.prefix}-mask`} style={maskStyle}></div>
        </div>
      </Transtion>
    );
  }
}
