import Markdown from '../../../libs/markdown'

export default class Collapse extends Markdown {
  document() {
    return require(`../../docs/collapse.md`)
  }
}
