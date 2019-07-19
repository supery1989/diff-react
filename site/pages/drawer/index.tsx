import Markdown from '../../../libs/markdown'

export default class Drawer extends Markdown {
  document() {
    return require(`../../docs/drawer.md`)
  }
}
