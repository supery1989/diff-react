import * as React from 'react'
import omit from 'omit.js'
import View, { ROOT_PREFIX } from 'libs/view'
import TimeCell from '../utils/TimeCell'
import { GetCells } from '../utils/TimeBase'
import PanelHeader from '../header/PanelHeader'

export interface MinutePanelProps {
  className?: string
  style?: object
  onSelect?: (value: any) => void
  step: number
  selected: any
  disabled?: () => void
  hideHeader?: boolean
  hidePanel?: () => void
}

const ROW = 9
const COL = 7
export default class MinutePanel extends React.Component<MinutePanelProps> {
  private prefix = `${ROOT_PREFIX}-minute-panel`
  static defaultProps = {
    step: 1
  }

  render() {
    const { onSelect, step, selected, hidePanel, hideHeader, ...rest } = this.props
    const cells = GetCells('minute', ROW, COL, 60, this.props)
    const viewProps = omit(rest, ['disabled'])
    return (
      // hideHeader
      <View config={{...viewProps, prefix: this.prefix}}>
        {!hideHeader && (
          <div className={`${ROOT_PREFIX}-date-picker-panel-header`}>
            <PanelHeader
              title='选择分钟'
              prev={hidePanel}
              showNext={false}
            />
          </div>
        )}
        <div className={`${this.prefix}-table`}>
          <TimeCell type='time' cells={cells} onSelect={onSelect} />
        </div>
      </View>
    )
  }
}
