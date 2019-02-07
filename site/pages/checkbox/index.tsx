import Markdown from '../../../libs/markdown'

export default class Checkbox extends Markdown {
  document() {
    return require(`../../docs/checkbox.md`)
  }
}
