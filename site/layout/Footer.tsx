import * as React from "react"
import Breadcrumb from 'components/breadcrumb'
import Copyright from 'components/copyright'

export default class Footer extends React.Component {
  render() {
    return (
      <div className='app-footer-wrapper'>
        <Copyright author='Diff React Ui' className='app-footer-copyright' />
        <Breadcrumb separator='|' className='app-footer-nav'>
          <Breadcrumb.Item href='javascript:;'>Github</Breadcrumb.Item>
          <Breadcrumb.Item href='javascript:;'>快速上手</Breadcrumb.Item>
          <Breadcrumb.Item href='javascript:;'>意见反馈</Breadcrumb.Item>
        </Breadcrumb>
      </div>
    )
  }
}
