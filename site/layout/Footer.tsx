import * as React from "react"
import { Link } from "react-router-dom"
import classnames from 'classnames'
import { ROOT_PREFIX } from 'libs/view'
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
          <Breadcrumb.Item  href='http://super-y.gitee.io/diff-react/#/' target='_blank'>首页</Breadcrumb.Item>
          <Breadcrumb.Item  href='https://gitee.com/super-y/diff-react' target='_blank'>码云</Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link
              className={classnames(`${ROOT_PREFIX}-breadcrumb-item-item`, `${ROOT_PREFIX}-breadcrumb-item-link`)}
              to={`/components`}
            >
              概览
            </Link>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
    )
  }
}
