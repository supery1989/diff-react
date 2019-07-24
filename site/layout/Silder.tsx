import * as React from "react"
import { Link } from "react-router-dom"
import uuid from 'uuid'
import MENU_LISTS from './Menu'
import LEAD_LISTS from './Lead'
import Menu from 'components/menu'


class Silder extends React.Component {
  render() {
    return (
      <div className='app-slider-wrapper'>
        <Menu expandKeys={['group01', 'group02', '0', '1', '2', '3', '4', '5', '6', '7']} className='site-menu'>
          <Menu.SubMenu index='group01' title='开发指南'>
            {LEAD_LISTS.map((list: any, key: number) => {
              return (
                <Menu.SubMenu key={uuid.v1()} index={String(key)} title={`${list.type}`}>
                  {list.lists.map((menu: any) => {
                    return (
                      <Menu.Item key={uuid.v1()}><Link className={menu.badge ? 'undone' : ''} to={`/components/${menu.key}`}>{menu.name}</Link></Menu.Item>
                    )
                  })}
                </Menu.SubMenu>
              )
            })}
          </Menu.SubMenu>
          <Menu.SubMenu index='group02' title='组件'>
            {MENU_LISTS.map((list: any, key: number) => {
              return (
                <Menu.SubMenu key={uuid.v1()} index={String(key)} title={`${list.type} (${list.complete}/${list.total})`}>
                  {list.lists.map((menu: any) => {
                    return (
                      <Menu.Item key={uuid.v1()}><Link className={menu.badge ? 'undone' : ''} to={`/components/${menu.key}`}>{menu.name}</Link></Menu.Item>
                    )
                  })}
                </Menu.SubMenu>
              )
            })}
          </Menu.SubMenu>
        </Menu>
      </div>
    );
  }
}
export default Silder;
