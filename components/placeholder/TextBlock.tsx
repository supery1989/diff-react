import * as React from 'react'
import omit from 'omit.js'
import View from 'libs/view'
import { Prefix, Default_Props, DEFAULT_SEGMENTS } from './consts'
import Text from './Text'
import TextDashed from './TextDashed'

export interface TextBlockProps {
  className?: string
  style?: object
  rows: number
  dashed: boolean
  spacing: string | number
  animate: boolean
  widths: Array<number>
  dashSegments: Array<number>
}

export default class TextBlock extends React.Component<TextBlockProps> {
  private prefix = Prefix
  static defaultProps = {
    animate: Default_Props.animate,
    spacing: Default_Props.spacing,
    dashed: Default_Props.dashed,
    widths: [97, 99, 98, 95, 97, 96, 95, 98, 94, 60],
    dashSegments: DEFAULT_SEGMENTS
  }

  getRowStyle(i: number) {
    const { widths } = this.props
    return { width: `${widths[i % widths.length]}%` }
  }

  getRows() {
    const { rows, dashed, spacing, animate, dashSegments } = this.props
    const result: any = []
    for (let i = 0; i < rows; i++) {
      const Comp = dashed ? TextDashed : Text
      const props: any = {
        style: this.getRowStyle(i),
        spacing,
        animate,
      }
      if (dashed) {
        props.segments = dashSegments[i % dashSegments.length]
      }
      result.push(<Comp key={i} {...props} />)
    }
    return result;
  }

  render() {
    const { ...rest } = this.props
    const viewProps = omit(rest, ['rows', 'dashed', 'spacing', 'animate', 'widths', 'dashSegments'])
    const cls = `${this.prefix}-text-block`
    return (
      <View config={{...viewProps, prefix: this.prefix, cls}}>{this.getRows()}</View>
    )
  }
}
