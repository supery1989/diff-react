import * as React from 'react'
// import classnames from 'classnames'
// import omit from 'omit.js'
import { Link } from "react-router-dom"
import uuid from 'uuid'
import Button from 'components/button'
import BlockHeader from 'components/block-header'
import MENU_LISTS from '../../layout/Menu'
import './style.scss'

export interface HomeProps {
  className?: string
  style?: object
}

export default class Home extends React.Component<HomeProps> {

  render() {
    return (
      <div className='overview'>
        <h2 className='overview-title'>概览 组件</h2>
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
