import * as React from 'react'
import { ROOT_PREFIX } from '../../libs/view'
import Checkbox from './Checkbox'

export interface CheckboxGroupProps {
  className?: string,
  style?: object,
}

export default class CheckboxButton extends React.Component<CheckboxGroupProps> {
  private prefix = `${ROOT_PREFIX}-checkbox-button`

  render() {
    return (
      <Checkbox {...this.props} type='button' className={this.prefix} />
    );
  }
}
