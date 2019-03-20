import Markdown from '../../../libs/markdown'

export default class TimePicker extends Markdown {
  document() {
    return require(`../../docs/timepicker.md`)
  }
}
