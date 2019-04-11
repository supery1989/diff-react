import * as React from 'react'
import classnames from 'classnames'
import omit from 'omit.js'
import View, { ROOT_PREFIX } from 'libs/view'
import Icon from 'components/icon'
import Tooltip from 'components/tooltip'
import Popup from 'components/popup'

export interface BlockHeaderProps {
  className?: string
  style?: object
  title?: string
  subTitle?: string | React.ReactNode
  extra?: string | React.ReactNode
  align: 'left' | 'right'
  info?: string | React.ReactNode
  infoTitle: string,
  icon: 'question' | 'info'
  infoType: 'tooltip' | 'popup'
  trigger?: 'hover' | 'click' | 'focus'
  showBackground?: boolean | string
  onClick?: () => void
}

export default class BlockHeader extends React.Component<BlockHeaderProps> {
  private prefix = `${ROOT_PREFIX}-block-header`
  static defaultProps = {
    align: 'right',
    icon: 'question',
    infoType: 'tooltip',
    infoTitle: '温馨提示',
    showBackground: true
  }

  popupClick() {
    Popup({
      title: this.props.infoTitle,
      message: this.props.info,
    }, 'alert')
  }

  handleClick() {
    const { onClick } = this.props
    onClick && onClick()
  }

  renderInfo() {
    const { icon, info, infoType, trigger } = this.props
    if (!info) {
      return null
    }
    const iconType = icon === 'question' ? 'questioncircle' : 'infocircle'
    if (infoType === 'tooltip') {
      return <Tooltip trigger={trigger} content={info} placement='top'><Icon className={`${this.prefix}-tip-icon`} type={iconType} /></Tooltip>
    }
    if (infoType === 'popup') {
      return <Icon className={`${this.prefix}-tip-icon`} type={iconType} onClick={this.popupClick.bind(this)} />
    }
    return null
  }

  render() {
    const { title, extra, align, subTitle, showBackground, ...rest } = this.props
    const viewProps = omit(rest, ['infoType', 'icon', 'info', 'infoTitle', 'trigger', 'onClick'])
    const contentCls = classnames(`${this.prefix}-right`, {
      [`${this.prefix}-right-${align}`]: align
    })
    let sty = {}
    if (!showBackground) {
      sty = {
        background: 'unset'
      }
    } else if (typeof showBackground === 'string') {
      sty = {
        background: showBackground
      }
    }
    
    return (
      <View config={{...viewProps, prefix: this.prefix, sty}}>
        {title && <div className={`${this.prefix}-left`}><div className={`${this.prefix}-title`}>{title}</div></div>}
        {subTitle && <div className={`${this.prefix}-sub-title`}>{title}</div>}
        {this.renderInfo()}
        {extra && <div className={contentCls} onClick={this.handleClick.bind(this)}>{extra}</div>}
      </View>
    )
  }
}
