import * as React from 'react'
import classnames from 'classnames'
import omit from 'omit.js'
import View, { ROOT_PREFIX } from '../../libs/view'
import Icon from '../icon'

export interface TagProps {
  className?: string,
  style?: object,
  type?: 'disabled' | 'success' | 'warning' | 'error' | 'info' | 'default',
  closable?: boolean,
  show: boolean,
  color?: string,
  checkbox?: boolean,
  checked: boolean,
  onClose?: (label: any, e: any) => void,
  onClick?: (e: any) => void,
  onChange?: () => void,
}

export default class Tag extends React.Component<TagProps> {
  private prefix = `${ROOT_PREFIX}-tag`

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

  componentWillReceiveProps(nextProps: TagProps) {
    if (this.state.checked !== nextProps.checked) {
      this.setState({
        checked: nextProps.checked
      })
    }
    if (this.props.show !== nextProps.show) {
      this.setState({
        show: nextProps.show
      })
    }
  }

  handleClose(e: any) {
    this.setState({
      show: false
    })
    const { onClose, children } = this.props
    onClose && onClose(children, e)
  }

  handleChange(e: any) {
    if (e.target.className.indexOf('close') > -1) {
      this.handleClose(e)
      return
    }
    const { checkbox, onChange, onClick } = this.props
    onClick && onClick(e)
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
    const viewProps = omit(rest, ['onClose', 'show', 'onChange', 'checked', 'onClick'])
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
        {closable && <Icon className={`${this.prefix}-close`} type='close' />}
      </View>
    );
  }
}
