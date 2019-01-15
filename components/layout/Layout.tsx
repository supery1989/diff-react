
import * as React from 'react'
import classnames from 'classnames'
import * as PropTypes from 'prop-types'

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
  public prefix = 'diff-layout'
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
    const { className, style, children } = this.props
    const cls = classnames(this.prefix, className, {
      [`${this.prefix}-has-silder`]: this.state.silders.length > 0
    })
    return (
      <div className={cls} style={style}>{children}</div>
    )
  }
}

export default Layout
