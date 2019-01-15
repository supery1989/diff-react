import * as React from 'react'
import * as ReactDOM from 'react-dom'
// import PropTypes from 'prop-types'
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
  constructor(props: CanvasProps) {
    super(props)

    this.document = this.props.children.match(/([^]*)\n?(```[^]+```)/)
    this.description = marked(this.document[1])
    this.source = this.document[2].match(/```(.*)\n?([^]+)```/)
    this.state = {
      showBlock: false
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

  renderSource(value: any) {
    import('../../components').then(Element => {
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
      // if (process.env.NODE_ENV !== 'production') {
      //   throw err;
      // }
    })
  }

  render() {
    // 在constructor定义会导致第一个demo热更新异常
    this.playerId = `${parseInt(String(Math.random() * 1e9)).toString(36)}`
    return (
      <div className={`demo-block demo-box demo-${this.props.name}`}>
        <div className="source" id={this.playerId} />
        {
          this.state.showBlock && (
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
        <div className="demo-block-control" onClick={this.blockControl.bind(this)}>
          {
            this.state.showBlock ? (
              <span>
                <i className="el-icon-caret-top" />显示代码
              </span>
            ) : (
              <span>
                <i className="el-icon-caret-bottom" />隐藏代码
              </span>
            )
          }
        </div>
      </div>
    )
  }
}

