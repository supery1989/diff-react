import * as React from 'react'
import classnames from 'classnames'
import omit from 'omit.js'
import PropTypes from 'prop-types'
import View, { ROOT_PREFIX } from 'libs/view'

export interface FormProps {
  className?: string
  style?: object
  inline?: boolean
  labelPosition: 'left' | 'right' | 'top'
  labelSuffix: string | React.ReactNode
  labelWidth: number
  onSubmit?: () => void
}

export default class Form extends React.Component<FormProps> {
  private prefix = `${ROOT_PREFIX}-form`
  static defaultProps = {
    labelPosition: 'right',
    labelSuffix: ''
  }
  static childContextTypes = {
    component: PropTypes.any
  }
  state: any

  constructor(props: FormProps) {
    super(props)

    this.state = {
      fields: [],
      // error: ''
    }
  }

  getChildContext() {
    return {
      component: this
    }
  }

  addField(field: any) {
    this.state.fields.push(field)
  }

  removeField(field: any) {
    if (field.props.name) {
      this.state.fields.splice(this.state.fields.indexOf(field), 1)
    }
  }

  reset() {
    this.state.fields.forEach((field: any) => {
      field.reset()
    })
  }

  validate() {
    let valid = true
    let count = 0
    if (this.state.fields.length === 0) valid = true
    this.state.fields.forEach((field: any) => {
      if (field.validate()) {
        count++
      }
    })
    if (count === this.state.fields.length) {
      valid = true
    } else {
      valid = false
    }
    return valid
  }

  render() {
    const { inline, labelPosition, onSubmit, children, ...rest } = this.props
    const viewProps = omit(rest, ['labelSuffix', 'labelWidth'])
    const cls = classnames(`${this.prefix}-${labelPosition}`, {
      [`${this.prefix}-inline`]: inline
    })
    return (
      <View config={{...viewProps, prefix: this.prefix, cls}} tag='form' onSubmit={onSubmit}>
        {children}
      </View>
    )
  }
}
