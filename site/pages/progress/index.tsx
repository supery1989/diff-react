import Markdown from '../../../libs/markdown'

export default class Progress extends Markdown {
  document() {
    return require(`../../docs/progress.md`)
  }
}
