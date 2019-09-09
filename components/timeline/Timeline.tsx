import * as React from 'react'
import View, { ROOT_PREFIX } from '../../libs/view'
import TimelineItem from './Item';

export interface TimelineProps {
  className?: string
  style?: object
  data?: Array<any>
  lineColor?: string
}

export default class Timeline extends React.Component<TimelineProps> {
  private prefix = `${ROOT_PREFIX}-timeline`
  static Item: any

  renderChild(children: any, data?: Array<any>) {
    if (data && data.length > 0) {
      return data.map((item: any, index: number) => {
        return <TimelineItem key={index} {...item} />
      })
    }
    return React.Children.map(children, (element: any) => {
      if (!element) {
        return
      }
      return React.cloneElement(element, {})
    })
  }

  render() {
    const { data, lineColor, children, ...rest } = this.props
    let sty: any = {}
    if (lineColor) {
      sty = {
        borderLeftColor: lineColor
      }
    }
    return (
      <View config={{...rest, prefix: this.prefix, sty}} tag='ul'>
        {this.renderChild(children, data)}
      </View>
    )
  }
}
