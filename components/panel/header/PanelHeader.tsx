import * as React from 'react'
import omit from 'omit.js'
import View, { ROOT_PREFIX } from '../../../libs/view'
import Icon from '../../icon'
import './style.scss'

export interface PanelHeaderProps {
  className?: string
  style?: object
  showPrev?: boolean
  prev?: () => void
  title?: string | React.ReactNode
  onClickTitle?: () => void
  showNext?: boolean,
  next?: () => void
}

export default class PanelHeader extends React.Component<PanelHeaderProps> {
  private prefix = `${ROOT_PREFIX}-panel-header`
  static defaultProps = {
    showPrev: true,
    showNext: true
  }

  render() {
    const { showPrev, prev, onClickTitle, title, showNext, next, ...rest } = this.props
    const viewProps = omit(rest, [])
    return (
      <View config={{...viewProps, prefix: this.prefix}}>
        {showPrev && (
          <span className={`${this.prefix}-prev`} onClick={prev}>
            <Icon type='left' className={`${this.prefix}-icon`} />
          </span>
        )}
        <span className={`${this.prefix}-title`} onClick={onClickTitle}>{title}</span>
        {showNext && (
          <span className={`${this.prefix}-next`} onClick={next}>
            <Icon type='right' className={`${this.prefix}-icon`} />
          </span>
        )}
      </View>
    )
  }
}
