import * as React from 'react'
import classnames from 'classnames'
import omit from 'omit.js'
import Icon from 'components/icon'
import View, { ROOT_PREFIX } from 'libs/view'

export interface SwitchProps {
  className?: string,
  style?: object,
  checked?: boolean,
  disabled?: boolean,
  autoFocus?: boolean,
  loading?: boolean,
  color?: string,
  unColor?: string,
  size?: 'large' | 'default' | 'small',
  checkedChildren?: string | React.ReactNode,
  unCheckedChildren?: string | React.ReactNode,
  checkedValue?: boolean | string | number,
  unCheckedValue?: boolean | string | number,
  onChange?: (value: any) => void,
  onMouseUp?: (event: any) => void,
}

export default class Switch extends React.Component<SwitchProps> {
  private prefix = `${ROOT_PREFIX}-switch`
  static defaultProps = {
    checked: false,
    disabled: false,
    loading: false,
    size: 'default',
    checkedValue: true,
    unCheckedValue: false,
  }
  state = {
    checked: this.props.checked,
  }
  node: any

  componentDidMount() {
    if (this.props.autoFocus && !this.props.disabled) {
      this.focus()
    }
  }

  componentWillReceiveProps(nextProps: SwitchProps) {
    if (nextProps.checked) {
      this.setState({
        checked: nextProps.checked,
      })
    }
    if (nextProps.disabled) {
      this.setState({
        disabled: nextProps.disabled,
      })
    }
    if (nextProps.loading) {
      this.setState({
        loading: nextProps.loading,
      })
    }
  }

  saveNode(node: any) {
    this.node = node
  }

  focus() {
    this.node.focus()
  }

  blur() {
    this.node.blur()
  }

  reset() {
    this.setState({ checked: false })
  }

  toggle() {
    if (this.props.disabled) {
      return
    }
    const { onChange, checkedValue, unCheckedValue } = this.props
    const checked = !this.state.checked
    this.setState({checked})
    if (onChange) {
      onChange(checked ? checkedValue : unCheckedValue)
    }
  }

  handelMouseUp(e: any) {
    if (this.props.onMouseUp) {
      this.props.onMouseUp(e)
    }
  }

  renderLoading(colorStyle: object) {
    const { loading } = this.props
    if (loading) {
      return (
        <span className={`${this.prefix}-circle`}>
          <Icon type='loading2' className={`${this.prefix}-icon-loading`} style={colorStyle} spin />
        </span>
      )
    }
    return <span className={`${this.prefix}-circle`} />
  }

  render() {
    const { checkedChildren, unCheckedChildren, loading, disabled, color, unColor, size, ...rest } = this.props
    const viewProps = omit(rest, ['checked', 'autoFocus', 'onChange', 'onMouseUp', 'checkedValue', 'unCheckedValue'])
    const { checked } = this.state
    const cls = classnames({
      [`${this.prefix}-checked`]: checked,
      [`${this.prefix}-disabled`]: disabled,
      [`${this.prefix}-loading`]: loading,
      [`${this.prefix}-${size}`]: size,
    })
    let backgroundColor
    let colorStyle = {}
    if (color && checked) {
      backgroundColor = { background: color }
      colorStyle = { color }
    }
    if (unColor && !checked) {
      backgroundColor = { background: unColor}
      colorStyle = { color: unColor }
    }
    const wrapperStyle = Object.assign({}, backgroundColor)
    return (
      <View
        tag='span'
        config={{...viewProps, prefix: this.prefix, cls, sty: wrapperStyle}}
        ref={this.saveNode.bind(this)}
        onClick={this.toggle.bind(this)}
        onMouseUp={this.handelMouseUp.bind(this)}
      >
        <span className={`${this.prefix}-inner`}>
          {checked ? checkedChildren : unCheckedChildren}
        </span>
        {this.renderLoading(colorStyle)}
        {checked && <div className={`${this.prefix}-animating-node`} />}
      </View>
    )
  }
}
