import Markdown from '../../../libs/markdown'

export default class Avatar extends Markdown {
  document() {
    return require(`../../docs/avatar.md`)
  }
}
