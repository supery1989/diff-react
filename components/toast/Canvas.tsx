import * as React from 'react'
import View from 'libs/view'
import Transition from 'components/transition'
import Icon from 'components/icon'
import Base from '../notification/Base'

export type CustomType = React.ReactElement<any>;

export default class Canvas extends Base {

  render() {
    const { prefix, message, showClose } = this.props
    const { viewProps, iconComp, cls } = this.clacPorps()

    return (
      <Transition type="fade" show={this.state.show} unmount init onEnd={this.afterLeave.bind(this)}>
        <View config = {{ ...viewProps, prefix, cls }} onMouseEnter={this.stopTimer} onMouseLeave={this.startTimer}>
          <div className={`${prefix}-content`}>
            {iconComp}
            <span className={`${prefix}-message`}>{message}</span>
            {showClose && <Icon type='close' className={`${prefix}-close`} onClick={this.onClose} />}
          </div>
        </View>
      </Transition>
    )
  }
}
