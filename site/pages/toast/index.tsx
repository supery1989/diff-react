import Markdown from '../../../libs/markdown';

// import './style.scss';

export default class Toast extends Markdown {
  document() {
    return require(`../../docs/toast.md`);
  }
}
