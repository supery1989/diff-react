import * as React from 'react'
import { ROOT_PREFIX } from 'libs/view'
import './style.scss'

export interface TempProps {
  className?: string
  style?: object
}

export default class Temp extends React.Component<TempProps> {
  // private prefix = `${ROOT_PREFIX}-lead-temp`
  title = '模板'

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
