import Markdown from '../../../libs/markdown'

export default class Radio extends Markdown {
  document() {
    return require(`../../docs/radio.md`)
  }
}
