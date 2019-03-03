import Markdown from '../../../libs/markdown'
import './style.scss'

export default class Tooltip extends Markdown {
  document() {
    return require(`../../docs/tooltip.md`)
  }
}
