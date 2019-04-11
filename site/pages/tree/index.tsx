import Markdown from '../../../libs/markdown'

export default class Tree extends Markdown {
  document() {
    return require(`../../docs/tree.md`)
  }
}
