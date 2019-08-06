import * as React from 'react'
import Timeline from 'components/timeline'
import { ROOT_PREFIX } from 'libs/view'
import './style.scss'

export interface LogProps {
  className?: string
  style?: object
}

export default class Log extends React.Component<LogProps> {
  // private prefix = `${ROOT_PREFIX}-lead-log`
  title = '更新日志'

  render() {
    document.title = this.title
    const data = [
      { time: '2019-04-02', message: 'editor component completed' },
      { time: '2019-04-04', message: 'transtion component completed' },
      { time: '2019-04-09', message: 'avatar component, error component completed' },
      { time: '2019-04-11', message: 'overview component, yearpicker component, monthpicker component, datepicker component completed' },
      { time: '2019-04-15', message: 'tabs component completed' },
      { time: '2019-04-16', message: 'rate component completed' },
      { time: '2019-04-28', message: 'datetimepicker component completed' },
      { time: '2019-06-11', message: 'popconfirm component completed' },
      { time: '2019-07-11', message: 'cropline component completed' },
      { time: '2019-07-15', message: 'affix component completed' },
      { time: '2019-07-15', message: 'InfiniteScroll component completed' },
      { time: '2019-07-17', message: 'imagepreview component completed' },
      { time: '2019-07-18', message: 'timeline component completed' },
      { time: '2019-07-19', message: 'drawer component completed' },
      { time: '2019-07-22', message: 'list component completed' },
      { time: '2019-07-23', message: 'sortable component, split component completed' },
      { time: '2019-07-24', message: 'log lead completed'},
      { time: '2019-07-25', message: 'carousel component completed'},
      { time: '2019-07-26', message: 'collapse component completed'},
      { time: '2019-07-29', message: 'slider component completed'},
      { time: '2019-07-31', message: 'upload component completed'},
      { time: '2019-08-05', message: 'form component completed' },
      { time: '2019-08-06', message: 'field component completed' },
      { time: '2019-08-07', message: 'colors lead completed' },
    ]
    return (
      <div className={`${ROOT_PREFIX}-lead-wrapper`}>
        <h2 className={`${ROOT_PREFIX}-lead-title`}>{this.title}</h2>
        <Timeline data={data.reverse()} />
      </div>
    )
  }
}
