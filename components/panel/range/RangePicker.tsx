import * as React from 'react'
import omit from 'omit.js'
import { ROOT_PREFIX } from '../../../libs/view'
import Moment from '../../moment'
import { RangeCommonProps } from '../utils/TimeBase'

export default class RangePicker<T> extends React.Component<RangeCommonProps> {
  protected prefix = `${ROOT_PREFIX}-time-range-picker`
  state: any
  format: string
  inputValue: any

  initTime(value: any) {
    return Moment.unix(value)
  }

  handleChange(key: number, val: any, inputVal: string) {
    const { onChange } = this.props
    const { tempValue } = this.state
    tempValue[key] = val
    this.inputValue[key] = inputVal
    this.setState({
      tempValue
    }, () => {
      onChange && onChange(tempValue, this.inputValue)
    })
  }

  renderPicker(Comp: any) {
    const { placeholder, value, max, min, toText, ...rest } = this.props
    const viewProps = omit(rest, ['wrapperClassName', 'wrapperStyle'])
    const { tempValue } = this.state
    return (
      <div>
        <Comp
          {...viewProps}
          placeholder={placeholder[0]}
          max={tempValue[1] || max}
          onChange={this.handleChange.bind(this, 0)}
          value={value[0] || ''}
        />
        <span className={`${this.prefix}-to`}>{toText}</span>
        <Comp
          {...viewProps}
          placeholder={placeholder[1]}
          min={tempValue[0] || min}
          onChange={this.handleChange.bind(this, 1)}
          value={value[1] || ''}
        />
      </div>
    )
  }
}
