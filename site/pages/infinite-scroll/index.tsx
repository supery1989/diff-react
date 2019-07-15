import Markdown from '../../../libs/markdown'

export default class InfiniteScroll extends Markdown {
  document() {
    return require(`../../docs/infinite-scroll.md`)
  }
}
