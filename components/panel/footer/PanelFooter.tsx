import * as React from 'react'
import omit from 'omit.js'
import View, { ROOT_PREFIX } from '../../../libs/view'
import Button from '../../button'
import Icon from '../../icon'
import './style.scss'

export interface PanelFooterProps {
  className?: string
  style?: object
  onReset?: () => void
  onConfirm?: () => void
  onNow?: () => void
  showNow: boolean
  showReset: boolean
  nowText: string
  resetText: string
  confirmText: string
  showError: boolean
  errorText?: string
}

export default class PanelFooter extends React.Component<PanelFooterProps> {
  private prefix = `${ROOT_PREFIX}-panel-footer`
  static defaultProps = {
    showNow: true,
    showReset: true,
    showError: true,
    nowText: '此刻',
    resetText: '重置',
    confirmText: '确认'
  }

  render() {
    const { showError, errorText, showNow, showReset, nowText, resetText, confirmText, onConfirm, onReset, onNow, ...rest } = this.props
    const viewProps = omit(rest, [])
    return (
      <View config={{...viewProps, prefix: this.prefix}}>
        {showError && errorText && (
          <div className={`${this.prefix}-error`}>
            <Icon className={`${this.prefix}-error-icon`} type='warningcircle' />
            {errorText}
          </div>
        )}
        <div className={`${this.prefix}-btn`}>
          {showNow && <Button className={`${this.prefix}-now`} type='link' size='small' onClick={onNow}>{nowText}</Button>}
          {showReset && <Button type='link' size='small' onClick={onReset}>{resetText}</Button>}
          <Button type='primary' size='small' onClick={onConfirm}>{confirmText}</Button>
        </div>
      </View>
    )
  }
}
