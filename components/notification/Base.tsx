import * as React from 'react'
import classnames from 'classnames'
import omit from 'omit.js'
import { ICON_TYPE_MAP } from 'libs/utils'
import Icon from 'components/icon'

export type CustomType = React.ReactElement<any>;

export interface BaseProps {
  className?: string,
  style?: object,
  prefix?: string,
  type: 'success' | 'warning' | 'info' | 'error',
  // Notification使用
  title?: string,
  // Notification使用
  btn?: CustomType,
  message?: string | React.ReactElement<any>,
  during: number,
  // Toast使用
  showClose?: boolean,
  custom?: CustomType,
  willUnmount?: () => void,
}

export default class Canvas extends React.Component<BaseProps> {
  static defaultProps = {
    during: 3000,
  }
  timer: any;
  state: any;

  constructor(props: BaseProps) {
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
    if (!this.state.show) {
      const { willUnmount } = this.props
      willUnmount && willUnmount()
    }
  }

  clacPorps = () => {
    const { prefix, type, message, showClose, custom, ...rest } = this.props
    const viewProps = omit(rest, ['prefix', 'type', 'message', 'during', 'showClose', 'willUnmount', 'custom', 'title', 'btn'])
    const cls = classnames({
      [`${prefix}-${type}`]: !!type
    })
    let iconComp = null;
    if (custom) {
      if (React.isValidElement(custom)) {
        iconComp = React.cloneElement((custom as CustomType), {
          className: classnames((custom as CustomType).props.className, `${prefix}-icon`)
        })
      }
    } else {
      iconComp = type && <Icon type={ICON_TYPE_MAP[type]} className={`${prefix}-icon`} />
    }
    return { viewProps, iconComp, cls }
  }
}
