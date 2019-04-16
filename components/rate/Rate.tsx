import * as React from 'react'
import classnames from 'classnames'
import omit from 'omit.js'
import Icon from 'components/icon'
import View, { ROOT_PREFIX } from 'libs/view'

export interface RateProps {
  className?: string
  style?: object
  character?: string | React.ReactNode
  total?: number
  value?: number
  tabIndex?: number
  changeColor?: boolean
  lowThreshold?: number
  highThreshold?: number
  allowHalf?: boolean
  colors?: any[]
  scoreText?: any[]
  allowClear?: boolean
  disabled?: boolean
  showScore?: boolean
  onFocus?: React.FocusEventHandler<HTMLElement>
  onBlur?: React.FocusEventHandler<HTMLElement>
  onKeyDown?: React.MouseEventHandler<HTMLAnchorElement>
  onHoverChange?: (value?: null | number) => void
  onChange?: (value?: null | number) => void
}

export default class Rate extends React.Component<RateProps> {
  private prefix = `${ROOT_PREFIX}-rate`
  static defaultProps = {
    total: 5,
    value: 0,
    tabIndex: 0,
    changeColor: true,
    lowThreshold: 2,
    highThreshold: 4,
    colors: ['#99A9BF', '#F8DC09', '#FAAD14'],
  }
  state: any

  constructor(props: RateProps) {
    super(props)

    this.state = {
        focused: false,
        clearValue: null,
        hoverValue: null,
        value: this.props.value,
        color: ''
    }
  }

  componentDidMount() {
    this.handleChange(this.state.value)
  }

  componentWillReceiveProps(nextProps: any) {
    this.setState({ ...nextProps })
  }

  tempArr() {
    const arr = []
    const { total } = this.props
    for (let i = 0; i < (total as number); i++) {
      arr.push(i)
    }
    return arr
  }

  handleFocus(e: React.FocusEvent<HTMLElement>) {
    const { onFocus, disabled } = this.props
    if (disabled) {
      return
    }
    this.setState({
      focused: true,
    })
    if (onFocus) {
      onFocus(e)
    }
  }

  handleBlur(e: React.FocusEvent<HTMLElement>) {
    const { onBlur, disabled } = this.props
    if (disabled) {
      return
    }
    this.setState({
      focused: false,
    })
    if (onBlur) {
      onBlur(e)
    }
  }

  handleMouseLeave() {
    const { onHoverChange, disabled } = this.props
    if (disabled) {
      return
    }
    this.setState({
      hoverValue: null,
      clearValue: null
    })
    if (onHoverChange) {
      onHoverChange(null)
    }
    this.handleChange(this.state.value)
  }

  handleKeyDown(e: any) {
    const { keyCode } = e
    const { total, allowHalf, onChange, onKeyDown, disabled } = this.props
    const { value } = this.state
    if (disabled) {
      return
    }
    if (keyCode === 39 && (value as number) < (total as number)) {
      if (allowHalf) {
        this.setState({
          value: (value as number) + 0.5
        })
      } else {
        this.setState({
          value: (value as number) += 1
        })
      }
      if (onChange) {
          onChange(value);
      }
      this.handleChange(value)
      e.preventDefault()
    } else if (keyCode === 37 && (value as number) > 0) {
      if (allowHalf) {
        this.setState({
          value: (value as number) - 0.5
        })
      } else {
        this.setState({
          value: (value as number) - 1
        })
      }
      if (onChange) {
        onChange(value)
      }
      this.handleChange(value)
      e.preventDefault()
    }
    if (onKeyDown) {
      onKeyDown(e)
    }
  }

  handleHover(k: number, e: React.MouseEvent<HTMLAnchorElement>) {
    const hoverValue = this.getStarValue(e, k)
    const { clearValue } = this.state
    const { onHoverChange } = this.props
    if (hoverValue !== clearValue) {
      this.setState({
        hoverValue,
        clearValue: null,
      })
    }
    if (onHoverChange) {
      onHoverChange(hoverValue)
    }
    this.handleChange(hoverValue)
  }

  handleChange(value: any) {
    if (value === null || !this.props.changeColor) {
      return
    }
    const { lowThreshold = 2, highThreshold = 4, colors = ['#99A9BF', '#F8DC09', '#FAAD14'] } = this.props
    if (value <= lowThreshold) {
      this.setState({
        color: colors[0],
      })
    } else if (value >= highThreshold) {
      this.setState({
        color: colors[2],
      })
    } else {
      this.setState({
        color: colors[1],
      })
    }
  }

  handleClick(k: number, e: React.MouseEvent<HTMLAnchorElement>) {
    const { allowClear, onChange } = this.props
    const value = this.getStarValue(e, k)
    let isClear = false
    if (allowClear) {
      isClear = value === this.state.value
    }
    this.handleMouseLeave()
    const v = isClear ? 0 : value
    this.setState({
      value: v,
      clearValue: isClear ? value : null,
    }, () => {
      if (onChange) {
        onChange(v)
      }
      this.handleChange(v)
    })
  }

  getStarParent(e: any) {
    let target = e.target
    while ( target && target.tagName !== 'LI' ) {
      target = target.parentNode
    }
    return target
  }

  getStarValue(e: any, key: number) {
    let value = key
    const { allowHalf } = this.props
    const isLeft = (e.clientX - e.target.getBoundingClientRect().left) * 2 <= this.getStarParent(e).clientWidth
    if (allowHalf) {
      e.persist()
      value = isLeft ? key + 0.5 : key + 1
    } else {
      value = key + 1
    }
    return value
  }

  getStarNode(k: number) {
    const { character, allowHalf, disabled } = this.props
    const { focused, value, hoverValue, color } = this.state
    const index = k + 1
    const v = hoverValue === null ? value : hoverValue
    const basicCls = `${this.prefix}-star`
    let cls
    let iconTypeFirst = 'star-o'
    let iconTypeSecond = 'star-o'
    if (k === 0 && v === 0 && focused) {
      cls = classnames(basicCls, `${this.prefix}-star-focused`)
    } else if (allowHalf && (v as number) + 0.5 === index) {
      cls = classnames(basicCls, `${this.prefix}-star-half`, {
        [`${this.prefix}-star-focused`]: focused
      })
      iconTypeFirst = 'star'
    } else {
      cls = classnames(basicCls, {
        [`${this.prefix}-star-full`]: index <= (v as number),
        [`${this.prefix}-star-zero`]: index > (v as number),
        [`${this.prefix}-star-focused`]: index === v && focused
      })
    }
    const secondStyle: any = {}
    if (index <= (v as number)) {
      secondStyle.color = color
      iconTypeFirst = 'star'
      iconTypeSecond = 'star'
    }
    const starFirst = character || <Icon type={iconTypeFirst} style={{ fontSize: '20px' }} />
    const starSecond = character || <Icon type={iconTypeSecond} style={{ fontSize: '20px' }} />
    return (
      <li className={cls} key={k} onMouseMove={disabled ? null : this.handleHover.bind(this, k)} onClick={disabled ? null : this.handleClick.bind(this, k)}>
        <div className={`${this.prefix}-star-first`} style={{ color }}>{starFirst}</div>
        <div className={`${this.prefix}-star-second`} style={secondStyle}>{starSecond}</div>
      </li>
    )
  }

  getScoreText() {
    const { hoverValue, value } = this.state
    const { scoreText } = this.props
    if (scoreText) {
      let textArr: any
      if (typeof scoreText === 'boolean') {
        textArr = ['极差', '失望', '一般', '满意', '惊喜']
      } else {
        textArr = scoreText
      }
      if (hoverValue !== null) {
        return textArr[hoverValue - 1]
      }
      return textArr[value - 1]
    }
    if (hoverValue !== null) {
      return hoverValue
    }
    return value
  }

  render() {
    const { disabled, tabIndex, showScore, scoreText, ...rest } = this.props
    const viewProps = omit(rest, ['changeColor', 'lowThreshold', 'character', 'total', 'value', 'highThreshold', 'allowHalf', 'colors', 'allowClear', 'showScore', 'onFocus', 'onBlur', 'onKeyDown', 'onHoverChange', 'onChange'])
    const cls = classnames(`${this.prefix}`, {
      [`${this.prefix}-disabled`]: disabled
    })
    return (
      <View
        config={{...viewProps, prefix: this.prefix, cls, tabIndex: disabled ? -1 : tabIndex}}
        tag='ul'
        onFocus={this.handleFocus.bind(this)}
        onBlur={this.handleBlur.bind(this)}
        onMouseLeave={this.handleMouseLeave.bind(this)}
        onKeyDown={this.handleKeyDown.bind(this)}
      >
        {this.tempArr().map((v, k) => {
          return (
            this.getStarNode(k)
          )
        })}
        {(showScore || scoreText) && <li className={`${this.prefix}-star-score`} style={{ color: this.state.color }}>{this.getScoreText()}</li>}
      </View>
    )
  }
}
