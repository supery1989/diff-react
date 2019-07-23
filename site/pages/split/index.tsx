import Markdown from '../../../libs/markdown'

export default class Split extends Markdown {
  document() {
    return require(`../../docs/split.md`)
  }
}
