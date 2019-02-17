import Markdown from '../../../libs/markdown'

export default class Dropdown extends Markdown {
  document() {
    return require(`../../docs/dropdown.md`)
  }
}
