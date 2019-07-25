import * as React from 'react'
import Timeline from 'components/timeline'
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
      { time: '2019-07-11', message: 'cropline component 完成开发' },
      { time: '2019-07-15', message: 'affix component 完成开发' },
      { time: '2019-07-15', message: 'InfiniteScroll component 完成开发' },
      { time: '2019-07-17', message: 'imagepreview component 完成开发' },
      { time: '2019-07-18', message: 'timeline component 完成开发' },
      { time: '2019-07-19', message: 'drawer component 完成开发' },
      { time: '2019-07-22', message: 'list component 完成开发' },
      { time: '2019-07-23', message: 'sortable component, split component 完成开发' },
      { time: '2019-07-24', message: '更新日志完成'},
      { time: '2019-07-25', message: 'carousel component 完成开发'},
    ]
    return (
      <div className='lead-wrapper'>
        <h2 className='lead-title'>{this.title}</h2>
        <Timeline data={data.reverse()} />
      </div>
    )
  }
}
