import * as React from 'react'
import classnames from 'classnames'
import omit from 'omit.js'
import View from '../../libs/view'

export interface TransitionProps {
  className?: string;
  style?: object;
  type?: string;
  infinite?: boolean;
  unmount?: boolean;
  show?: boolean;
  during?: number;
  transfer?: boolean;
  init?: boolean;
  onEnd?: () => void;
}

export default class Transition extends React.Component<TransitionProps> {
  private prefix = 'diff-transition';
  static defaultProps = {
    unmount: true,
    during: 1000,
    show: false,
    transfer: true
  };
  state: any;

  private unmountTimer: any;

  constructor(props: TransitionProps) {
    super(props);
    let initialStatus;

    if (props.show || !props.transfer) {
      initialStatus = "entered";
    } else {
      initialStatus = "unmounted";
    }

    this.state = {
      status: initialStatus,
      cls: ''
    };
  }

  // 卸载组件
  handleUnmount(isShow?: boolean) {
    const {
      unmount,
      during,
      transfer,
      infinite,
      onEnd
    } = this.props;
    console.dir(this.props)
    let unmountStatus: string;
    if (isShow || !transfer) {
      unmountStatus = "entered";
    } else {
      if (unmount) {
        unmountStatus = "unmounted";
      } else {
        unmountStatus = "exited";
      }
    }
    if (this.unmountTimer) {
      clearTimeout(this.unmountTimer);
    }

    if (unmountStatus === "unmounted") {
      console.dir(777)
      this.unmountTimer = setTimeout(() => {
        this.setState(
          {
            status: unmountStatus
          },
          () => {
            if (onEnd) {
              onEnd();
            }
          }
        );
      }, during);
    } else {
      if (transfer || (!transfer && !infinite)) {
        this.setState({ status: unmountStatus });

        this.unmountTimer = setTimeout(() => {
          if (onEnd) {
            onEnd();
            if (!transfer) {
              this.setState({ cls: '' });
            }
          }
        }, during);
      }
    }
  }

  setTransitionClass = (props: TransitionProps) => {
    const { type, show, infinite, transfer } = props;
    let animateType;
    if (transfer) {
      if (show) {
        animateType = `${type}In`;
      } else {
        animateType = `${type}Out`;
      }
    } else {
      animateType = type;
    }
    const cls = classnames({
      [`${this.prefix}-infinite`]: infinite,
      [`${this.prefix}-${animateType}`]: animateType
    });
    return cls;
  };

  componentWillUnmount() {
    clearTimeout(this.unmountTimer);
  }

  componentWillReceiveProps(nextProps: TransitionProps) {
    if (this.props.show !== nextProps.show) {
      this.setState({
        cls: this.setTransitionClass(nextProps)
      });
    }
    this.handleUnmount(nextProps.show);
  }

  componentDidMount() {
    if (this.props.init) {
      this.setState({
        cls: this.setTransitionClass(this.props)
      });
    }
  }

  render() {
    const { children, during, init, ...rest } = this.props;
    const { status, cls } = this.state;

    let Comp = null
    if (children) {
      const elem = React.Children.only(children)
      Comp = React.cloneElement(elem)
    } else {
      Comp = null
    }
    const sty = { animationDuration: `${(during as number) / 1000}s` }
    const viewProps = omit(rest, ['children', 'during', 'unmount', 'transfer', 'infinite', 'onEnd', 'show']);
    console.dir(111)
    console.dir(status)
    return (
      (status === 'unmounted' ? null : <View config={{...viewProps, prefix: this.prefix, cls, sty}}>{Comp}</View>)
    );
  }
}

/*
 *type
 *bounce, 反弹  bounceIn, bounceInDown, bounceInLeft, bounceInRight, bounceInUp, bounceOut, bounceOutDown, bounceOutLeft, bounceOutRight, bounceOutUp
 *false, 闪光
 *pulse, 脉冲
 *rubberBand, 橡皮筋
 *shake, 震动
 *headShake, 摇头
 *swing, 摆动
 *tada, 塔达
 *wobble, 晃动
 *jello, 果冻
 *fadeIn, 渐显 fadeInDown, fadeInDownBig, fadeInLeft, fadeInLeftBig, fadeInRight, fadeInRightBig, fadeInUp, fadeInUpBig
 *fadeOut, 渐隐 fadeOutDown, fadeOutDownBig, fadeOutLeft, fadeOutLeftBig, fadeOutRight, fadeOutRightBig, fadeOutUp, fadeOutUpBig
 *翻入 flipInX, flipInY, flipOutX, flipOutY
 *光速 lightSpeedIn, lightSpeedOut
 *旋转 rotateIn, rotateInDownLeft, rotateInDownRight, rotateInUpLeft, rotateInUpRight, rotateOut, rotateOutDownLeft, rotateOutDownRight, rotateOutUpLeft, rotateOutUpRight
 *hinge, 铰链 
 *jackInTheBox, 杰克盒
 *滚动 rollIn, rollOut
 *变焦 zoomIn, zoomInDown, zoomInLeft, zoomInRight, zoomInUp, zoomOut, zoomOutDown, zoomOutLeft, zoomOutRight, zoomOutUp
 *滑动 slideInDown, slideInLeft, slideInRight, slideInUp, slideOutDown, slideOutLeft, slideOutRight, slideOutUp
*/
