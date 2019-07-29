import Markdown from '../../../libs/markdown'

export default class Slider extends Markdown {
  document() {
    return require(`../../docs/slider.md`)
  }
}
