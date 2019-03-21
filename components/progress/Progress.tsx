import * as React from 'react'
import classnames from 'classnames'
import omit from 'omit.js'
import View, { ROOT_PREFIX } from 'libs/view'
import Icon from 'components/icon'

export interface ProgressProps {
  className?: string
  style?: object
  percentage?: number
  strokeWidth?: number
  gapDegree?: number
  gapPosition?: string
  type?: string
  status?: string
  showText?: boolean
  textInside?: boolean
  format?: (percent?: number, successPercent?: number) => string
  color?: string
  trailColor?: string
  width?: number
}

export default class Progress extends React.Component<ProgressProps> {
  private prefix = `${ROOT_PREFIX}-progress`
  static defaultProps = {
    type: 'line',
    strokeWidth: 6,
    percentage: 0,
    showText: true,
    trailColor: '#bfcbd9',
  }

  getPathStyles() {
    const { percentage, strokeWidth, gapDegree = 0, gapPosition, type } = this.props
    const gapPos = gapPosition || type === 'dashboard' && 'bottom' || 'top'
    const gapDeg: any = gapDegree || type === 'dashboard' && 75
    const radius = 50 - ((strokeWidth as number) / 2)
    let beginPositionX = 0
    let beginPositionY = -radius
    let endPositionX = 0
    let endPositionY = -2 * radius
    switch (gapPos) {
      case 'left':
          beginPositionX = -radius;
          beginPositionY = 0;
          endPositionX = 2 * radius;
          endPositionY = 0;
          break
      case 'right':
          beginPositionX = radius;
          beginPositionY = 0;
          endPositionX = -2 * radius;
          endPositionY = 0;
          break
      case 'bottom':
          beginPositionY = radius;
          endPositionY = 2 * radius;
          break
      default:
        break
    }
    const pathString = `M 50,50 m ${beginPositionX},${beginPositionY}
     a ${radius},${radius} 0 1 1 ${endPositionX},${-endPositionY}
     a ${radius},${radius} 0 1 1 ${-endPositionX},${endPositionY}`
    const len = Math.PI * 2 * radius
    const trailPathStyle = {
      strokeDasharray: `${len - gapDeg}px ${len}px`,
      strokeDashoffset: `-${gapDeg / 2}px`,
      transition: 'stroke-dashoffset .3s ease 0s, stroke-dasharray .3s ease 0s, stroke .3s',
    };
    const strokePathStyle = {
      strokeDasharray: `${((percentage as number) / 100) * (len - gapDeg)}px ${len}px`,
      strokeDashoffset: `-${gapDeg / 2}px`,
      transition: 'stroke-dashoffset .3s ease 0s, stroke-dasharray .3s ease 0s, stroke .3s, stroke-width .06s ease .3s',
    }
    return { pathString, trailPathStyle, strokePathStyle }
  }

  stroke() {
    const { percentage, color } = this.props
    let ret
    if (color) {
      ret = color
    } else {
      // TODO 颜色统一
      switch (this.props.status) {
        case 'success': ret = '#52c41a'; break
        case 'error': ret = '#f5222d'; break
        default: ret = '#1890ff'
      }
    }
    if (percentage === 100) {
      ret = '#52c41a'
    }
    return ret
  }

  getText() {
    const { textInside, percentage, format, type, strokeWidth, width, showText, status } = this.props
    const progressStatus = parseInt((percentage as number).toString(), 10) >= 100 && !('status' in this.props) ? 'success' : status
    let text
    let textFontSize = 12
    if (!showText) return null
    if ((strokeWidth as number) > 15) {
      textFontSize = (strokeWidth as number) * 0.8;
    } else if (type === 'circle' || type === 'dashboard') {
      textFontSize = (width || 120) * 0.15 + 6
    }
    if (!textInside && progressStatus === 'error') {
      text = format ? format(percentage) : <Icon style={{ fontSize: `${textFontSize}px` }} type={type === 'line' ? 'closecircle' : 'close'} />
    } else if (!textInside && progressStatus === 'success') {
      text = format ? format(percentage) : <Icon style={{ fontSize: `${textFontSize}px` }} type={type === 'line' ? 'checkcircle' : 'check'} />
    } else {
      text = format ? format(percentage) : `${percentage}%`
    }
    return <span className={`${this.prefix}-text`} style={{ fontSize: `${textFontSize}px` }}>{text}</span>
  }

  render() {
    const { type, percentage, strokeWidth, showText, textInside, status, color, trailColor, width, ...rest } = this.props;
    const viewProps = omit(rest, ['format', 'gapPosition', 'gapDegree'])
    const cls = classnames({
        [`${this.prefix}-${type}`]: type,
        [`${this.prefix}-show-text`]: showText,
        [`${this.prefix}-text-inside`]: textInside,
        [`${this.prefix}-status-${status}`]: status,
        [`${this.prefix}-status-success`]: parseInt((percentage as number).toString(), 10) >= 100,
    })
    
    let progressNode
    let sty: any = {}

    if (type === 'line') {
      const lineStyle: any = {
        width: `${percentage}%`,
        height: `${strokeWidth}px`,
        lineHeight: `${strokeWidth}px`
      }
      const lineBarStyle: any = {}
      if (percentage !== 100) {
        if (color) {
          lineStyle.backgroundColor = color
        }
        if (trailColor) {
          lineBarStyle.backgroundColor = trailColor
        }
      }
      progressNode = (
        <div className={`${this.prefix}-line-wrapper`}>
          <div className={`${this.prefix}-line-bar`} style={lineBarStyle}>
            <div className={`${this.prefix}-line-progress`} style={lineStyle}>{textInside ? this.getText() : null}</div>
          </div>
        </div>
      )
    } else if (type === 'circle' || type === 'dashboard') {
      const { pathString, trailPathStyle, strokePathStyle } = this.getPathStyles()
      const circleSize = width || 120
      sty.width = circleSize
      sty.height = circleSize
      // textFontSize = circleSize * 0.15 + 6
      progressNode = (
        <svg viewBox="0 0 100 100">
          <path d={pathString} stroke={trailColor} strokeWidth={strokeWidth} fillOpacity="0" style={trailPathStyle} />
          <path d={pathString} strokeLinecap="round" stroke={this.stroke()} strokeWidth={this.props.percentage === 0 ? 0 : strokeWidth} fillOpacity="0" style={strokePathStyle} />
        </svg>
      )
    }
    
    return (
      <View config={{...viewProps, prefix: this.prefix, cls, sty}}>{progressNode}{!textInside ? this.getText() : null}</View>
    )
  }
}
