import Markdown from '../../../libs/markdown'

export default class Textarea extends Markdown {
  document() {
    return require(`../../docs/textarea.md`)
  }
}
