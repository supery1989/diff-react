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
      { time: '2019-07-11', message: 'cropline component completed' },
      { time: '2019-07-15', message: 'affix component completed' },
      { time: '2019-07-15', message: 'InfiniteScroll component completed' },
      { time: '2019-07-17', message: 'imagepreview component completed' },
      { time: '2019-07-18', message: 'timeline component completed' },
      { time: '2019-07-19', message: 'drawer component completed' },
      { time: '2019-07-22', message: 'list component completed' },
      { time: '2019-07-23', message: 'sortable component, split component completed' },
      { time: '2019-07-24', message: '更新日志完成'},
      { time: '2019-07-25', message: 'carousel component completed'},
      { time: '2019-07-26', message: 'collapse component completed'},
      { tiem: '2019-07-29', message: 'slider component completed'},
      { tiem: '2019-07-31', message: 'upload component completed'},
      { item: '2019-08-05', message: 'form component completed' },
      { item: '2019-08-06', message: 'field component completed' },
    ]
    return (
      <div className='lead-wrapper'>
        <h2 className='lead-title'>{this.title}</h2>
        <Timeline data={data.reverse()} />
      </div>
    )
  }
}
