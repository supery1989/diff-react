import Markdown from '../../../libs/markdown'

import './style.scss'

export default class Grid extends Markdown {
  document() {
    return require(`../../docs/grid.md`)
  }
}
