import * as React from 'react'
import classnames from 'classnames'
import omit from 'omit.js'
import View from 'libs/view'
import Icon from 'components/icon'

export interface InputProps {
  className?: string,
  style?: object,
  disabled?: boolean,
  size?: 'large' | 'small' | 'mini',
  prepend?: string | React.ReactElement<any>,
  append?: string | React.ReactElement<any>,
  clearable: boolean,
  value: any,
  trim: boolean,
  type: string,
  prefix?: string,
  suffix?: string,
  placeholder?: string,
  // 大小写
  onChange?: (value: any) => void,
  onBlur?: (value: any) => void,
  onKeyDown?: (value: any) => void,
  onEnter?: (value: any) => void,
}

export default class Input extends React.Component<InputProps> {
  private prefix = 'diff-input'
  static defaultProps = {
    clearable: true,
    value: '',
    trim: true,
    type: 'text',
  }
  state: any;
  input: any;

  constructor(props: InputProps) {
    super(props)
    this.state = {
      showClose: false,
      value: props.value,
      trim: props.trim && props.type !== 'password',
      type: props.type,
      suffix: props.suffix,
      placeholder: props.type === 'password' ? '请输入密码' : '请输入内容'
    }
  }

  focus() {
    setTimeout(() => {
      (this.refs.input as any).refs.viewRef.focus()
    })
  }

  blur() {
    setTimeout(() => {
      (this.refs.input as any).refs.viewRef.blur()
    })
  }

  handleChange(e: any) {
    const { onChange } = this.props
    const { trim } = this.state
    let v = e.target.value
    if (v !== undefined && v !== '') {
      this.setState({
        showClose: true,
        value: v
      });
    } else {
      this.setState({
        showClose: false,
        value: '',
      })
    }
    let tempV = v;
    if (trim) {
      tempV = tempV.trim()
    }
    onChange && onChange(tempV)
  }

  handleBlur(e: any) {
    const { onBlur} = this.props
    onBlur && onBlur(e)
    this.handleChange(e)
  }

  handleClear(e: any) {
    if (e.currentTarget.className.indexOf('close') > -1) {
      // (this.refs.input as any).refs.viewRef.value = ''
      this.setState({
        showClose: false,
        value: '',
      })
      this.focus()
    }
  }

  handleKeyDown(e: any) {
    const { onKeyDown, onEnter } = this.props
    if (e.keyCode === 13 && onEnter) {
      onEnter(this.state.value)
    } else {
      onKeyDown && onKeyDown(this.state.value)
    }
  }

  showPwd(show = true) {
    this.setState({
      type: show ? 'password' : 'text',
      suffix: show ? '' : 'eye',
    })
    this.focus()
  }

  renderSuffix(suffix: string) {
    if (!suffix) {
      return null
    }
    if (suffix === 'eye') {
      const cls = classnames(`${this.prefix}-icon`, `${this.prefix}-eye`)
      return <Icon type={suffix} className={cls} onClick={() => this.showPwd(true)} />
    }
    return <Icon type={suffix} className={`${this.prefix}-icon`} />
  }

  renderInput(props: any, cls: any, sty: object = {}) {
    const { value, type, placeholder } = this.state
    const tempProps = Object.assign({}, props, { value, type, placeholder })
    return <View
      ref='input'
      config={{...tempProps, prefix: this.prefix, cls, sty}}
      tag='input'
      onChange={this.handleChange.bind(this)}
      onKeyDown={this.handleKeyDown.bind(this)}
      onBlur={this.handleBlur.bind(this)}
    />
  }

  render() {
    const { disabled, size, prefix, prepend, append, clearable } = this.props
    const viewProps = omit(this.props, ['size', 'prefix', 'suffix', 'prepend', 'append', 'clearable', 'trim', 'onChange', 'onBlur', 'onKeyDown', 'onEnter'])
    const { showClose, type, suffix } = this.state
    const cls = classnames({
      [`${this.prefix}-disabled`]: !!disabled,
      [`${this.prefix}-${size}`]: !!size,
    })
    let isClose: boolean = false;
    if (clearable && showClose) {
      isClose = true
    }
    let closeIconStyle = { right: '0px' }
    let inputStyle = { paddingRight: '0px' }
    if (type === 'password' || suffix) {
      closeIconStyle = { right: '30px' }
      if (isClose) {
        inputStyle = { paddingRight: '60px' }
      } else {
        inputStyle = { paddingRight: '30px' }
      }
    } else {
      if (isClose) {
        inputStyle = { paddingRight: '30px' }
      }
    }
    const wrapperCls = classnames(this.props.className, `${this.prefix}-wrapper`, {
      [`${this.prefix}-wrapper-icon-before`]: !!prefix,
      [`${this.prefix}-wrapper-icon-after`]: !!suffix,
      [`${this.prefix}-wrapper-icon-close`]: isClose,
      [`${this.prefix}-prepend`]: !!prepend,
      [`${this.prefix}-append`]: !!append,
      [`${this.prefix}-wrapper-icon-password`]: type === 'password',
    })
    const wrapperProps = omit(viewProps, ['className'])
    return (
      <div className={wrapperCls}>
        {prepend && <div className={`${this.prefix}-prepend`}>{prepend}</div>}
        <div className={`${this.prefix}-box`}>
          {this.renderInput(wrapperProps, cls, inputStyle)}
          {prefix && <Icon type={prefix} className={`${this.prefix}-icon`} />}
          {this.renderSuffix(suffix)}
          {isClose && <Icon type='close' style={closeIconStyle} className={`${this.prefix}-close`} onClick={this.handleClear.bind(this)} />}
          {type === 'password' && <Icon type='eye-o' className={`${this.prefix}-password`} onClick={this.showPwd.bind(this, false)} />}
        </div>
        {append && <div className={`${this.prefix}-append`}>{append}</div>}
      </div>
    )
  }
}
