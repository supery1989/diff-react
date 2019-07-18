import Markdown from '../../../libs/markdown'

export default class Timeline extends Markdown {
  document() {
    return require(`../../docs/timeline.md`)
  }
}
