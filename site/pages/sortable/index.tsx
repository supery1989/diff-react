import Markdown from '../../../libs/markdown'
import './style.scss'

export default class Sortable extends Markdown {
  document() {
    return require(`../../docs/sortable.md`)
  }
}
