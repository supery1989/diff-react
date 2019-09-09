import * as React from 'react'
import classnames from 'classnames'
import View from '../../libs/view'
import Transition from '../transition'
import Icon from '../icon'
import Base from './Base'

export type CustomType = React.ReactElement<any>;

export default class Canvas extends Base {

  render() {
    const { prefix, message, title, type, custom, btn } = this.props
    const { viewProps, iconComp, cls } = this.clacPorps()
    const contentCls = classnames(`${prefix}-content`, {
      [`${prefix}-has-icon`]: !!type || !!custom
    })

    let btnComp = null;
    if (btn) {
      if (React.isValidElement(btn)) {
        btnComp = React.cloneElement((btn as CustomType), {
          className: classnames((btn as CustomType).props.className, `${prefix}-btn`)
        })
      }
    }

    return (
      <Transition type="fade" show={this.state.show} unmount init onEnd={this.afterLeave.bind(this)}>
        <View config = {{ ...viewProps, prefix, cls }} onMouseEnter={this.stopTimer} onMouseLeave={this.startTimer}>
          {iconComp}
          <div className={contentCls}>
            <h2 className={`${prefix}-title`}>{title}</h2>
            <div className={`${prefix}-message`}>{message}</div>
            {btnComp}
            <Icon type='close' className={`${prefix}-close`} onClick={this.onClose} />
          </div>
        </View>
      </Transition>
    )
  }
}
