import * as React from 'react'
import * as ReactDOM from 'react-dom'
import classnames from 'classnames'
import View, { ROOT_PREFIX } from '../../libs/view'
import Icon from '../icon'

export interface AvatarProps {
  className?: string
  style?: object
  shape?: string
  size?: string
  scale?: string
  src?: string
  alt?: string
  icon?: string
  isImgExist?: boolean
  onError?: () => void
}

export default class Avatar extends React.Component<AvatarProps> {
  private prefix = `${ROOT_PREFIX}-avatar`
  private textChildren: any
  static defaultProps = {
    shape: 'circle',
    size: 'default',
  }
  state: any

  constructor(props: AvatarProps) {
    super(props);
    this.state = {
        isImgExist: true,
        scale: 1,
    }
  }

  componentDidMount() {
    this.setScale()
  }

  componentDidUpdate(prevProps: AvatarProps, prevState: AvatarProps) {
    if ((prevState.scale !== this.state.scale && this.state.scale === 1)
      || (prevState.isImgExist !== this.state.isImgExist)) {
      this.setScale()
    }
  }

  onImageLoadError() {
    const { onError } = this.props
    this.setState({
        isImgExist: false,
    })
    if(onError){
        onError();
    }
  }

  setScale() {
    const childrenNode = this.textChildren
    if (childrenNode) {
      const textChildrenWidth = childrenNode.offsetWidth
      const avatarNode = ReactDOM.findDOMNode(this)
      const avatarNodeWidth = (avatarNode as HTMLElement).offsetWidth
      if (avatarNodeWidth - 6 < textChildrenWidth) {
        this.setState({
          scale: (avatarNodeWidth - 6) / textChildrenWidth,
        })
      } else {
        this.setState({
          scale: 1,
        })
      }
    }
  }

  render() {
    const { shape, size, src, alt, icon, children, ...rest } = this.props
    const cls = classnames({
      [`${this.prefix}-${shape}`]: shape,
      [`${this.prefix}-${size}`]: typeof size === 'string',
      [`${this.prefix}-image`]: src && this.state.isImgExist
    })
    let sty = {}
    let iconSty = {}
    if (typeof size === 'number') {
      sty = {
        width: size,
        height: size,
        lineHeight: `${size}px`,
        fontSize: size / 2,
      }
      iconSty = { fontSize: size / 2 }
    }
    let childrenNode
    if (src && this.state.isImgExist) {
      childrenNode = (
        <img src={src} alt={alt} onError={this.onImageLoadError} />
      )
    } else if (icon) {
      childrenNode = (
          <Icon type={icon} className={`${this.prefix}-icon`} style={iconSty} />
      )
    } else if (typeof children === 'string') {
      if (this.textChildren || this.state.scale !== 1) {
        const textStyle = {
          msTransform: `scale(${this.state.scale})`,
          WebkitTransform: `scale(${this.state.scale})`,
          transform: `scale(${this.state.scale})`,
          left: `calc(50% - ${Math.round(this.textChildren.offsetWidth / 2)}px)`,
        }
        childrenNode = (
          <span className={`${this.prefix}-text`} ref={node => this.textChildren = node} style={textStyle}>{children}</span>
        )
      } else {
        childrenNode = (
          <span ref={node => this.textChildren = node}>{children}</span>
        )
      }
    } else if (children) {
      childrenNode = children
    } else {
      childrenNode = (
        <Icon type='user' className={`${this.prefix}-icon`} style={iconSty} />
      )
    }
    return (
      <View config={{...rest, prefix: this.prefix, cls, sty}} tag='span'>{childrenNode}</View>
    )
  }
}
