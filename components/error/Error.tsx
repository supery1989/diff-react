import * as React from 'react'
import omit from 'omit.js'
import View, { ROOT_PREFIX } from 'libs/view'
import Icon from 'components/icon'
import Tooltip from 'components/tooltip'

export interface OnErrorCallback {
  (error: Error, componentStack: string): void;
}

export interface FallbackComponentProps {
  error: Error;
  componentStack: string;
}

export interface ErrorProps {
  className?: string
  style?: object
  tip?: string | React.ReactNode
  onError?: OnErrorCallback
  FallbackComponent?: React.ComponentType<FallbackComponentProps>
}

export default class Error extends React.Component<ErrorProps> {
  private prefix = `${ROOT_PREFIX}-error`
  static CatchError: any
  state: any

  constructor(props: ErrorProps) {
    super(props)
    
    this.state = {
      error: null,
      info: null
    }
  }

  componentDidCatch(error: any, info: any) {
    const { onError } = this.props

    if (typeof onError === 'function') {
      try {
        onError(error, this.getComponentStack(info))
      } catch (ignoredError) {}
    }

    this.setState({ error, info })
  }

  getComponentStack(info: any) {
    return info ? info.componentStack : '';
  }

  renderTip() {
    const { tip, ...rest } = this.props
    const viewProps = omit(rest, ['FallbackComponent', 'onError', 'tip'])
    if (!tip) return null
    return (
      <View config={{...viewProps, prefix: this.prefix}}>
        <Icon className={`${this.prefix}-icon`} type='warningcircle' />
        {tip}
      </View>
    )
  }

  defaultFallback(error: any, componentStack: any) {
    const { ...rest } = this.props
    const viewProps = omit(rest, ['FallbackComponent', 'onError', 'tip'])
    return (
      <View config={{...viewProps, prefix: this.prefix}}>
        <Tooltip content={componentStack} contentClass={`${this.prefix}-tip`}>
          <Icon className={`${this.prefix}-icon`} type='warningcircle' />
        </Tooltip>
        <span>{error.toString()}</span>
      </View>
    )
  }

  render() {
    const { children, FallbackComponent, tip } = this.props
    const { error, info } = this.state
    if (tip !== undefined) {
      return this.renderTip()
    }
    if (error !== null) {
      if (FallbackComponent) {
        return <FallbackComponent componentStack={this.getComponentStack(info)} error={error} />
      }
      return this.defaultFallback(error, this.getComponentStack(info))
    }
    return children
  }
}
