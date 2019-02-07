import * as React from 'react'
import View, { ROOT_PREFIX } from 'libs/view'
import Checkbox from './Checkbox';

export interface CheckboxIndeterminateProps {
  options: [{label?: string, value?: string | number | boolean, disabled?: boolean}],
  onChange?: (value: any) => void
}

export default class CheckboxIndeterminate extends React.Component<CheckboxIndeterminateProps> {
  private prefix = `${ROOT_PREFIX}-checkbox-indeterminate`
  static defaultProps = {
    options: []
  }
  state: any

  constructor(props: CheckboxIndeterminateProps) {
    super(props)
    this.state = {
      indeterminate: false,
      checkAll: false,
      checkedValues: []
    }
  }

  onChange(value: any) {
    const { options, onChange } = this.props
    const checkedLen = value.length
    const total = options.length
    this.setState({
      checkedValues: value,
      checkAll: checkedLen === total,
      isIndeterminate: checkedLen > 0 && checkedLen < total
    })
    onChange && onChange(value)
  }

  onChangeAll(value: any) {
    let values: any = []
    const { options, onChange } = this.props
    if (value === 'all') {
      options.map(option => {
        values.push(option.value)
      })
    }
    this.setState({
      checkedValues: values,
      checkAll: value === 'all',
      isIndeterminate: false
    })
    onChange && onChange(values)
  }

  render() {
    const { options } = this.props
    const { checkedValues, isIndeterminate, checkAll } = this.state
    return (
      <View config={{prefix: this.prefix}}>
        <Checkbox
          indeterminate={isIndeterminate}
          style={{marginBottom: '15px'}}
          checked={checkAll}
          value='all'
          onChange={this.onChangeAll.bind(this)}
        >全选</Checkbox>
        <Checkbox.Group values={checkedValues} options={options} onChange={this.onChange.bind(this)} />
      </View>
    );
  }
}