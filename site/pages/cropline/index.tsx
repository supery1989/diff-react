import Markdown from '../../../libs/markdown'

export default class CropLine extends Markdown {
  document() {
    return require(`../../docs/cropline.md`)
  }
}
