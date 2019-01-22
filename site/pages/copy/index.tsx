import Markdown from '../../../libs/markdown'

export default class Copy extends Markdown {
  document() {
    return require(`../../docs/copy.md`)
  }
}
