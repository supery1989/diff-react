import * as React from 'react'
import omit from 'omit.js'
import View, { ROOT_PREFIX } from 'libs/view'

export interface CollapseProps {
  className?: string
  style?: object
  onChange?: (activeItems: any) => void
  value: any
  single?: boolean
}

export default class Collapse extends React.Component<CollapseProps> {
  private prefix = `${ROOT_PREFIX}-collapse`
  static Item: any
  static defaultProps = {
    value: []
  }
  state: any

  constructor(props: CollapseProps) {
    super(props)

    this.state = {
      activeItems: [].concat(props.value)
    }
  }

  componentWillReceiveProps(nextProps: CollapseProps) {
    if (this.props.value !== nextProps.value) {
      this.setActiveItems(nextProps.value)
    }
  }

  setActiveItems(activeItems: any) {
    const { onChange } = this.props
    activeItems = [].concat(activeItems)
    this.setState({
      activeItems
    }, () => {
      onChange && onChange(activeItems)
    })
  }

  handleItemClick(name: any) {
    const { activeItems } = this.state
    const { single } = this.props
    if (single) {
      this.setActiveItems(activeItems[0] && activeItems[0] === name ? '' : name)
    } else {
      if (activeItems.includes(name)) {
        this.setActiveItems(activeItems.filter((item: number) => item !== name))
      } else {
        this.setActiveItems(activeItems.concat(name))
      }
    }
  }

  renderChild() {
    const { children } = this.props
    return React.Children.map(children, (element: any, index: number) => {
      if (!element) return
      return React.cloneElement(element, {
        active: this.state.activeItems.includes(index),
        key: index,
        name: index,
        onClick: index => this.handleItemClick(index)
      })
    })
  }

  render() {
    const { ...rest } = this.props
    const viewProps = omit(rest, ['single'])
    return (
      <View config={{...viewProps, prefix: this.prefix}}>{this.renderChild()}</View>
    )
  }
}
