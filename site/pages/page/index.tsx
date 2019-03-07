import Markdown from '../../../libs/markdown'

export default class Page extends Markdown {
  document() {
    return require(`../../docs/page.md`)
  }
}
