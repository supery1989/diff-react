import * as React from 'react'
import { ROOT_PREFIX } from 'libs/view'
import './style.scss'

export interface ColorsProps {
  className?: string
  style?: object
}

export default class Colors extends React.Component<ColorsProps> {
  private prefix = `${ROOT_PREFIX}-lead-colors`
  title = '色彩'

  render() {
    document.title = this.title
    return (
      <div className={`${ROOT_PREFIX}-lead-wrapper`}>
        <h2 className={`${ROOT_PREFIX}-lead-title`}>{this.title}</h2>
        <h3>主要颜色</h3>
        <p>主色以象征永恒的蓝色为主色调，纯净的蓝色表现出一种美丽、文静、 理智、安祥与洁净。</p>
        <div className={`${this.prefix}-block`}>
          <div style={{ backgroundColor: '#1890ff', flex: 'unset' }} className={`${this.prefix}-color`}>#1890FF</div>
        </div>
        <h3>辅助颜色</h3>
        <div className={`${this.prefix}-block`}>
          <div style={{ backgroundColor: '#1890ff' }} className={`${this.prefix}-color`}>
            <div className={`${this.prefix}-tip`}>主要</div>
            <div>#1890FF</div>
          </div>
          <div style={{ backgroundColor: '#52c41a' }} className={`${this.prefix}-color`}>
            <div className={`${this.prefix}-tip`}>成功</div>
            <div>#52C41A</div>
          </div>
          <div style={{ backgroundColor: '#f5222d' }} className={`${this.prefix}-color`}>
            <div className={`${this.prefix}-tip`}>失败</div>
            <div>#F5222D</div>
          </div>
          <div style={{ backgroundColor: '#faad14' }} className={`${this.prefix}-color`}>
            <div>警示</div>
            <div>#FAAD14</div>
          </div>
          <div style={{ backgroundColor: '#bfcbd9' }} className={`${this.prefix}-color`}>
            <div className={`${this.prefix}-tip`}>灰显</div>
            <div>#BFCBD9</div>
          </div>
          <div style={{ backgroundColor: '#d8d4d4' }} className={`${this.prefix}-color`}>
            <div className={`${this.prefix}-tip`}>失效</div>
            <div>#D8D4D4</div>
          </div>
        </div>
        <h3>其他颜色</h3>
        <div className={`${this.prefix}-block2`}>
          <div style={{ backgroundColor: '#ffffff' }} className={`${this.prefix}-color`}>
            <div>背景</div>
            <div>#FFFFFF</div>
          </div>
          <div style={{ backgroundColor: '#fafafa' }} className={`${this.prefix}-color`}>
            <div className={`${this.prefix}-tip`}>灰显背景</div>
            <div>#FAFAFA</div>
          </div>
          <div style={{ backgroundColor: '#EFF2F7' }} className={`${this.prefix}-color`}>
            <div className={`${this.prefix}-tip`}>表格高亮行</div>
            <div>#EFF2F7</div>
          </div>
          <div style={{ backgroundColor: '#d9d9d9' }} className={`${this.prefix}-color`}>
            <div className={`${this.prefix}-tip`}>边框</div>
            <div>#D9D9D9</div>
          </div>
          <div style={{ backgroundColor: 'rgba(0,0,0,.6)' }} className={`${this.prefix}-color`}>
            <div className={`${this.prefix}-tip`}>蒙层</div>
            <div>rgba(0,0,0,.6)</div>
          </div>
          <div style={{ backgroundColor: '#333333', color: '#fff' }} className={`${this.prefix}-color`}>
            <div className={`${this.prefix}-tip`}>文本</div>
            <div>#333333</div>
          </div>
        </div>
      </div>
    )
  }
}
