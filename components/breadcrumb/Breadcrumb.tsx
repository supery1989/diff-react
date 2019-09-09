import * as React from "react"
import omit from 'omit.js'
import View, { ROOT_PREFIX } from "../../libs/view"
import BreadcrumbItem from './BreadcrumbItem'

export interface Route {
  name: string
  link?: string
  target?: string
}

export interface BreadcrumbProps {
  className?: string
  style?: object
  separator?: string | React.ReactNode
  icon?: string
  routes?: Route[],
  isRr?: boolean,
}

export default class Breadcrumb extends React.Component<BreadcrumbProps> {
  private prefix = `${ROOT_PREFIX}-breadcrumb`
  static Item: any

  renderChild(children: any) {
    return React.Children.map(children, (element: any, index: number) => {
      if (!element) {
        return
      }
      return React.cloneElement(element, Object.assign({}, element.props, {
        key: index,
        separator: this.props.separator
      }))
    })
  }

  renderRoutes(routes: Route[]) {
    return routes.map((i: any, key: number) => {
      const rest = omit(i, ['name'])
      return (
        <BreadcrumbItem key={key} { ...this.props} { ...rest }>{i.name}</BreadcrumbItem>
      )
    })
  }

  render() {
    const { routes, children, ...rest } = this.props
    const viewProps = omit(rest, ['separator', 'icon', 'isRr'])
    let comp: any
    if (routes && routes.length > 0) {
      comp = this.renderRoutes(routes)
    } else if (children) {
      comp = this.renderChild(children)
    }
    return (
      <View config={{ ...viewProps, prefix: this.prefix }}>
        {comp}
      </View>
    )
  }
}
