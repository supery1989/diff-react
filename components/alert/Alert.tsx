
import * as React from 'react'
import classnames from 'classnames'
import omit from 'omit.js'
import View from 'libs/view'
import Icon from 'components/icon'
import Transition from 'components/transition'
import { ICON_TYPE_MAP } from 'libs/utils'

export interface AlertProps {
  className?: string,
  style?: object,
  type: 'success' | 'warning' | 'info' | 'error',
  title: string,
  closable?: boolean,
  closeText?: string,
  showIcon?: boolean,
  desc?: string,
  onClose?: () => void,
}

export default class Alert extends React.Component<AlertProps> {
  private prefix = 'diff-alert'
  static defaultProps = {
    closable: true,
    type: 'info',
  }
  state: any
  constructor(props: AlertProps) {
    super(props);

    this.state = {
      show: true,
    };
  }

  close = () => {
    this.setState({
      show: false
    })
  }

  afterLeave = ()=> {
    const { onClose } = this.props
    if (onClose) {
      onClose()
    }
  }

  render() {
    const { type, title, closable, closeText, showIcon, desc, ...rest } = this.props
    const cls = classnames({
      [`${this.prefix}-${type}`]: !!type
    })
    const viewProps = omit(rest, ['onClose']);

    const closeComp = closeText ? (<div className={`${this.prefix}-close`} onClick={this.close}>{closeText}</div>) : (<Icon type='close' className={`${this.prefix}-close`} onClick={this.close} />);

    const iconCls = classnames(`${this.prefix}-icon`, {
      [`${this.prefix}-icon-big`]: !!desc
    })
    const iconComp = showIcon && <Icon type={ICON_TYPE_MAP[type]} className={iconCls} />;
    return (
      <Transition type="fade" show={this.state.show} unmount onEnd={this.afterLeave}>
        <View config = {{ ...viewProps, prefix: this.prefix, cls }}>
          {iconComp}
          <div className={`${this.prefix}-content`}>
            {
              title && <span className={`${this.prefix}-title`}>{title}</span>
            }
            { desc && <div className={`${this.prefix}-desc`}>{desc}</div> }
            { closable && closeComp}
          </div>
        </View>
      </Transition>
    )
  }
}
