import * as React from 'react'
import classnames from 'classnames'
import omit from 'omit.js'
import View from 'libs/view'
import Icon from 'components/icon'

export interface TagProps {
  className?: string,
  style?: object,
  type?: 'disabled' | 'success' | 'warning' | 'error' | 'info' | 'default',
  closable?: boolean,
  show: boolean,
  color?: string,
  checkbox?: boolean,
  checked: boolean,
  onClose?: (e: any) => void,
  onChange?: () => void
}

export default class Tag extends React.Component<TagProps> {
  private prefix = 'diff-tag'

  static defaultProps = {
    type: 'default',
    show: true,
    checked: false
  }
  state: any

  constructor(props: TagProps) {
    super(props)
    this.state = {
      show: props.show,
      checked: props.checked
    }
  }

  handleClick(e: any) {
    this.setState({
      show: false
    })
    const { onClose } = this.props
    onClose && onClose(e)
  }

  handleChange() {
    const { checkbox, onChange } = this.props
    if (!checkbox) {
      return
    }
    this.setState({
      checked: !this.state.checked
    })
    onChange && onChange()
  }

  render() {
    const { children, type, closable, color, checkbox, ...rest } = this.props
    const { show, checked } = this.state
    const viewProps = omit(rest, ['onClose', 'show', 'onChange', 'checked'])
    const cls = classnames({
      [`${this.prefix}-${type}`]: type,
      [`${this.prefix}-checkbox`]: !!checkbox,
      [`${this.prefix}-checked`]: !!checkbox && !!checked
    })
    const sty = color ? { backgroundColor: color } : {}
    if (!show) {
      return null
    }
    return (
      <View config={{...viewProps, prefix: this.prefix, cls, sty}} tag='span' onClick={this.handleChange.bind(this)}>
        {children}
        {closable && <Icon className={`${this.prefix}-close`} type='close' onClick={this.handleClick.bind(this)} />}
      </View>
    );
  }
}
