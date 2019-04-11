import Markdown from '../../../libs/markdown'

export default class ColorPicker extends Markdown {
  document() {
    return require(`../../docs/colorpicker.md`)
  }
}
