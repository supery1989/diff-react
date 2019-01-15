import Markdown from '../../../libs/markdown';

import './style.scss';

export default class Alert extends Markdown {
  document() {
    return require(`../../docs/alert.md`);
  }
}
