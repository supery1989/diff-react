import Markdown from '../../../libs/markdown'

export default class Card extends Markdown {
  document() {
    return require(`../../docs/card.md`)
  }
}

Card.defaultProps = {
  imgSrc: require('../../assets/image/landscape.jpeg')
}
