import Markdown from '../../../libs/markdown'

export default class BlockHeader extends Markdown {
  document() {
    return require(`../../docs/block-header.md`)
  }
}
