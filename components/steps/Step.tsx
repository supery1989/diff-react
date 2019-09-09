import * as React from 'react'
import classnames from 'classnames'
import View, { ROOT_PREFIX } from '../../libs/view'
import Icon from '../icon'

export interface StepProps {
  className?: string,
  style?: object,
  stepNumber?: number,
  stepStatus?: string,
  icon?: string,
  status?: string,
  title?: string,
  desc?: string | React.ReactElement<any>,
  labelPlacement: string,
  space?: number,
  direction?: string,
  total: number
}

export default class Step extends React.Component<StepProps> {
  private prefix = `${ROOT_PREFIX}-step`
  static defaultProps = {
    stepStatus: 'wait',
    total: 0
  }
  state: any

  constructor(props: StepProps) {
    super(props)

    this.state= {
      left: props.direction === 'h' ? 32 : 15
    }
  }

  componentDidMount() {
    const { labelPlacement, direction } = this.props
    if (labelPlacement === 'h' && direction === 'h') {
      const w = (this.refs.title as Element).clientWidth
      const left = w + 32 + 2
      this.setState({
        left
      })
    }
  }

  getIconComp(icon: string = '', tempStatus: string = 'wait', stepNumber: number = 1) {
    let iconComp
    if (icon) {
      iconComp = <Icon type={icon} style={{ fontSize: '24px' }} />
    } else if (tempStatus === 'finish') {
      iconComp = <Icon type='check' />
    } else if (tempStatus === 'error') {
      iconComp = <Icon type='close' />
    } else  {
      iconComp = <div>{stepNumber}</div>
    }
    return iconComp
  }

  render() {
    const { stepNumber, icon, status, stepStatus, title, desc, labelPlacement, space, direction, total, ...rest } = this.props
    const tempStatus = status || stepStatus
    const cls = classnames({
      [`${this.prefix}-${labelPlacement}`]: !!labelPlacement
    })
    let sty = {}
    if (space && stepNumber !== total) {
      if (direction === 'h') {
        sty = { width: `${space}px` }
      } else {
        sty = { height: `${space}px` }
      }
    }
    const headCls = classnames(`${this.prefix}-head`, {
      [`${this.prefix}-head-${tempStatus}`]: !!tempStatus,
      [`${this.prefix}-head-icon`]: !!icon,
      [`${this.prefix}-head-text`]: !icon,
    })
    const lineCls = classnames(`${this.prefix}-line-innder`, {
      [`${this.prefix}-line-active-${tempStatus}`]: !!tempStatus,
      [`${this.prefix}-line-${tempStatus}`]: !!tempStatus,
    })
    const descCls = classnames(`${this.prefix}-content`, {
      [`${this.prefix}-content-${tempStatus}`]: !!tempStatus,
    })
    const iconComp = this.getIconComp(icon, tempStatus, stepNumber)
    return (
      <View config={{...rest, prefix: this.prefix, cls, sty}}>
        <div className={headCls}>
          <div className={`${this.prefix}-line`} style={{ left: `${this.state.left}px` }}>
            <span className={lineCls} />
          </div>
          <span className={`${this.prefix}-icon`}>{iconComp}</span>
        </div>
        <div className={descCls}>
          <div ref='title' className={`${this.prefix}-title`}>{title}</div>
          <div className={`${this.prefix}-desc`}>{desc}</div>
        </div>
      </View>
    );
  }
}
