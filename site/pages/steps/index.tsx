import Markdown from '../../../libs/markdown'

export default class Steps extends Markdown {
  document() {
    return require(`../../docs/steps.md`)
  }
}
