import * as React from 'react'
import classnames from 'classnames'
import View from 'libs/view'
import { Prefix, Default_Props, DEFAULT_SEGMENTS } from './consts'

export interface TextDashedProps {
  className?: string
  style?: object
  spacing: string | number
  animate: boolean
  segments?: Array<any>
}

export default class TextDashed extends React.Component<TextDashedProps> {
  private prefix = Prefix
  static defaultProps = {
    animate: Default_Props.animate,
    spacing: Default_Props.spacing
  }

  render() {
    const { spacing, animate, segments, ...rest } = this.props
    const sty = {
      marginTop: spacing
    }
    const cls = `${this.prefix}-text-row-dashed`
    const cls2 = classnames(`${this.prefix}-shape`, {
      [`${this.prefix}-shape-animate`]: !!animate
    })
    let rawSegments: any;
    if (Object.prototype.toString.call(segments)== '[object Array]') {
      rawSegments = segments
    } else {
      const index = Math.floor(Math.random()*10)
      rawSegments = DEFAULT_SEGMENTS[index]
    }
    return (
      <View config={{...rest, prefix: this.prefix, cls, sty}}>
        {rawSegments.map((item: any, index: number) => {
          return (
            <div
              key={index}
              className={`${this.prefix}-text-row-dashed-seg`}
              style={{ width: `${item}%`, paddingLeft: index === 0 ? 0 : '0.3em' }}
            >
              <div className={cls2} />
            </div>
          )
        })}
      </View>
    )
  }
}
