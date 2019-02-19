import Markdown from '../../../libs/markdown'

export default class Divider extends Markdown {
  document() {
    return require(`../../docs/divider.md`)
  }
}
