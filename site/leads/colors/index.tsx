import * as React from 'react'
import { ROOT_PREFIX } from 'libs/view'
import './style.scss'

export interface ColorsProps {
  className?: string
  style?: object
}

export default class Colors extends React.Component<ColorsProps> {
  // private prefix = `${ROOT_PREFIX}-lead-colors`
  title = '色彩'

  render() {
    document.title = this.title
    return (
      <div className={`${ROOT_PREFIX}-lead-wrapper`}>
        <h2 className={`${ROOT_PREFIX}-lead-title`}>{this.title}</h2>
        开发中...
      </div>
    )
  }
}
