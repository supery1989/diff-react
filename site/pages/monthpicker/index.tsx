import Markdown from '../../../libs/markdown'

export default class MonthPicker extends Markdown {
  document() {
    return require(`../../docs/monthpicker.md`)
  }
}
