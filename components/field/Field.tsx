import * as React from 'react'
import classnames from 'classnames'
import omit from 'omit.js'
import PropTypes from 'prop-types'
import View, { ROOT_PREFIX } from 'libs/view'
import Input from 'components/input'
import Transition from 'components/transition'

export interface FieldProps {
  className?: string
  style?: object
  width?: number | string
  labelWidth: number | string
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
}

export default class Field extends React.Component<FieldProps> {
  private prefix = `${ROOT_PREFIX}-field`
  static defaultProps = {
    width: '100%',
    labelWidth: 80,
    labelPosition: 'right',
    name: '',
    type: 'input'
  }
  static contextTypes = {
    component: PropTypes.any
  }
  state: any
  initValue: any

  constructor(props: FieldProps) {
    super(props)
    this.state = {
      value: null,
      validating: false,
      error: '',
      fieldValue: props.value
    }
  }

  componentDidMount() {
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

  validate(trigger: string = '', cb?: Function) {
    const { value } = this.state
    const { required, label } = this.props
    if (value === '') {
      const err = required ? `请输入${label}` : ''
      this.setState({ error: err })
      return
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
    this.setState({ validating: true, error: '' })
    rules.every((rule: any) => {
      if (!this.validateFn(rule, value)) {
        const { error } = this.state
        const err = error + `, ${rule.message}`
        this.setState({ error: err })
        return false
      }
      return true
    })
    this.setState({ validating: false })
    return
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
    if (labelPosition === 'top' || inline || (this.parent() && (this.parent().props.labelPosition === 'top' || this.parent().props.inline))) return sty
    const labelWidth = this.props.labelWidth || (this.parent() && this.parent().props.labelWidth)
    if (labelWidth) {
      sty.marginLeft = parseInt(labelWidth)
    }
    return sty
  }

  reset() {
    this.setState({ fieldValue: this.initValue })
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

  handleFieldChange(value: any) {
    const { getValue } = this.props
    this.setState({ value })
    getValue && getValue(value)
  }

  getField(cls: any, props: any) {
    const { type } = this.props
    const { fieldValue } = this.state
    let field: any
    switch(type) {
      default:
        field = <Input value={fieldValue} onChange={this.handleFieldChange.bind(this)} className={cls} {...props} />
        break
    }
    return field
  }

  render() {
    const { error } = this.state
    const { width, required, labelPosition, ...rest } = this.props
    const viewProps = omit(rest, ['labelWidth', 'label', 'rules', 'name', 'getValue', 'value', 'type', 'inline'])
    const sty = { width }
    const cls = classnames({
      [`${this.prefix}-required`]: this.isRequired() || required
    })
    const cls2 = classnames({
      ['is-error']: error
    })
    const cls3 = classnames(`${this.prefix}-label`, `${this.prefix}-label-${labelPosition}`)
    const label = this.getLabel()
    return (
      <View config={{...viewProps, prefix: this.prefix, sty, cls}} onChange={this.handleChange.bind(this)} onBlur={this.handleBlur.bind(this)}>
        {label && <label className={cls3} style={this.labelStyle()}>{label}</label>}
        <div className={`${this.prefix}-content`} style={this.contentStyle()}>
          {this.getField(cls2, viewProps)}
          <Transition type="fade" show={error} unmount init>
            <div className={`${this.prefix}-error`}>{error.substr(0)}</div>
          </Transition>
        </div>
      </View>
    )
  }
}
