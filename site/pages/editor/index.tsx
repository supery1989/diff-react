import Markdown from '../../../libs/markdown'

export default class Editor extends Markdown {
  document() {
    return require(`../../docs/editor.md`)
  }
}
