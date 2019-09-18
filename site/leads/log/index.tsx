import * as React from 'react'
import Timeline from 'components/timeline'
import { ROOT_PREFIX } from 'libs/view'
import './style.scss'

export interface LogProps {
  className?: string
  style?: object
}

export default class Log extends React.Component<LogProps> {
  title = '更新日志'

  render() {
    document.title = this.title
    const data = [
      { time: '2019-09-12', title: '1.0.1版本正式发布', message: '包含63个ui组件' },
      { time: '2019-09-18', title: '1.0.2版本正式发布', message: (<div>1、Moment增加对格林威治时间的支持<br />2、表单域通过state改变默认值<br />3、select和notification样式微调</div>) },
    ]
    return (
      <div className={`${ROOT_PREFIX}-lead-wrapper`}>
        <h2 className={`${ROOT_PREFIX}-lead-title`}>{this.title}</h2>
        <Timeline data={data.reverse()} />
      </div>
    )
  }
}
