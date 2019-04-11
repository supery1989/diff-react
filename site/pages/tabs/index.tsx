import Markdown from '../../../libs/markdown'

export default class Tabs extends Markdown {
  document() {
    return require(`../../docs/tabs.md`)
  }
}
