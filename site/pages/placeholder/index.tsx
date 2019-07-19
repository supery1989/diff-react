import Markdown from '../../../libs/markdown'

export default class Placeholder extends Markdown {
  document() {
    return require(`../../docs/placeholder.md`)
  }
}
