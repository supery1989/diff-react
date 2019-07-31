import Markdown from '../../../libs/markdown'

export default class Upload extends Markdown {
  document() {
    return require(`../../docs/upload.md`)
  }
}
