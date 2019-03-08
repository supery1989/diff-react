import * as React from 'react';
import * as ReactDOM from 'react-dom';
import marked from 'marked';
import prism from 'prismjs';
import uuidv5 from 'uuid/v5'

import Canvas from './canvas';
import './style.scss'

export default class Markdown extends React.Component {
  static defaultProps: any
  components: any;
  renderer: any;
  // document: any;
  constructor(props: any) {
    super(props);

    this.components = new Map;

    this.renderer = new marked.Renderer();
    this.renderer.table = (header: any, body: any) => {
      return `<table class="grid"><thead>${header}</thead><tbody>${body}</tbody></table>`;
    }
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
        <div dangerouslySetInnerHTML={{
          __html: html
        }} />
      )
    } else {
      return <span />
    }
  }
}
