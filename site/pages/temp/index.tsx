import Markdown from '../../../libs/markdown'

export default class Temp extends Markdown {
  document() {
    return require(`../../docs/temp.md`)
  }
}
