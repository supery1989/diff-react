import Markdown from '../../../libs/markdown'

export default class Rate extends Markdown {
  document() {
    return require(`../../docs/rate.md`)
  }
}
