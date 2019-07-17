import * as React from 'react'
import omit from 'omit.js'
import View, { ROOT_PREFIX } from 'libs/view'
import Icon from 'components/icon'

export interface ImagePreviewProps {
  className?: string
  style?: object
  src?: string
  alt?: string
  title?: string
  action: boolean
  onClose?: () => void
}

export default class ImagePreview extends React.Component<ImagePreviewProps> {
  private prefix = `${ROOT_PREFIX}-image-preview`
  static defaultProps = {
    action: true
  }
  state: any

  constructor(props: ImagePreviewProps) {
    super(props)

    this.state = {
      show: false,
      scale: 1,
      rotate: 0,
      showTitle: false,
      showAction: false,
    }
  }

  handleRotate() {
    const { rotate } = this.state
    this.setState({
      rotate: 90 + rotate
    })
  }

  handleScale(type: string) {
    const { scale } = this.state
    if (type === 'plus') {
      if (scale >= 1 && scale < 5) {
        this.setState({
          scale: scale + 1
        })
      } else if (scale < 1 && scale > 0) {
        this.setState({
          scale: scale + 0.2
        })
      }
    } else if (type === 'minus') {
      if (scale > 1) {
        this.setState({
          scale: scale - 1
        })
      } else if (scale > 0.4 && scale <= 1) {
        this.setState({
          scale: scale - 0.2
        })
      }
    }
  }

  onMaskClick(e: any) {
    if (e.target.className.indexOf('wrap') > -1) {
      this.onClose()
    }
  }

  onShow() {
    this.setState({ show: true })
  }

  onClose() {
    const { onClose } = this.props
    this.setState({ show: false })
    onClose && onClose()
  }

  onReset() {
    this.setState({
      scale: 1,
      rotate: 0,
    })
  }

  showTitle() {
    this.setState({
      showTitle: !this.state.showTitle
    })
  }

  showFooter(isShow: boolean) {
    this.setState({
      showAction: isShow
    })
  }

  render() {
    const { src, alt, action, title, ...rest } = this.props
    const viewProps = omit(rest, ['onClose'])
    const { show, scale, rotate, showTitle, showAction } = this.state
    const imageSty = {
      transform: `rotate(${rotate}deg) scale(${scale})`,
      transitionDuration: '0.5s'
    }
    return (
      <View config={{...viewProps, prefix: this.prefix}}>
        <img onClick={this.onShow.bind(this)} className={`${this.prefix}-img`} src={src} alt={alt} title={title} />
        {show && (
          <div className={`${this.prefix}-mask`} onClick={this.onMaskClick.bind(this)}>
            <Icon className={`${this.prefix}-close`} type='closecircle' onClick={this.onClose.bind(this)} />
            <div className={`${this.prefix}-wrap`}>
              <img className={`${this.prefix}-big`} src={src} style={imageSty} onMouseEnter={this.showFooter.bind(this, true)} onClick={this.showFooter.bind(this, false)} />
            </div>
            {action && showAction && <div className={`${this.prefix}-footer`}>
              <span className={`${this.prefix}-action`}><Icon type='plus' className={`${this.prefix}-action-icon`} onClick={this.handleScale.bind(this, 'plus')} /></span>
              <span className={`${this.prefix}-action`}><Icon type='minus' className={`${this.prefix}-action-icon`} onClick={this.handleScale.bind(this, 'minus')} /></span>
              <span className={`${this.prefix}-action`}><Icon type='reload' className={`${this.prefix}-action-icon`} onClick={this.handleRotate.bind(this)} /></span>
              {alt && <span className={`${this.prefix}-action`}><Icon type='tag-o' className={`${this.prefix}-action-icon`} onClick={this.showTitle.bind(this)} /></span>}
              <span className={`${this.prefix}-action`}><Icon type='retweet' className={`${this.prefix}-action-icon`} onClick={this.onReset.bind(this)} /></span>
            </div>}
            {showTitle && <div className={`${this.prefix}-title`}>{title || alt}</div>}
          </div>
        )}
      </View>
    )
  }
}
