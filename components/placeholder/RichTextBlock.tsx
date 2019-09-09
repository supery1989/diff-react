import * as React from 'react'
import View from '../../libs/view'
import { Prefix, Default_Props } from './consts'
import TextBlock from './TextBlock'
import Circle from './Circle'
import Rectangle from './Rectangle'

export interface RichTextBlockProps {
  className?: string
  style?: object
  rows: number
  dashed: boolean
  spacing: string | number
  animate: boolean
  widths: Array<number>
  dashSegments: Array<number>
  shape: 'circle' | 'rect'
  size: number
}

export default class RichTextBlock extends React.Component<RichTextBlockProps> {
  private prefix = Prefix
  static defaultProps = {
    animate: Default_Props.animate,
    spacing: Default_Props.spacing,
    dashed: Default_Props.dashed,
    shape: 'circle',
    size: 80
  }

  render() {
    const { rows, dashed, widths, dashSegments, spacing, animate, size, shape, ...rest } = this.props
    const shapeSty = {
      marginRight: 10
    }
    const cls = `${this.prefix}-richtext-block`
    return (
      <View config={{...rest, prefix: this.prefix, cls}}>
        {shape === 'circle' ? (
          <Circle style={shapeSty} diameter={size} animate={animate} />
        ) : (
          <Rectangle
            style={shapeSty}
            width={size}
            height={size}
            animate={animate}
          />
        )}
        <TextBlock
          rows={rows}
          animate={animate}
          dashed={dashed}
          widths={widths}
          dashSegments={dashSegments}
          spacing={spacing}
        />
      </View>
    )
  }
}
