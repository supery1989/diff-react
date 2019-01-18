import Markdown from '../../../libs/markdown'

export default class Popup extends Markdown {
  document() {
    return require(`../../docs/popup.md`)
  }
}
