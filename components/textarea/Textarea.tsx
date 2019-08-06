import * as React from 'react'
import * as ReactDOM from 'react-dom'
import classnames from 'classnames'
import omit from 'omit.js'
import View, { ROOT_PREFIX } from 'libs/view'
import Icon from 'components/icon'
import AutoSize from './autosize'

export interface TextareaProps {
  className?: string,
  style?: object,
  placeholder?: string,
  autoSize?: boolean,
  value: string,
  minRows: number,
  maxRows: number,
  resize?: string,
  disabled?: boolean,
  maxLength?: number,
  showCount?: boolean,
  clearable?: boolean,
  onChange?: (value: string) => void,
  onBlur?: (value: string) => void,
  onClear?: () => void,
}

export default class Textarea extends React.Component<TextareaProps> {
  private prefix = `${ROOT_PREFIX}-textarea`
  static defaultProps = {
    placeholder: '请输入内容',
    autoSize: true,
    minRows: 3,
    maxRows: 0,
    resize: 'none',
    value: '',
    clearable: true
  }
  textareaNode: any
  state: any

  constructor(props: TextareaProps) {
    super(props)

    this.state = {
      textareaSty: {},
      value: props.value,
      showClose: false
    }
  }

  componentDidMount() {
    this.resize()
  }

  focus() {
    (this.textareaNode.refs as any).viewRef.focus()
  }

  blur() {
    (this.textareaNode.refs as any).viewRef.blur()
  }

  reset() {
    (this.textareaNode.refs as any).viewRef.value = ''
    this.setState({
      value: ''
    }, () => {
      this.changeFn(this.state.value)
    })
  }

  resize() {
    const { autoSize, minRows, maxRows } = this.props
    if (autoSize) {
      const sty = AutoSize(ReactDOM.findDOMNode(this.textareaNode), minRows, maxRows)
      this.setState({
        textareaSty: sty
      })
    }
  }

  handleChange(e: any) {
    const value = e.target.value
    this.changeFn(value)
  }

  changeFn(value: any) {
    const { onChange } = this.props
    const showClose = value ? true : false
    this.setState({
      value,
      showClose
    })
    this.resize()
    onChange && onChange(value)
  }

  handleBlur(e: any) {
    const { value } = this.state
    const { onBlur, onChange, onClear } = this.props
    onBlur && onBlur(value)
    onChange && onChange(value)
    onClear && onClear()
  }

  handleClear() {
    const { onBlur } = this.props
    this.setState({
      showClose: false,
      value: ''
    })
    this.focus()
    onBlur && onBlur('')
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

  render() {
    const { resize, disabled, showCount, maxLength, clearable, ...rest } = this.props
    const { textareaSty, value, showClose } = this.state
    const viewProps = omit(rest, ['autoSize', 'value', 'minRows', 'maxRows', 'onChange', 'onBlur', 'onClear'])
    const tempProps = Object.assign({}, viewProps, { value })
    const sty = Object.assign({}, textareaSty, {resize})
    const cls = classnames({
      [`${this.prefix}-disabled`]: !!disabled,
      [`${this.prefix}-with-count`]: !!showCount
    })
    let currentCount = value.length
    currentCount = currentCount > (maxLength as number) ? maxLength : currentCount
    return (
      <div className={`${this.prefix}-wrapper`}
        onMouseEnter={this.handleMouseEnter.bind(this)}
        onMouseLeave={this.handleMouseLeave.bind(this)}
        onBlur={this.handleBlur.bind(this)}
      >
        <View
          config={{...tempProps, prefix: this.prefix, sty, cls, disabled, maxLength}}
          tag='textarea'
          onChange={this.handleChange.bind(this)}
          ref={(node: any) => this.textareaNode = node}
        />
        {clearable && showClose && <Icon
          type='close'
          className={`${this.prefix}-close`}
          onClick={this.handleClear.bind(this)}
        />}
        {showCount && (
          <span className={`${this.prefix}-count`}>
            {currentCount}/{maxLength}
          </span>
        )}
      </div>
    )
  }
}
