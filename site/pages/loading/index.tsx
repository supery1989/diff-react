import Markdown from '../../../libs/markdown';

import './style.scss';

export default class Loading extends Markdown {
  document() {
    return require(`../../docs/loading.md`);
  }
}
