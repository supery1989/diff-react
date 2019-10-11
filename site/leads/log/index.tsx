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
      { time: '2019-09-25', title: '1.0.3版本正式发布', message: (<div>1、Select:state变化，值为value时input清空<br />2、Menu:垂直模式所选值变化，当前所选栏目高亮fix<br />3、package增加react-router支持<br />4、Button:修复state改变disabled时的失效问题<br />5、Tag:checkbox状态时checked属性不灵敏时的修复</div>) },
      { tiem: '2019-10-11', title: '1.0.4版本正式发布', message: (<div>1、Button:link类型删除内边距<br />2、Page:(1)增加pageSize设置;(2)onChange被渲染2次fix;(3)pageSizes改变时,pageNumber重置为1<br />3、Radio:子元素为非radio时，buttonStyle等属性不识别fix<br />4、Field:(1)增加密码框类型;(2)增加显示输入提示的信息提示属性info</div>)}
    ]
    return (
      <div className={`${ROOT_PREFIX}-lead-wrapper`}>
        <h2 className={`${ROOT_PREFIX}-lead-title`}>{this.title}</h2>
        <Timeline data={data.reverse()} />
      </div>
    )
  }
}
