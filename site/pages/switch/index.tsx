import Markdown from '../../../libs/markdown'

export default class Switch extends Markdown {
  document() {
    return require(`../../docs/switch.md`)
  }
}
