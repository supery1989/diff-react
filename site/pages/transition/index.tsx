import Markdown from '../../../libs/markdown';
import './style.scss'

export default class Transition extends Markdown {
  document() {
    return require(`../../docs/transition.md`);
  }
}
