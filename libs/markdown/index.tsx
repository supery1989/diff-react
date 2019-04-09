import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Link } from 'react-router-dom'
import marked from 'marked';
import prism from 'prismjs';
import uuidv5 from 'uuid/v5'

import Canvas from './canvas';
import { MENU_LISTS_ARR, MENU_LISTS_TOTAL } from '../../site/layout/Menu'
import Icon from 'components/icon'
import './style.scss'

export default class Markdown extends React.Component {
  static defaultProps: any
  components: any;
  renderer: any;
  constructor(props: any) {
    super(props);

    this.components = new Map;

    this.renderer = new marked.Renderer();
    this.renderer.table = (header: any, body: any) => {
      return `<table class="grid"><thead>${header}</thead><tbody>${body}</tbody></table>`;
    }
    // this.renderer.heading = function (text:any, level: number) {
    //   console.dir(text)
    //   var escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
    //   console.dir(escapedText)
    //   return `<BlockHeader title='${escapedText}' />`;
    // };
  }

  componentDidMount() {
    this.renderDOM();
  }

  componentDidUpdate() {
    this.renderDOM();
  }

  renderDOM() {
    this.components.forEach((item: any, key: any) => {
      const div = document.getElementById(key);
      if (div instanceof HTMLElement) {
        ReactDOM.render(item, div);
      }
    })
    for (const [id, component] of this.components) {
      const div = document.getElementById(id);
      if (div instanceof HTMLElement) {
        ReactDOM.render(component, div);
      }
    }
    prism.highlightAll();
  }

  setPrevAndNext(title: string) {
    const index = MENU_LISTS_ARR.findIndex((item: any) => item.name === title)
    const isFirst = index === 0
    const isLast = index === MENU_LISTS_TOTAL - 1
    let prev: any = null;
    let next: any = null;
    if (!isFirst) {
      const prevItem = MENU_LISTS_ARR[index - 1]
      prev = (
        <span className='demo-nav-item'>
          <Icon className='demo-nav-icon' type='left' />
          <Link to={`/components/${prevItem.key}`}>{prevItem.name}</Link>
        </span>
      )
    }
    if (!isLast) {
      const nextItem = MENU_LISTS_ARR[index + 1]
      next = (
        <span className='demo-nav-item'>
          <Link className='demo-nav-icon' to={`/components/${nextItem.key}`}>{nextItem.name}</Link>
          <Icon type='right' />
        </span>
      )
    }
    return (
      <div className='demo-block-nav'>
        <div className='demo-nav'>{prev}</div>
        <div className='demo-nav'>{next}</div>
      </div>
    )
  }

  document() {}

  render() {
    const markDocument: any = this.document()
    document.title = markDocument.split('\n')[0].substr(3)
    if (typeof markDocument === 'string') {
      this.components.clear();

      const html = marked(markDocument.replace(/:::\s?demo\s?([^]+?):::/g, (match, p1, offset) => {
        const namespace = '1b671a64-40d5-491e-99b0-da01ff1f3341'
        // 使用offset定位生成id会导致最后一个demo无法热更新
        const id = uuidv5(p1, namespace)
        this.components.set(id, React.createElement(Canvas, Object.assign({
          name: this.constructor.name.toLowerCase()
        }, this.props), p1));

        return `<div id=${id}></div>`;
      }), { renderer: this.renderer });

      return (
        <div>
          <div dangerouslySetInnerHTML={{
            __html: html
          }} />
          {this.setPrevAndNext(document.title)}
        </div>
      )
    } else {
      return <span />
    }
  }
}
