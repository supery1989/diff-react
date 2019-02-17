import Markdown from '../../../libs/markdown'

export default class Menu extends Markdown {
  document() {
    return require(`../../docs/menu.md`)
  }
}
