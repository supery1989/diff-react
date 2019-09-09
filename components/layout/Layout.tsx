
import * as React from 'react'
import classnames from 'classnames'
import * as PropTypes from 'prop-types'
import View, { ROOT_PREFIX } from '../../libs/view'

export interface LayoutProps {
  className?: string,
  style?: object,
}

class Layout extends React.Component<LayoutProps> {
  static Header: any
  static Footer: any
  static Content: any
  static Silder: any
  static childContextTypes = {
    silderHook: PropTypes.object,
    removeSilder: PropTypes.object
  }
  public prefix = `${ROOT_PREFIX}-layout`
  state = { silders: [] }
  constructor(props: LayoutProps) {
    super(props);
  }

  getChildContext() {
    return {
      silderHook: {
        addSilder: (id: string) => {
          this.setState((state: any) => ({
            silders: [...state.silders, id]
          }))
        },
        removeSilder: (id: string) => {
          this.setState((state: any) => ({
            silders: state.silders.filter((curId: string) => curId !== id)
          }))
        }
      }
    }
  }

  render() {
    const { children, ...rest } = this.props
    const cls = classnames({
      [`${this.prefix}-has-silder`]: this.state.silders.length > 0
    })
    return (
      <View config={{...rest, prefix: this.prefix, cls}}>{children}</View>
    )
  }
}

export default Layout
