import * as React from 'react'
import omit from 'omit.js'
import View, { ROOT_PREFIX } from 'libs/view'
import TimeCell from '../utils/TimeCell'
import { GetCells } from '../utils/TimeBase'

export interface SecondPanelProps {
  className?: string
  style?: object
  onSelect?: (value: any) => void
  step: number
  selected: any
  disabled?: () => void
  hideHeader?: boolean
}

const ROW = 9
const COL = 7
export default class SecondPanel extends React.Component<SecondPanelProps> {
  private prefix = `${ROOT_PREFIX}-second-panel`
  static defaultProps = {
    step: 1
  }

  render() {
    const { onSelect, step, selected, ...rest } = this.props
    const cells = GetCells('second', ROW, COL, 60, this.props)
    const viewProps = omit(rest, ['disabled', 'hideHeader'])
    return (
      // hideHeader
      <View config={{...viewProps, prefix: this.prefix}}>
        <div className={`${this.prefix}-table`}>
          <TimeCell type='time' cells={cells} onSelect={onSelect} />
        </div>
      </View>
    )
  }
}
