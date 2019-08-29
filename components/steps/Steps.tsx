import * as React from 'react'
import classnames from 'classnames'
import omit from 'omit.js'
import View, { ROOT_PREFIX } from 'libs/view'

export interface StepsProps {
  className?: string,
  style?: object,
  current: number,
  goingStatus: 'wait' | 'finish' | 'error' | 'going',
  labelPlacement: 'v' | 'h',
  space?: number,
  direction: 'v' | 'h'
}

export default class Steps extends React.Component<StepsProps> {
  private prefix = `${ROOT_PREFIX}-steps`
  static Step: any
  static defaultProps = {
    current: 0,
    goingStatus: 'going',
    labelPlacement: 'v',
    direction: 'h'
  }

  constructor(props: StepsProps) {
    super(props)
  }

  calcStatus = (index: number) => {
    const { current, goingStatus } = this.props
    let status = 'wait'
    if (current > index) {
      status = 'finish'
    } else if (current === index) {
      status = goingStatus
    }
    return status
  }

  render() {
    const { children, labelPlacement, space, direction, ...rest } = this.props
    const viewProps = omit(rest, ['current', 'goingStatus', 'space'])
    const cls = classnames({
      [`${this.prefix}-flex`]: !space,
      [`${this.prefix}-${direction}`]: direction
    })
    const placement = direction === 'v' ? 'h' : labelPlacement
    return (
      <View config={{...viewProps, prefix: this.prefix, cls}}>
        {React.Children.map(children, (child: any, index: number) => {
          return React.cloneElement(child, {
            direction,
            space,
            labelPlacement: placement,
            stepStatus: this.calcStatus(index),
            stepNumber : index + 1,
            total: React.Children.count(children)
          })
        })}
      </View>
    );
  }
}
