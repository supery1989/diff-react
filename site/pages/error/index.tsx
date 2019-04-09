import Markdown from '../../../libs/markdown'

export default class Error extends Markdown {
  document() {
    return require(`../../docs/error.md`)
  }
}
