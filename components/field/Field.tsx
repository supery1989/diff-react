import * as React from 'react'
import classnames from 'classnames'
import omit from 'omit.js'
import PropTypes from 'prop-types'
import View, { ROOT_PREFIX } from '../../libs/view'
import Input from '../input'
import Radio from '../radio'
import Checkbox from '../checkbox'
import Editor from '../editor'
import NumberInput from '../number-input'
import Rate from '../rate'
import Select from '../select'
import Switch from '../switch'
import Textarea from '../textarea'
import Slider from '../slider'
import Upload from '../upload'
import Transition from '../transition'

export interface FieldProps {
  className?: string
  style?: object
  width?: number | string
  labelWidth?: number | string
  labelPosition: 'left' | 'right' | 'top'
  label?: string | React.ReactNode
  required?: boolean
  // trigger: 'blue' | 'change', type: 'string' , message, rule,
  rules?: Array<any>
  name: string
  value?: any
  type: string
  inline?: boolean
  getValue?: (value: any) => void
  options?: any
  info?: string
}

export default class Field extends React.Component<FieldProps> {
  private prefix = `${ROOT_PREFIX}-field`
  static defaultProps = {
    width: '100%',
    labelPosition: 'right',
    name: '',
    type: 'input'
  }
  static contextTypes = {
    component: PropTypes.any
  }
  state: any
  initValue: any
  tempValue: any

  constructor(props: FieldProps) {
    super(props)
    this.state = {
      validating: false,
      error: '',
      fieldValue: props.value
    }
  }

  componentDidMount() {
    this.parent() && this.parent().addField(this)
    const { value, getValue } = this.props
    this.initValue = value
    getValue && getValue(value)
    value !== undefined && this.validate()
  }

  componentWillReceiveProps(nextProps: FieldProps) {
    if (this.props.value !== nextProps.value) {
      this.setState({ fieldValue: nextProps.value })
    }
  }

  parent() {
    return this.context.component
  }

  isRequired() {
    let rules = this.getRules()
    let res = false
    if (rules && rules.length) {
      rules.every((rule: any) => {
        if (rule.required) {
          res = true
          return false
        }
        return true
      })
    }
    return res
  }

  getRules() {
    let formRules
    let selfRules = this.props.rules
    if (this.parent()) {
      formRules = this.parent().props.rules
    }
    formRules = formRules ? formRules[this.props.name] : []
    return [].concat(selfRules || formRules || [])
  }

  getFilteredRule(trigger: string) {
    const rules = this.getRules()
    return rules.filter((rule: any) => {
      if (!rule.trigger || trigger === '') return true
      if (Array.isArray(rule.trigger)) {
        return rule.trigger.indexOf(trigger) > -1
      } else {
        return rule.trigger === trigger
      }
    }).map(rule => Object.assign({}, rule))
  }

  validateFn(rule: any, value: any) {
    let result = true
    switch(rule.type) {
      case 'string':
      case 'number':
      case 'boolean':
      case 'function':
      case 'undefined':
        result = typeof(value) === rule.type
        break
      case 'nan':
        result = isNaN(value)
        break
      case 'integer':
        result = Math.floor(value) === value
        break
      case 'float':
        result = /^-?\d*\.\d+$/.test(value)
        break
      case 'array':
        result = Array.isArray(value)
        break
      case 'object':
        result = Object.prototype.toString.call(value) === '[Object Object]'
        break
      case 'regexp':
        result = rule.rule.test(value)
        break
      case 'url':
        result = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/.test(value)
        break
      case 'email':
        result = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g.test(value)
        break
      case 'length':
        result = value.length > rule.rule
        break
      case 'range':
        result = value > rule.rule[0] && value < rule.rule[1]
        break
      case 'bank_no':
        result = /^[\d]{11}$|^[\d]{16,19}$/.test(value)
        break
      case 'id_card':
        result = /(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value)
        break;
      case 'custom':
        result = rule.rule(value)
        break
    }
    return result
  }

  // todo callback或promise
  validate(trigger: string = '', cb?: Function) {
    const { fieldValue } = this.state
    const { required, label, type } = this.props
    if (type === 'switch') return true
    let valid = true
    const checkValue = type === 'editor' ? this.tempValue : fieldValue
    this.setState({ validating: true, error: '' })
    if (required && type !== 'slider' && (checkValue === '' || checkValue === undefined || (checkValue === '<p></p>' && type === 'editor'))) {
      const txt = type === 'radio' || type === 'checkbox' || type === 'rate' || type === 'select' || type === 'upload' ? '选择' : '输入'
      const err = required ? `请${txt}${label}` : ''
      this.setState({ error: err })
      return false
    }
    let rules;
    if (trigger) {
      rules = this.getFilteredRule(trigger)
    } else {
      rules = this.props.rules
    }
    if (!rules || rules.length === 0) {
      if (cb instanceof Function) {
        cb()
      }
      return true
    }
    valid = rules.every((rule: any) => {
      if (!this.validateFn(rule, checkValue)) {
        const { error } = this.state
        const err = error + `, ${rule.message}`
        this.setState({ error: err.substr(1) })
        return false
      }
      return true
    })
    this.setState({ validating: false })
    return valid
  }

  labelStyle() {
    const sty: any = {}
    if (this.props.labelPosition === 'top' || (this.parent() && this.parent().props.labelPosition === 'top')) return sty
    const labelWidth = this.props.labelWidth || (this.parent() && this.parent().props.labelWidth)
    if (labelWidth) {
      sty.width = parseInt(labelWidth)
    }
    return sty
  }

  contentStyle() {
    const sty: any = {}
    const { inline, labelPosition } = this.props
    if (labelPosition === 'top' || inline || (this.parent() && (this.parent().props.labelPosition === 'top' || this.parent().props.inline))) return { marginLeft: 0, clear: 'both' }
    const labelWidth = this.props.labelWidth || (this.parent() && this.parent().props.labelWidth)
    if (labelWidth) {
      sty.marginLeft = parseInt(labelWidth)
    }
    return sty
  }

  reset() {
    if (this.props.type === 'editor' || this.props.type === 'switch' || this.props.type === 'textarea' || this.props.type === 'slider') {
      (this.refs.fieldNode as any).reset()
    } else if (this.props.type === 'select') {
      (this.refs.fieldNode as any).handleClear()
    } else {
      this.setState({ fieldValue: this.initValue })
    }
  }

  getLabel() {
    const { label } = this.props
    if (typeof(label) === 'string') {
      if (this.parent()) {
        return label + this.parent().props.labelSuffix
      }
    }
    return label
  }

  handleChange() {
    setTimeout(() => {
      this.validate('change')
    }, 0)
  }

  handleBlur() {
    setTimeout(() => {
      this.validate('blur')
    }, 0)
  }

  handleFieldChange(value: any, file?: any) {
    const { getValue, type } = this.props
    const tempValue = type === 'upload' ? file.name : value
    if (type !== 'editor') {
      this.setState({
        fieldValue: tempValue
      }, () => {
        if (type === 'rate' || type === 'slider' || type === 'upload') {
          this.validate('change')
        }
        if (type === 'select') {
          tempValue !== undefined && this.validate('change')
        }
      })
    } else {
      this.tempValue = tempValue
      this.tempValue !== undefined && this.tempValue !== '<p></p>' && this.validate('change')
    }
    
    getValue && getValue(tempValue)
  }

  getField(cls: any, props: any) {
    const { type } = this.props
    const { fieldValue } = this.state
    let field: any
    switch(type) {
      case 'radio':
        field = <Radio.Group value={fieldValue} onChange={this.handleFieldChange.bind(this)} className={cls} {...props} />
        break
      case 'checkbox':
        const val = fieldValue === undefined ? [] : fieldValue
        field = <Checkbox.Group values={val} onChange={this.handleFieldChange.bind(this)} className={cls} {...props} />
        break
      case 'editor':
        field = <Editor ref='fieldNode' value={fieldValue} onChange={this.handleFieldChange.bind(this)} className={cls} {...props} />
        break
      case 'password':
        field = <Input type='password' value={fieldValue} onChange={this.handleFieldChange.bind(this)} className={cls} {...props} />
        break
      case 'numberinput':
        field = <NumberInput value={fieldValue} showType='count' onChange={this.handleFieldChange.bind(this)} className={cls} {...props} />
        break
      case 'rate':
        field = <Rate allowHalf value={fieldValue} onChange={this.handleFieldChange.bind(this)} className={cls} {...props} />
        break
      case 'select':
        const { options } = this.props
        field = (
          <Select ref='fieldNode' value={fieldValue} onChange={this.handleFieldChange.bind(this)} className={cls} {...props}>
            {options.map((option: any, index: number) => {
              return <Select.Option key={`select${index}`} value={option.value}>{option.label}</Select.Option>
            })}
          </Select>
        )
        break
      case 'switch':
        field = <Switch ref='fieldNode' checked={fieldValue} onChange={this.handleFieldChange.bind(this)} className={cls} {...props} />
        break
      case 'textarea':
        field = <Textarea ref='fieldNode' value={fieldValue} onChange={this.handleFieldChange.bind(this)} className={cls} {...props} />
        break
      case 'slider':
        field = <Slider ref='fieldNode' value={fieldValue} onChange={this.handleFieldChange.bind(this)} className={cls} {...props} />
        break
      case 'upload':
        field = <Upload name={fieldValue} type='inline' onSuccess={this.handleFieldChange.bind(this)} className={cls} {...props} />
        break
      case 'custom':
        field = React.Children.map(this.props.children, (element: any, index: number) => {
          return React.cloneElement(element, Object.assign({}, ...props, element.props, {
            key: index,
            value: fieldValue,
            onChange: this.handleFieldChange.bind(this),
            className: cls
          }))
        })
        break
      default:
        field = <Input value={fieldValue} onChange={this.handleFieldChange.bind(this)} className={cls} {...props} />
        break
    }
    return field
  }

  render() {
    const { error } = this.state
    const { className, style, width, required, labelPosition, inline, info, ...rest } = this.props
    const viewProps = omit(rest, ['labelWidth', 'label', 'rules', 'name', 'getValue', 'value', 'type', 'className', 'style'])
    const sty = { width }
    const tempInline = inline || (this.parent() && this.parent().props.inline)
    const cls = classnames({
      [`${this.prefix}-required`]: this.isRequired() || required,
      [`${this.prefix}-inline`]: tempInline
    })
    const cls2 = classnames({
      ['is-error']: error
    })
    const reactLabelPosi = (labelPosition === 'top' || (this.parent() && this.parent().props.labelPosition === 'top')) ? 'top' : labelPosition
    const cls3 = classnames(`${this.prefix}-label`, `${this.prefix}-label-${reactLabelPosi}`)
    const label = this.getLabel()
    return (
      <View config={{...viewProps, className, style, prefix: this.prefix, sty, cls}} onChange={this.handleChange.bind(this)} onBlur={this.handleBlur.bind(this)}>
        {label && <label className={cls3} style={this.labelStyle()}>{label}</label>}
        <div className={`${this.prefix}-content`} style={this.contentStyle()}>
          {this.getField(cls2, viewProps)}
          {info && !error && <div className={`${this.prefix}-info`}>{info}</div>}
          <Transition type="fade" show={error} unmount init>
            <div className={`${this.prefix}-error`}>{error.substr(0)}</div>
          </Transition>
        </div>
      </View>
    )
  }
}
