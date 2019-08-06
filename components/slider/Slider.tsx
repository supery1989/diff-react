import * as React from 'react'
import * as ReactDOM from 'react-dom'
import classnames from 'classnames'
import omit from 'omit.js'
import View, { ROOT_PREFIX } from 'libs/view'
import WindowEventHandler from 'libs/windowEventHandler/index'
import Tooltip from 'components/tooltip'

export interface SliderProps {
  className?: string
  style?: object
  min: number
  max: number
  value?: number | Array<number>
  mode: 'v' | 'h'
  progress: boolean | string
  disabled?: boolean
  step: number
  onChange: (value: any) => void
  marks?: boolean | object
  renderMarks?: (value: number) => void
  tooltip: boolean
  dots?: boolean
}

export default class Slider extends React.Component<SliderProps> {
  private prefix = `${ROOT_PREFIX}-slider`
  static defaultProps = {
    min: 0,
    max: 100,
    mode: 'h',
    value: 0,
    progress: true,
    step: 1,
    tooltip: true
  }
  state: any
  indexBar: number
  move: boolean
  startX: number
  bar: any
  slider: any
  barWidth: number
  barOffsetLeft: number
  value: any
  initValue: any

  constructor(props: SliderProps) {
    super(props)
    this.initValue = props.value
    this.state = {
      value: (Array.isArray(props.value) ? props.value : [props.value]),
    }
  }

  reset() {
    this.setState({
      value: (Array.isArray(this.initValue) ? this.initValue : [this.initValue])
    }, () => {
      this.handleChange()
    })
  }

  onHandleDown(index: number, e: any) {
    const { disabled, mode } = this.props
    if (disabled) return
    this.indexBar = index
    this.move = true
    this.startX = e[mode === 'h' ? 'clientX' : 'clientY']
    this.barWidth = this.bar[mode === 'h' ? 'clientWidth' : 'clientHeight']
    this.barOffsetLeft = this.bar[mode === 'h' ? 'offsetLeft' : 'offsetTop']
    const { value } = this.state
    if (Array.isArray(this.props.value)) {
      this.barWidth = (this.indexBar === 1 && value[1] > value[0]) || (this.indexBar !== 0 && value[0] > value[1])
        ? this.barWidth + this.barOffsetLeft
        : this.barOffsetLeft
    }
  }

  onDragging(e: any) {
    if (!this.move) return
    const { mode } = this.props
    const val = this.state.value
    const value = this.getWidthToValue(e[mode === 'h' ? 'clientX' : 'clientY'] - this.startX + this.barWidth)
    if (value !== this.value) {
      val[this.indexBar] = value
      const barSty = this.getBarSty(val)
      if (this.bar) {
        this.bar.style[mode === 'h' ? 'left' : 'top'] = barSty.left
        this.bar.style[mode === 'h' ? 'right' : 'bottom'] = barSty.right
      }
      this.onChange(val)
      this.value = value
    }
  }

  onDragEnd(e: any) {
    this.move = false
  }

  onChange(value: any) {
    value = this.getRangeValue(value)
    this.setState({ value }, this.handleChange.bind(this))
  }

  handleChange() {
    const { onChange } = this.props
    const { value } = this.state
    onChange && onChange(value.length === 1 ? value[0] : value)
  }

  getWidthToValue(width: number) {
    const { step, min, max, mode } = this.props
    const equal = (max - min) / step
    let percent = 0
    const sliderNode = ReactDOM.findDOMNode(this.slider)
    if (sliderNode) {
      percent = width / sliderNode[mode === 'h' ? 'clientWidth' : 'clientHeight'] * 100
    }
    if (percent <= 0) {
      percent = 0
    }
    if (percent >= 100) {
      percent = 100
    }
    const num = equal * (percent / 100) + 0.5
    const numFloor = Math.floor(num)
    return numFloor * step + min
  }

  getLabelValue(value: number) {
    const { marks, renderMarks } = this.props
    if (marks && marks !== true && marks[value] && marks[value].label) {
      return marks[value].label
    } else if (marks && marks !== true && marks[value] && typeof marks[value] === 'string') {
      return marks[value]
    } else if (renderMarks && typeof renderMarks === 'function' && renderMarks(value)) {
      return renderMarks(value)
    }
    return value
  }

  onClickMark(e: any) {
    const { mode, disabled } = this.props
    if (disabled) return
    if (this.move) {
      return
    }
    const markOffset = (ReactDOM.findDOMNode(this.slider) as HTMLElement).getBoundingClientRect()
    const value = this.getWidthToValue(e[mode === 'v' ? 'clientY' : 'clientX'] - markOffset[mode === 'v' ? 'top' : 'left'])
    this.onChange(this.getRangeValue(value))
  }

  getRangeValue(val: number | number[]) {
    if (!Array.isArray(this.props.value)) {
      return Array.isArray(val) ? val : [val]
    }
    const { value } = this.state
    const val1 = value[0]
    const val2 = value[1]
    if ((val1 < val2 && val1 > val) || (val1 > val2 && val1 < val)) {
      value[0] = val as number
    }
    if ((val1 < val2 && val2 < val) || (val1 > val2 && val2 > val)) {
      value[1] = val as number
    }

    if (val1 > val && val2 < val) {
      const half = val2 + (val1 - val2) / 2
      if (half >= val) {
        value[1] = val as number
      }
      if (half < val) {
        value[0] = val as number
      }
    }
    if (val2 > val && val1 < val) {
      const half = val1 + (val2 - val1) / 2
      if (half >= val) {
        value[0] = val as number
      }
      if (half < val) {
        value[1] = val as number
      }
    }
    return value
  }

  getValueToPercent(value: number) {
    const { min, max } = this.props
    return ((value - min) * 100) / (max - min)
  }

  getBarSty(value?: any) {
    value = value || this.state.value
    const barSty = { left: '0%', right: '100%' }
    if (!Array.isArray(this.props.value)) {
      barSty.right = `${100 - this.getValueToPercent(value[0])}%`
    } else {
      const leftVal = value[0] > value[1] ? value[1] : value[0]
      const rightVal = value[0] > value[1] ? value[0] : value[1]
      barSty.left = `${this.getValueToPercent(leftVal)}%`
      barSty.right = `${100 - this.getValueToPercent(rightVal)}%`
    }
    return barSty
  }

  stepArray() {
    const { min, max, step } = this.props
    const equal = (max - min) / step
    const stepWidth = (100 * step) / (max - min)
    const result = [0]
    for (let i = 1; i < equal; i += 1) {
      result.push(i * stepWidth)
    }
    result.push(100)
    return result
  }

  renderTooltip(left: any, index: number, item: any) {
    const { tooltip, mode } = this.props
    const placement = mode === 'h' ? 'top' : 'left'
    if (tooltip) {
      return (
        <Tooltip content={this.getLabelValue(item)} key={index} wrapperClass={`${this.prefix}-handle`} wrapperStyle={{ [mode === 'h' ? 'left' : 'top' ]: `${left}%` }} placement={placement} style={{ marginTop: '-10px' }}>
          <div
            onMouseDown={this.onHandleDown.bind(this, index)}
            className={`${this.prefix}-handle-btn`}
          />
        </Tooltip>
      )
    }
    return (
      <div key={index} className={`${this.prefix}-handle`} style={{ [mode === 'h' ? 'left' : 'top' ]: `${left}%` }}>
        <div
          onMouseDown={this.onHandleDown.bind(this, index)}
          className={`${this.prefix}-handle-btn`}
        />
      </div>
    )
  }

  renderDots() {
    const { step, min, mode, marks } = this.props
    return (
      <div className={`${this.prefix}-dots`}>
        {this.stepArray().map((val: any, index: number) => {
          const stepVal = index * step + min
          const cls = classnames(`${this.prefix}-mark`, {
            [`${this.prefix}-mark-no-marks`]: marks && marks !== true && !marks[stepVal]
          })
          return (
            <div key={index} style={{ [mode === 'h' ? 'left' : 'top']: `${val}%`}} className={cls}>
              {marks === true && <div className={`${this.prefix}-mark-label`}>{this.getLabelValue(stepVal)}</div>}
              {marks !== true && marks && marks[stepVal] && (
                <div style={marks[stepVal].style} className={`${this.prefix}-mark-label`}>
                  {this.getLabelValue(stepVal) as number}
                </div>
              )}
            </div>
          )
        })}
      </div>
    )
  }

  render() {
    const { mode, progress, disabled, dots, ...rest } = this.props
    const viewProps = omit(rest, ['min', 'max', 'value', 'step', 'onChange', 'marks', 'renderMarks', 'tooltip'])
    const barSty = this.getBarSty()
    const cls = classnames({
      [`${this.prefix}-disabled`]: disabled,
      [`${this.prefix}-v`]: mode === 'v'
    })
    return (
      <View config={{...viewProps, prefix: this.prefix, cls}} ref={(node: any) => this.slider = node} onClick={this.onClickMark.bind(this)}>
        <div
          ref={(node: any) => this.bar = node}
          className={`${this.prefix}-bar`}
          style={{
            [mode === 'v' ? 'top' : 'left']: barSty.left,
            [mode === 'v' ? 'bottom' : 'right']: barSty.right,
            ...(progress !== true ? ({ backgroundColor: progress || 'initial' }) : {})
          }}
        />
        {this.state.value.map((item: number, index: number) => {
          const left = this.getValueToPercent(item)
          return this.renderTooltip(left, index, item)
        })}
        { dots && this.renderDots()}
        <WindowEventHandler name='mousemove' callback={this.onDragging.bind(this)} />
        <WindowEventHandler name='mouseup' callback={this.onDragEnd.bind(this)} />
      </View>
    )
  }
}
