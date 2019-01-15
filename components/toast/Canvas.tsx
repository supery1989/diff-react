
import * as React from 'react'
import classnames from 'classnames'
import omit from 'omit.js'
import View from 'libs/view'
import { ICON_TYPE_MAP } from 'libs/utils'
import Transtion from 'components/transition'
import Icon from 'components/icon'

export type CustomType = React.ReactElement<any>;

export interface ToastProps {
  className?: string,
  style?: object,
  type: 'success' | 'warning' | 'info' | 'error',
  message?: string | React.ReactElement<any>,
  during: number,
  showClose?: boolean,
  custom?: CustomType,
  willUnmount?: () => void,
}

export default class Canvas extends React.Component<ToastProps> {
  private prefix = 'diff-toast'
  static defaultProps = {
    type: 'info',
    during: 3000,
  }
  timer: any;
  state: any;

  constructor(props: ToastProps) {
    super(props)
    this.state= {
      show: false
    }
    this.timer = null
  }

  componentDidMount() {
    this.setState({
      show: true,
    })
    this.startTimer()
  }

  componentWillUnmount() {
    this.stopTimer()
  }

  onClose = ()=> {
    this.stopTimer()
    this.setState({
      show: false
    });
  }

  startTimer = ()=> {
    const { during } = this.props;
    if (during > 0) {
      this.timer = setTimeout(() => {
        this.onClose()
      }, during)
    }
  }

  stopTimer = ()=> {
    clearTimeout(this.timer)
  }

  afterLeave() {
    console.dir(this.state.show)
    if (!this.state.show) {
      const { willUnmount } = this.props
      willUnmount && willUnmount()
    }
  }

  render() {
    const { type, message, showClose, custom, ...rest } = this.props
    const viewProps = omit(rest, ['type', 'message', 'during', 'showClose', 'willUnmount', 'custom'])
    const cls = classnames({
      [`${this.prefix}-${type}`]: !!type
    })
    let iconComp = null;
    if (custom) {
      if (React.isValidElement(custom)) {
        iconComp = React.cloneElement((custom as CustomType), {
          className: classnames((custom as CustomType).props.className, `${this.prefix}-icon`)
        })
      }
    } else {
      iconComp = <Icon type={ICON_TYPE_MAP[type]} className={`${this.prefix}-icon`} />
    }

    return (
      <Transtion type="fade" show={this.state.show} unmount init onEnd={this.afterLeave.bind(this)}>
        <View config = {{ ...viewProps, prefix: this.prefix, cls }} onMouseEnter={this.stopTimer} onMouseLeave={this.startTimer}>
          <div className={`${this.prefix}-content`}>
            {iconComp}
            <span className={`${this.prefix}-message`}>{message}</span>
            {showClose && <Icon type='close' className={`${this.prefix}-close`} onClick={this.onClose} />}
          </div>
        </View>
      </Transtion>
    )
  }
}
