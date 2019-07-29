import * as React from 'react'
import classnames from 'classnames'
import AnimateHeight from 'react-animate-height'
import View, { ROOT_PREFIX } from 'libs/view'
import Icon from 'components/icon'

export interface CollapseItemProps {
  className?: string
  style?: object
  title?: string | React.ReactNode
  active?: boolean
  name: number
  onClick?: (name: number) => void
}

export default class CollapseItem extends React.Component<CollapseItemProps> {
  private prefix = `${ROOT_PREFIX}-collapse-item`
  static Item: any

  render() {
    const { active, title, name, onClick,  children, ...rest } = this.props
    const cls = classnames({
      [`${this.prefix}-active`]: active
    })
    const icon = active ? 'down' : 'right'
    return (
      <View config={{...rest, prefix: this.prefix, cls}}>
        <div className={`${this.prefix}-header`} onClick={() => onClick && onClick(name)}>
          <Icon type={icon} className={`${this.prefix}-icon`} />
          {title}
        </div>
        <AnimateHeight during={300} height={active ? 'auto' : 0}>
          <div className={`${this.prefix}-content`}>{children}</div>
        </AnimateHeight>
      </View>
    )
  }
}
