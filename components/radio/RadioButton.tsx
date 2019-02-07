import * as React from 'react'
import { ROOT_PREFIX } from 'libs/view'
import Radio from './Radio'

export interface RadioGroupProps {
  className?: string,
  style?: object,
}

export default class RadioButton extends React.Component<RadioGroupProps> {
  private prefix = `${ROOT_PREFIX}-radio-button`

  render() {
    return (
      <Radio {...this.props} type='button' className={this.prefix} />
    );
  }
}
