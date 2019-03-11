import Markdown from '../../../libs/markdown'

export default class CountDown extends Markdown {
  document() {
    return require(`../../docs/countdown.md`)
  }
}
