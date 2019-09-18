import Markdown from '../../../libs/markdown';
import './style.scss'

export default class QuickStart extends Markdown {
  isLead = true
  document() {
    return require(`../../docs/quick-start.md`);
  }
}