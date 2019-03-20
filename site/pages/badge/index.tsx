import Markdown from '../../../libs/markdown'

export default class Badge extends Markdown {
  document() {
    return require(`../../docs/badge.md`)
  }
}
