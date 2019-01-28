import Markdown from '../../../libs/markdown'
import './style.scss'

export default class Input extends Markdown {
  document() {
    return require(`../../docs/input.md`)
  }
}
