import * as React from 'react'
import omit from 'omit.js'
import View, { ROOT_PREFIX } from 'libs/view'
import TimeCell from '../utils/TimeCell'
import { GetCells } from '../utils/TimeBase'

export interface MinutePanelProps {
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
export default class MinutePanel extends React.Component<MinutePanelProps> {
  private prefix = `${ROOT_PREFIX}-minute-panel`
  static defaultProps = {
    step: 1
  }

  render() {
    const { onSelect, step, selected, ...rest } = this.props
    const cells = GetCells('minute', ROW, COL, 60, this.props)
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
