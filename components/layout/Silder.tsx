
// TODO 侧边栏为0、响应式

import * as React from 'react'
import classnames from 'classnames'
import * as PropTypes from 'prop-types'
import uuid from 'uuid'
import omit from 'omit.js'
import View from 'libs/view'
import Icon from 'components/icon'

export interface SilderProps {
  className?: string,
  style?: object,
  collapsible?: boolean,
  collapsed?: boolean,
  width?: string,
  collapsedWidth?: string
  auto?: boolean,
  onCollapse?: (collapsed: boolean, type: CollapseType) => void
}

export type CollapseType = 'clickTrigger' | 'responsive'

class Silder extends React.Component<SilderProps> {
  public prefix = 'diff-layout-silder'
  private uid = uuid.v1();
  static contextTypes = {
    silderHook: PropTypes.object
  }
  static defaultProps = {
    collapsible: false,
    collapsed: false,
    width: '200px',
    collapsedWidth: '80px',
    style: {}
  }
  state: any
  constructor(props: SilderProps) {
    super(props)
    this.state = {
      collapsed: props.collapsed
    }
  }

  componentDidMount() {
    if (this.context.silderHook) {
      this.context.silderHook.addSilder(this.uid)
    }
  }

  componentWillMount() {
    if (this.context.removeSilder) {
      this.context.silderHook.removeSilder(this.uid)
    }
  }

  componentWillReceiveProps(nextProps: SilderProps) {
    if (this.props.collapsed !== nextProps.collapsed) {
      this.setState({
        collapsed: nextProps.collapsed
      })
    }
  }

  setCollapsed = (collapsed: boolean, type: CollapseType) => {
    this.setState({
      collapsed,
    })
    const { onCollapse } = this.props;
    if (onCollapse) {
      onCollapse(collapsed, type)
    }
  }

  toggle = () => {
    const collapsed = !this.state.collapsed 
    this.setCollapsed(collapsed, 'clickTrigger')
  }

  render() {
    const { collapsible, width, collapsedWidth, auto, children, ...rest } = this.props
    const { collapsed } = this.state;
    const cls = classnames({
      [`${this.prefix}-collapsed`]: collapsed,
      [`${this.prefix}-has-trigger`]: collapsible,
      [`${this.prefix}-auto`]: auto,
    })
    const w = collapsed ? collapsedWidth : width
    const sty = {
      flex: `0 0 ${w}`,
      maxWidth: w, // Fix width transition bug in IE11
      minWidth: w,
      width: w,
    }
    const viewProps = omit(rest, ['onCollapse', 'collapsed'])
    const iconType = collapsed ? 'right' : 'left'
    return (
      <View config={{...viewProps, prefix: this.prefix, cls, sty}}>
        <div className={`${this.prefix}-children`}>{children}</div>
        {collapsible && <div className={`${this.prefix}-trigger`} onClick={this.toggle}><Icon type={iconType} /></div>}
      </View>
    )
  }
}

export default Silder
