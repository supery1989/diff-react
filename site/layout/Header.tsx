import * as React from "react"
import Menu from 'components/menu'
import Select from 'components/select'
import MENU_LISTS from './Menu'

export default class Header extends React.Component {
  handleToLink(key: string) {
    (this.refs.filterSelect as any).clear()
    location.href = `/#/components/${key}`
  }

  render() {
    return (
      <div className='app-header-wrapper'>
        <div className='app-header-logo'>React Ui</div>
        <Select placeholder='查找组件' showArrow={false} ref='filterSelect' filter line={6} className='app-header-search' onChange={this.handleToLink.bind(this)}>
          {MENU_LISTS.map((list: any, key: number) => {
            return (list.lists.map((menu: any, index: number) => {
              return (
                <Select.Option key={`${key}-${index}`} value={menu.key}>
                  <span style={{float: 'left'}}>{menu.name.split(' ')[0]}</span>
                  <span style={{float: 'right'}}>{menu.name.split(' ')[1]}</span>
                </Select.Option>
              )
            }))
          })}
        </Select>
        <Menu className='app-header-menu' direction='h'>
          <Menu.Item index='1'>首页</Menu.Item>
          <Menu.Item index='2'>快速上手</Menu.Item>
          <Menu.Item index='3'>组件</Menu.Item>
        </Menu>
      </div>
    )
  }
}