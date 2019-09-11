import Markdown from '../../../libs/markdown'
import './style.scss'

export default class Table extends Markdown {
  document() {
    return require(`../../docs/table.md`)
  }
}
