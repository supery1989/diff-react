import * as React from 'react'
import * as ReactDOM from 'react-dom'
import marked from 'marked'
import { transform } from 'babel-standalone'

import Editor from '../editor'

export interface CanvasProps {
  children?: any,
  locale?: any,
  name?: any
}

export default class Canvas extends React.Component<CanvasProps, any> {
  playerId: any;
  document: any;
  description: any;
  source: any;
  state: any;
  whiteBg: any;
  constructor(props: CanvasProps) {
    super(props)

    this.document = this.props.children.match(/([^]*)\n?(```[^]+```)([^]*)\n?/)
    this.description = marked(this.document[1])
    this.source = this.document[2].match(/```(.*)\n?([^]+)```/)
    this.whiteBg = this.document[3].indexOf('white') > -1
    this.state = {
      showBlock: false,
      whiteBg: this.whiteBg
    }
  }

  componentDidMount() {
    this.renderSource(this.source[2])
  }

  // 用于components热更新
  componentDidUpdate() {
    this.renderSource(this.source[2])
  }

  blockControl() {
    this.setState({
      showBlock: !this.state.showBlock
    })
  }

  backgroundControl() {
    this.setState({
      whiteBg: !this.state.whiteBg
    })
  }

  renderSource(value: any) {
    import('../../components').then(Element => {
      // TODO 组件中通过箭头函数定义的函数无法热更新，因原型链中没有
      const args = ['context', 'React', 'ReactDOM']
      const argv = [this, React, ReactDOM]

      for (const key in Element) {
        args.push(key)
        argv.push(Element[key])
      }

      return {
        args,
        argv
      }
    }).then(({ args, argv }) => {
      const code = transform(`
        class Demo extends React.Component {
          ${value}
        }

        ReactDOM.render(<Demo {...context.props} />, document.getElementById('${this.playerId}'))
      `, {
        // 使用babel7无法通过stage使用箭头函数
        presets: ['es2015', 'react', 'stage-0']
      }).code
      args.push(code)
      new Function(...args).apply(null, argv)

      this.source[2] = value
    }).catch((err) => {
      throw err;
      // if (process.env.NODE_ENV !== 'production') {
      //   throw err;
      // }
    })
  }

  render() {
    const { showBlock, whiteBg } = this.state
    // 在constructor定义会导致第一个demo热更新异常
    this.playerId = `${parseInt(String(Math.random() * 1e9)).toString(36)}`
    return (
      <div className={`demo-block demo-box demo-${this.props.name}`}>
        {!whiteBg && (
          <div className='source-bg'>
            <svg width="100%" height="100%" preserveAspectRatio="none" style={{ display: 'block' }}>
              <pattern id="pattern" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
                <rect fill="rgba(0, 0, 0, 0.05)" x="0" width="8" height="8" y="0" />
                <rect fill="rgba(0, 0, 0, 0.05)" x="8" width="8" height="8" y="8" />
              </pattern>
              <rect fill="url(#pattern)" x="0" y="0" width="100%" height="100%" />
            </svg>
          </div>
        )}
        <div className="source" id={this.playerId} />
        {
          showBlock && (
            <div className="meta">
              {
                this.description && (
                  <div
                    ref="description"
                    className="description"
                    dangerouslySetInnerHTML={{ __html: this.description }}
                  />
                )
              }
              <Editor
                value={this.source[2]}
                onChange={(code: any) => this.renderSource(code)}
              />
            </div>
          )
        }
        <div className="demo-block-control">
          <div className='demo-control-btn' onClick={this.backgroundControl.bind(this)}>切换背景</div>
          <div className='demo-control-btn' onClick={this.blockControl.bind(this)}>{ showBlock ? '隐藏代码' : '显示代码'}</div>
        </div>
      </div>
    )
  }
}

