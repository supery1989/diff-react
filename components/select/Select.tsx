import * as React from 'react'
import * as ReactDom from 'react-dom'
import classnames from 'classnames'
import omit from 'omit.js'
import uuid from 'uuid'
import { debounce } from 'throttle-debounce'
import AnimateHeight from 'react-animate-height'
import OutsideClickHandler from 'react-outside-click-handler'
import View, { ROOT_PREFIX } from 'libs/view'
import Input from 'components/input'
import Tag from 'components/tag'
import Icon from 'components/icon'

export interface SelectProps {
  className?: string
  style?: object
  placeholder: string
  disabled?: boolean
  line?: number
  multiple?: boolean
  filter?: boolean
  clearable?: boolean
  getLabel?: boolean
  remote?: boolean
  loading?: boolean
  notFoundText?: string
  value?: any
  showArrow?: boolean
  onChange?: (value: any) => void
  remoteFn?: (value: any) => void
}

export default class Select extends React.Component<SelectProps> {
  private prefix = `${ROOT_PREFIX}-select`
  static Option: any
  static OptionGroup: any
  static defaultProps = {
    placeholder: '请选择',
    notFoundText: '无可匹配项',
    showArrow: true
  }
  state: any
  selectNode: any
  tagsNode: any
  isEmpty: number[]

  constructor(props: SelectProps) {
    super(props)
    this.isEmpty = []

    this.state = {
      showOption: false,
      selected: {},
      placeholder: props.placeholder,
      innerPos: {},
      inputPos: {},
      filterStr: '',
    }
    if (props.multiple) {
      this.state.selected = []
    }
  }

  clear() {
    (this.refs.input as any).clear()
    this.setState({
      selected: {}
    })
  }

  onSelect(value: any, label: any) {
    let tempSelected: any;
    const { selected } = this.state
    const { multiple, filter } = this.props
    if (multiple) {
      const idx = selected.findIndex((item: any) => item.label === label)
      if (selected.length && idx !== -1) {
        selected.splice(idx, 1)
      } else {
        selected.push({ value, label })
      }
      tempSelected = selected      
    } else {
      if (filter) {
        tempSelected = { value, label: value }
      } else {
        tempSelected = { value, label }
      }
    }

    this.setState({
      selected: tempSelected,
      showOption: multiple ? true : false
    }, () => {
      this.handleChange()
      this.resizeInput()
    })
  }

  handleTagClose(label: any) {
    const { selected } = this.state
    selected.splice(selected.findIndex((item: any) => item.label === label), 1)
    this.setState({
      selected
    }, () => {
      this.handleChange()
      this.resizeInput()
    })
  }

  resizeInput() {
    const { multiple } = this.props
    if (multiple) {
      const dom = ReactDom.findDOMNode(this.tagsNode)
      const h = (dom as Element).clientHeight + 4
      const style = {
        height: h > 32 ? h : 32
      }
      this.setState({
        inputPos: style
      }, () => {
        this.setState({
          innerPos: this.setOptionPosition()
        })
      })
    }
  }

  handleClickOutside() {
    if (this.state.showOption) {
      this.setState({
        showOption: false
      })
    }
  }

  handleChange() {
    const { onChange, multiple, getLabel } = this.props
    const { selected } = this.state
    let value: any
    if (multiple) {
      value = []
      selected.forEach((item: any) => {
        if (getLabel) {
          value.push(item)
        } else {
          value.push(item.value)
        }
      })
      this.setState({
        placeholder: selected.length ? '' : this.props.placeholder
      })
    } else {
      if (getLabel) {
        value = selected
      } else {
        value = selected.value
      }
    }
    onChange && onChange(value)
  }

  handleClear() {
    this.setState({
      selected: {}
    }, () => {
      this.handleChange()
    })
  }

  handleClick(e: any) {
    if (e.target.className.indexOf('close') > -1) {
      return
    }
    this.setState({
      showOption: !this.state.showOption,
      innerPos: this.setOptionPosition()
    })
  }

  setOptionPosition() {
    const { line } = this.props
    const childTotal = React.Children.count(this.props.children)
    const element = ReactDom.findDOMNode(this.selectNode)
    const elementPos = (element as Element).getBoundingClientRect()
    const bodyH = document.body.clientHeight
    const optionH =  line && line < childTotal ? line * 40 : childTotal * 40
    let style: any = {}
    if (elementPos.bottom + optionH > bodyH) {
      style = {
        top: -optionH - 3,
        borderRadius: '5px 5px 0 0'
      }
    } else {
      style = {
        top: `${elementPos.height}px`,
        borderRadius: '0 0 5px 5px'
      }
    }
    return style
  }

  handleInputChange(value: string) {
    const { filter, remote, remoteFn } = this.props
    if (filter) {
      this.setState({
        filterStr: value
      })
    }
    if (remote && remoteFn) {
      remoteFn(value)
    }
  }

  renderOption(component: any, key: number) {
    if (!component) {
      this.isEmpty[key] = 1
      return null
    }
    const { selected, filterStr } = this.state
    const { multiple, filter, notFoundText, value } = this.props
    if (filter) {
      const { children } =  component.props
      let child: any
      if (typeof(children) === 'object') {
        child = ''
        children.map((item: any) => {
          if (String(item.props.children).toLowerCase().indexOf(filterStr.toLowerCase()) !== -1) {
            child = `${String(item.props.children)},`
          }
        })
      } else {
        child = String(children)
      }
      if ((child.toLowerCase()).indexOf(filterStr.toLowerCase()) === -1) {
        this.isEmpty[key] = 1
        if (filter) {
          const childTotal = React.Children.count(this.props.children)
          if (childTotal - 1 === key && this.isEmpty.join(',').indexOf('0') === -1) {
            return <div className={`${this.prefix}-empty`}>{notFoundText}</div>
          }
        }
        return null
      }
    }
    this.isEmpty[key] = 0
    return React.cloneElement(component, {
      ...component.props,
      selected: multiple ? selected : selected.value,
      multiple,
      initValue: value,
      onSelect: this.onSelect.bind(this)
    })
  }

  renderSingle() {
    const { disabled, filter, remote, clearable, showArrow } = this.props
    const { showOption, placeholder, selected} = this.state
    const stuffix = showArrow ? showOption ? 'caretup' : 'caretdown' : false
    return <Input
      ref='input'
      suffix={stuffix}
      readOnly={filter || remote ? false : true}
      placeholder={placeholder}
      value={selected.label}
      disabled={disabled}
      clearable={clearable}
      onClear={this.handleClear.bind(this)}
      onClick={this.handleClick.bind(this)}
      className={`${this.prefix}-input`}
      onChange={debounce(100, this.handleInputChange.bind(this))}
    />
  }

  renderTag() {
    const { selected } = this.state
    if (selected.length) {
      return selected.map((item: any) => {
        return <Tag
          className={`${this.prefix}-tag`}
          key={uuid.v1()}
          type='info'
          closable
          // onClick={this.handleClick.bind(this)}
          onClose={this.handleTagClose.bind(this)}
        >{item.label}</Tag>
      })
    }
    return null
  }

  renderMultiple() {
    const { showOption, placeholder, inputPos } = this.state
    const { showArrow } = this.props
    const stuffix = showArrow ? showOption ? 'caretup' : 'caretdown' : false
    return (
      <span>
        <div className={`${this.prefix}-tags`} ref={(node: any) => {this.tagsNode = node}} onClick={this.handleClick.bind(this)}>
          {this.renderTag()}
        </div>
        <Input
          suffix={stuffix}
          readOnly
          clearable={false}
          placeholder={placeholder}
          onClick={this.handleClick.bind(this)}
          className={`${this.prefix}-input`}
          style={inputPos}
        />
      </span>
    )
  }

  renderContent() {
    const { remote, loading, multiple, children } = this.props
    if (remote) {
      if (multiple) {
        return <div className={`${this.prefix}-empty`}>多选模式不支持远程搜索</div>
      }
      if (loading) {
        return (
          <div className={`${this.prefix}-empty`}>
            <Icon type='loading' spin />
          </div>
        )
      }
    }
    return React.Children.map(children, this.renderOption.bind(this))
  }

  render() {
    const { children, multiple, line, ...rest } = this.props
    const viewProps = omit(rest, ['placeholder', 'disabled', 'filter', 'getLabel', 'loading', 'remote', 'remoteFn', 'notFoundText', 'clearable', 'value', 'showArrow'])
    const { showOption, innerPos } = this.state
    const cls = classnames({
      [`${this.prefix}-multiple`]: !!multiple
    })
    let maxHeight
    let innerCls
    if (line && line < React.Children.count(children)) {
      maxHeight = line * 40
      innerCls = classnames(`${this.prefix}-inner`, `${this.prefix}-inner-auto`)
    } else {
      maxHeight = 'auto'
      innerCls = `${this.prefix}-inner`
    }
    return (
      <View config={{...viewProps, prefix: this.prefix, cls}} ref={(node: any) => this.selectNode = node}>
        <OutsideClickHandler onOutsideClick={this.handleClickOutside.bind(this)}>
          {!multiple && this.renderSingle()}
          {multiple && this.renderMultiple()}
          <AnimateHeight during={300} height={showOption ? maxHeight : 0} className={innerCls} style={innerPos}>
            {this.renderContent()}
          </AnimateHeight>
        </OutsideClickHandler>
      </View>
    )
  }
}
