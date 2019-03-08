import Markdown from '../../../libs/markdown'

export default class Moment extends Markdown {
  document() {
    return require(`../../docs/moment.md`)
  }
}
