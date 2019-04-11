import * as React from 'react'
import { Link } from "react-router-dom"
import uuid from 'uuid'
import Button from 'components/button'
import BlockHeader from 'components/block-header'
import MENU_LISTS, { COMPLETE_MENU_TOTAL } from '../../layout/Menu'
import './style.scss'

export interface OverviewProps {
  className?: string
  style?: object
}

export default class Overview extends React.Component<OverviewProps> {
  title = '概览 组件'

  render() {
    document.title = this.title
    return (
      <div className='overview'>
        <h2 className='overview-title'>{this.title}</h2>
        <h4 className='overview-count'>该UI框架收录组件计 <span className='overview-total'>{COMPLETE_MENU_TOTAL}</span> 个</h4>
        {MENU_LISTS.map((list: any) => {
          return (
            <div key={uuid.v1()}>
              <BlockHeader title={list.type} className='overview-subTitle' showBackground={false} />
              {list.lists.map((menu: any) => {
                return (
                  <Button className='overview-button' key={uuid.v1()} type='primary'><Link to={`/components/${menu.key}`}>{menu.name}</Link></Button>
                )
              })}
            </div>
          )
        })}
      </div>
    )
  }
}
