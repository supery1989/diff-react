import * as React from 'react'
import classnames from 'classnames'
import omit from 'omit.js'
import Decimal from 'big.js'
import { ROOT_PREFIX } from 'libs/view'
import Input from 'components/input'
import Icon from 'components/icon'
import { InputProps } from 'components/input/Input'

export interface NumberInputProps extends InputProps {
  decimal: number
  showType: 'step' | 'count' | boolean
  step: number
  formatter?: (value: string | number) => void
  parser?: (value: string | number) => void
}

export default class NumberInput extends React.Component<NumberInputProps> {
  private prefix = `${ROOT_PREFIX}-number-input`
  static defaultProps = {
    placeholder: '请输入数字',
    showType: 'step'
  }
  state: any

  constructor(props: NumberInputProps) {
    super(props)

    const temp = props.value && props.decimal ? new Decimal(props.value).toFixed(props.decimal) : props.value
    this.state = {
      value: temp || '',
      canDec: true,
      canInc: true
    }
  }

  isPotentialValue(value: string | number) {
    return value === '.' || value === '-' || value === '+'
  }

  // 是否为数字
  isDecimal(value: string | number) {
    if (typeof value === 'number') {
      return true
    }
    return /^-?\d*\.?\d*$/.test(value.toString())
  }

  // 是否在有效范围内
  isValid(value: string | number) {
    const { min, max } = this.props
    
    let maxValid = true
    let minValid = true
    if (!value || this.isPotentialValue(value.toString())) {
      return true
    }
    const dec = new Decimal(value)
    if (min !== null && min !== undefined && this.isDecimal(min)) {
      const minDec = new Decimal(min)
      minValid = !(dec.cmp(minDec) === -1)
    }
    if (max !== null && max !== undefined && this.isDecimal(max)) {
      const maxDec = new Decimal(max)
      maxValid = !(maxDec.cmp(dec) === -1)
    }
    return maxValid && minValid
  }

  /**
   * 补全字符
   * @param decimal 格式化位数
   * @param chat 补全字符
   * @param value 值
   */
  valueLeftCompleting(decimal: number, chat: string, value: any){
    value = Array(decimal + 1).join(chat) + value
    return value.slice(-decimal)
  }

  getDelta() {
    const { decimal, step } = this.props
    if (step) {
      return step
    }
    return decimal ? `.${this.valueLeftCompleting(decimal, '0', '1')}` : '1'
  }

  calcLimit(value: string | number) {
    const { min, max } = this.props
    let canDec = true
    let canInc = true
    if (!value || this.isPotentialValue(value.toString())) {
      canDec = false
      canInc = false
    } else {
      const dec = new Decimal(value)
      if (min !== null && min !== undefined && this.isDecimal(min)) {
        const minDec = new Decimal(min)
        canDec = minDec.cmp(dec) === -1
      }
      if (max !== null && max !== undefined && this.isDecimal(max)) {
        const maxDec = new Decimal(max)
        canInc = dec.cmp(maxDec) === -1
      }
    }
    return {
      canDec,
      canInc
    }
  }

  handleOnChange(val: any) {
    const temp = this.state.value
    const { onChange, parser } = this.props
    const value = parser ? parser(String(val)) : val
    this.setState({
      value
    }, () => {
      if (!this.isDecimal(value) || !this.isValid(value)) {
        this.setState({
          value: temp,
          canDec: false,
          canInc: false
        })
      } else {
        const { canInc, canDec } = this.calcLimit(this.state.value)
        this.setState({
          canDec,
          canInc
        })
        onChange && onChange(value)
      }
    })
  }

  // 加法
  inc() {
    const { disabled, decimal: decimalPlaces, max, onChange } = this.props
    const { value } = this.state
    const { canInc: isAllowInc } = this.calcLimit(value)
    if (disabled || !isAllowInc) return
    const decimal = new Decimal(value)
    let temp = decimal.plus(this.getDelta()).toFixed(decimalPlaces)
    if (max !== null && max !== undefined && this.isDecimal(max) && temp > max) {
      temp = max
    }
    this.setState({
      value: temp
    }, () => {
      const { canInc, canDec } = this.calcLimit(this.state.value)
      this.setState({
        canDec,
        canInc
      })
      onChange && onChange(temp)
    })
  }

  // 减法
  dec() {
    const { disabled, decimal: decimalPlaces, min, onChange } = this.props
    const { value } = this.state
    const { canDec: isAllowDec } = this.calcLimit(value) 
    if (disabled || !isAllowDec) return
    const decimal = new Decimal(value)
    let temp = decimal.minus(this.getDelta()).toFixed(decimalPlaces)
    if (min !== null && min !== undefined && this.isDecimal(min) && temp < min) {
      temp = min
    }
    this.setState({
      value: temp
    }, () => {
      const { canInc, canDec } = this.calcLimit(this.state.value)
      this.setState({
        canDec,
        canInc
      })
      onChange && onChange(temp)
    })
  }

  handleBlur(e: any) {
    const { decimal: decimalPlaces, onBlur } = this.props
    const { value } = this.state
    const temp = decimalPlaces ? new Decimal(value).toFixed(decimalPlaces) : value
    this.setState({
      value: temp
    }, () => {
      this.handleOnChange(temp)
    })
    onBlur && onBlur(e)
  }

  renderAddAfter(showType: string | boolean) {
    const { disabled,  readOnly} = this.props
    const { canDec, canInc } = this.state
    if (showType === 'step' || showType === true) {
      const incCls = classnames(`${this.prefix}-arrow-icon`, {
        [`${this.prefix}-arrow-icon-disabled`]: !!disabled || !canInc || !!readOnly
      })
      const decCls = classnames(`${this.prefix}-arrow-icon`, {
        [`${this.prefix}-arrow-icon-disabled`]: !!disabled || !canDec || !!readOnly
      })
      return (
        <div className={`${this.prefix}-arrows`}>
          <div className={`${this.prefix}-arrow`}>
            <Icon type='up' className={incCls} onClick={this.inc.bind(this)} />
          </div>
          <div className={`${this.prefix}-arrow`}>
            <Icon type='down' className={decCls} onClick={this.dec.bind(this)} />
          </div>
        </div>
      )
    }
    if (showType === 'count') {
      const incCls = classnames(`${this.prefix}-count-icon`, {
        [`${this.prefix}-count-icon-disabled`]: !!disabled || !canInc || !!readOnly
      })
      const decCls = classnames(`${this.prefix}-count-icon`, {
        [`${this.prefix}-count-icon-disabled`]: !!disabled || !canDec || !!readOnly
      })
      return (
        <div className={`${this.prefix}-counts`}>
          <div className={`${this.prefix}-count`}>
            <Icon type='plus' className={incCls} onClick={this.inc.bind(this)} />
          </div>
          <div className={`${this.prefix}-count`}>
            <Icon type='minus' className={decCls} onClick={this.dec.bind(this)} />
          </div>
        </div>
      )
    }
    return null
  }

  render() {
    const { placeholder, showType, formatter, ...rest } = this.props
    const viewProps = omit(rest, ['parser', 'step'])
    const { value } = this.state
    const tempValue = formatter ? formatter(value) : value
    return (
      <Input
        {...viewProps}
        placeholder={placeholder}
        value={tempValue}
        append={this.renderAddAfter(showType)}
        onChange={this.handleOnChange.bind(this)}
        onBlur={this.handleBlur.bind(this)}
      />
    )
  }
}
