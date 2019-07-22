import Markdown from '../../../libs/markdown'

export default class List extends Markdown {
  document() {
    return require(`../../docs/list.md`)
  }
}
