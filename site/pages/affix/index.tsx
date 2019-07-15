import Markdown from '../../../libs/markdown'

export default class Affix extends Markdown {
  document() {
    return require(`../../docs/affix.md`)
  }
}
