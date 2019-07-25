import Markdown from '../../../libs/markdown'
import './style.scss'

export default class Carousel extends Markdown {
  document() {
    return require(`../../docs/carousel.md`)
  }
}
