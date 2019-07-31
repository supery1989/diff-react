import Markdown from '../../../libs/markdown'

export default class Field extends Markdown {
  document() {
    return require(`../../docs/field.md`)
  }
}
