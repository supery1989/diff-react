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
  append?: string | React.ReactElement<any> | null,
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
  onClick?: (e: any) => void,
  onClear?: (e: any) => void,
  // 以下为原生属性
  readOnly?: boolean,
  maxLength?: number,
  minLength?: number,
  autoComplete?: boolean,
  name?: string,
  id?: string,
  max?: number,
  min?: number,
  autoFocus?: boolean
}

export default class Input extends React.Component<InputProps> {
  private prefix = 'diff-input'
  static defaultProps = {
    clearable: true,
    value: '',
    trim: true,
    type: 'text',
    placeholder: '请输入内容'
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
      placeholder: props.type === 'password' ? '请输入密码' : props.placeholder
    }
  }

  componentWillReceiveProps(nextProps: InputProps) {
    if (this.props.suffix !== nextProps.suffix) {
      this.setState({
        suffix: nextProps.suffix
      })
    }
    if (this.props.value !== nextProps.value) {
      this.setState({
        value: nextProps.value
      }, () => {
        if (this.state.value === null || this.state.value === undefined || this.state.value === '') {
          this.setState({
            showClose: false
          })
        }
      })
    }
    if (this.props.placeholder !== nextProps.placeholder) {
      this.setState({
        placeholder: nextProps.placeholder
      })
    }
  }

  focus() {
    setTimeout(() => {
      if (this.refs.input) {
        (this.refs.input as any).refs.viewRef.focus()
      }
    })
  }

  blur() {
    setTimeout(() => {
      (this.refs.input as any).refs.viewRef.blur()
    })
  }

  handleChange(v: any) {
    const { onChange } = this.props
    const { trim } = this.state
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

  beforeHandleChange(e: any) {
    const v = e.target.value
    this.handleChange(v)
  }

  handleBlur(e: any) {
    const { onBlur} = this.props
    onBlur && onBlur(e)
    this.beforeHandleChange(e)
  }

  handleClear(e: any) {
    if (e.currentTarget.className.indexOf('close') > -1) {
      const { onClear } = this.props
      this.setState({
        showClose: false,
        value: '',
      })
      this.handleChange('')
      onClear && onClear(e)
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

  handleClick(e: any) {
    const { onClick } = this.props
    onClick && onClick(e)
  }

  handleMouseEnter(e: any) {
    if (e.target.value) {
      this.setState({
        showClose: true
      })
    }
  }

  handleMouseLeave() {
    this.setState({
      showClose: false
    })
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
      onChange={this.beforeHandleChange.bind(this)}
      onKeyDown={this.handleKeyDown.bind(this)}
      onBlur={this.handleBlur.bind(this)}
      onClick={this.handleClick.bind(this)}
    />
  }

  render() {
    const { disabled, size, prefix, prepend, append, clearable, style } = this.props
    const viewProps = omit(this.props, ['size', 'prefix', 'suffix', 'prepend', 'append', 'clearable', 'trim', 'onChange', 'onBlur', 'onKeyDown', 'onEnter', 'onClick', 'onClear', 'style'])
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
      <div
        className={wrapperCls}
        style={style}
        onMouseEnter={this.handleMouseEnter.bind(this)}
        onMouseLeave={this.handleMouseLeave.bind(this)}
      >
        {prepend && <div className={`${this.prefix}-prepend`}>{prepend}</div>}
        <div className={`${this.prefix}-box`}>
          {this.renderInput(wrapperProps, cls, inputStyle)}
          {prefix && <Icon type={prefix} className={`${this.prefix}-icon`} />}
          {this.renderSuffix(suffix)}
          {isClose && !disabled && <Icon type='close' style={closeIconStyle} className={`${this.prefix}-close`} onClick={this.handleClear.bind(this)} />}
          {type === 'password' && <Icon type='eye-o' className={`${this.prefix}-password`} onClick={this.showPwd.bind(this, false)} />}
        </div>
        {append && <div className={classnames(`${this.prefix}-append`, {[`${this.prefix}-append-disabled`]: !!disabled,})}>{append}</div>}
      </div>
    )
  }
}
