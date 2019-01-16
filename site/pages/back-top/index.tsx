import Markdown from '../../../libs/markdown'
import './style.scss'

export default class BackTop extends Markdown {
  document() {
    return require(`../../docs/back-top.md`)
  }
}
