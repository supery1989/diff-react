import Markdown from '../../../libs/markdown'

export default class Transfer extends Markdown {
  document() {
    return require(`../../docs/transfer.md`)
  }
}
