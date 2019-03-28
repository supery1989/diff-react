import * as React from "react"
import Menu from 'components/menu'
import { MENU_LISTS_TOTAL, COMPLETE_MENU_TOTAL } from './Menu'

export default class Header extends React.Component {
  render() {
    return (
      <div className='app-header-wrapper'>
        <div className='app-header-logo'>React Ui</div>
        <div className='app-header-summary'>
          <div>{COMPLETE_MENU_TOTAL} / {MENU_LISTS_TOTAL}</div>
        </div>
        <Menu className='app-header-menu' direction='h'>
          <Menu.Item index='1'>首页</Menu.Item>
          <Menu.Item index='2'>指南</Menu.Item>
          <Menu.Item index='3'>组件</Menu.Item>
        </Menu>
      </div>
    )
  }
}