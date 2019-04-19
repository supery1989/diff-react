
import * as React from 'react'
import classnames from 'classnames'
import View from 'libs/view'
import Icon from 'components/icon'

export type CustomType = React.ReactElement<any>;

export interface LoadingProps {
  className?: string,
  style?: object,
  full?: boolean,
  loading?: boolean,
  text?: string,
  size?: 'small' | 'large' | 'default',
  custom?: CustomType
}

export default class Loading extends React.Component<LoadingProps> {
  private prefix = 'diff-loading'
  static defaultProps = {
    loading: true,
    size: 'default'
  }

  getDocumentBody = () => {
    return document.body;
  }

  disableScroll = () => {
    const body = this.getDocumentBody();
    if (body) {
      body.style.setProperty('overflow', 'hidden')
    }
  }

  enableScroll = () => {
    const body = this.getDocumentBody();
    if (body) {
      body.style.removeProperty('overflow')
    }
  }

  render() {
    const { loading, full, text, size, children, custom, ...rest } = this.props
    let cls;
    let _size;
    if (full) {
      this.disableScroll()
      cls = `${this.prefix}-full`
      _size = 'large'
    } else {
      this.enableScroll()
      _size = size
    }
    const maskCls = classnames(`${this.prefix}-mask`, {
      [`${this.prefix}-${_size}`]: !!_size
    })
    let iconComp;
    if (custom) {
      if (React.isValidElement(custom)) {
        iconComp = React.cloneElement((custom as CustomType), {
          className: classnames((custom as CustomType).props.className, `${this.prefix}-icon`)
        })
      }
    } else {
      iconComp = <Icon type="loading" className={`${this.prefix}-icon`} spin />
    }
    return (
      <View config = {{ ...rest, prefix: this.prefix, cls }}>
        {(loading || full) && (
          <div className={maskCls}>
            {iconComp}
            {text && <div className={`${this.prefix}-text`}>{text}</div>}
          </div>
        )}
        {!full && children}
      </View>
    )
  }
}
