import Markdown from '../../../libs/markdown';
import './style.scss';

export default class Icon extends Markdown {
  document() {
    return require(`../../docs/icon.md`);
  }
}
