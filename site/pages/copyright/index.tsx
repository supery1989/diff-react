import Markdown from '../../../libs/markdown'

export default class Copyright extends Markdown {
  document() {
    return require(`../../docs/copyright.md`)
  }
}
