import Markdown from '../../../libs/markdown'

export default class ImagePreview extends Markdown {
  document() {
    return require(`../../docs/image-preview.md`)
  }
}

ImagePreview.defaultProps = {
  imgSrc: require('../../assets/image/landscape.jpeg')
}
