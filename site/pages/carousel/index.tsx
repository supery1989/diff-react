import Markdown from '../../../libs/markdown'

export default class Carousel extends Markdown {
  document() {
    return require(`../../docs/carousel.md`)
  }
}
