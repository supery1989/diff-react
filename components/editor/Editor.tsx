/** 
 * 基于 Braft Editor
 * https://braft.margox.cn/
*/
import * as React from 'react'
import classnames from 'classnames'
import { throttle } from 'throttle-debounce'
import 'braft-editor/dist/index.css'
import 'braft-extensions/dist/table.css'
import 'braft-extensions/dist/color-picker.css'
import 'braft-extensions/dist/code-highlighter.css'
import BraftEditor from 'braft-editor'
import Table from 'braft-extensions/dist/table'
import ColorPicker from 'braft-extensions/dist/color-picker'
import CodeHighlighter from 'braft-extensions/dist/code-highlighter'
import HeaderId from 'braft-extensions/dist/header-id'
import Popup from 'components/popup'
import { ROOT_PREFIX } from 'libs/view'
import { FONT_SIZES, LINE_HEIGHTS, FONT_FAMILYS, PREVIEW_CONTROL } from './config'

export interface EditorProps {
  className?: string
  style?: object
  id: string
  controlBarClassName?: string
  controlBarStyle?: object
  contentClassName?: string
  contentStyle?: object,
  value?: any
  placeholder: string
  readOnly?: boolean
  disabled?: boolean
  componentBelowControlBar: React.ReactNode
  fontSizes: number[]
  fontFamilies: any[]
  lineHeights: number[]
  stripPastedStyles?: boolean
  height: number
  controls: []
  // colors  改成高级
  onChange?: (content: any) => void
  onFocus?: () => void
  onBlur?: (content: any) => void
}

export default class Editor extends React.Component<EditorProps> {
  private prefix = `${ROOT_PREFIX}-editor`
  static defaultProps = {
    value: '',
    placeholder: '请输入内容',
    fontSizes: FONT_SIZES,
    lineHeights: LINE_HEIGHTS,
    fontFamilies: FONT_FAMILYS,
    height: 200,
    id: `${ROOT_PREFIX}-editor`
  }
  state: any
  isLivinig: boolean
  customControls: any[]

  constructor(props: EditorProps) {
    super(props)

    this.state = {
      editorState: '', // 设置编辑器初始内容
    }
    this.handleChange = throttle(300, this.handleChange)
    this.customControls = this.calcControls(props)
  }

  componentDidMount () {
    this.isLivinig = true
    // 3秒后更改编辑器内容
    setTimeout(this.setEditorContentAsync, 3000)
  }

  componentWillUnmount () {
    this.isLivinig = false
  }

  calcControls(props: EditorProps) {
    const controls: any[] =  props.controls || [
      'preview', 'fullscreen', 'separator',
      'undo', 'redo', 'separator',
      'font-size', 'font-family', 'line-height', 'letter-spacing', 'separator',
      'text-color', 'bold', 'italic', 'underline', 'strike-through', 'separator',
      'superscript', 'subscript', 'remove-styles', 'emoji',  'separator', 'text-indent', 'text-align', 'separator',
      'headings', 'list-ul', 'list-ol', 'blockquote', 'code', 'separator',
      'link', 'separator', 'table', 'separator', 'hr', 'separator',
      'media', 'separator',
      'clear'
    ]
    const index1 = controls.findIndex(item => item === 'preview')
    if (index1 > -1) {
      controls[index1] = PREVIEW_CONTROL({onClick: this.preview.bind(this)})
    }

    if(controls.some(item => item === 'table')) {
      BraftEditor.use(Table({
        includeEditors: [props.id],
        defaultColumns: 5,
        defaultRows: 3
      }))
    }

    if(controls.some(item => item === 'text-color')) {
      BraftEditor.use(ColorPicker({
        includeEditors: [props.id],
        theme: 'light' // 支持dark和light两种主题，默认为dark
      }))
    }
    
    if(controls.some(item => item === 'code')) {
      BraftEditor.use(CodeHighlighter({
        includeEditors: [props.id],
      }))
    }
    
    if(controls.some(item => item === 'headings')) {
      BraftEditor.use(HeaderId({
        includeEditors: [props.id],
      }))
    }
    
    return controls
  }

  handleChange(editorState: any) {
    const { onChange } = this.props
    this.setState({
      editorState: editorState,
    })
    onChange && onChange(editorState.toHTML())
  }

  handleFocus() {
    const { onFocus } = this.props
    onFocus && onFocus()
  }

  handleBlur() {
    const { onBlur } = this.props
    const { editorState } = this.state
    onBlur && onBlur(editorState.toHTML())
  }

  setEditorContentAsync = () => {
    this.isLivinig && this.setState({
      editorState: BraftEditor.createEditorState(this.props.value)
    })
  }

  preview() {
    Popup({
      title: '预览',
      message: this.build(),
      width: '80%'
    }, 'alert')
  }

  build() {
    return <div dangerouslySetInnerHTML={{__html:this.state.editorState.toHTML()}}></div>
  }

  render() {
    const { className, readOnly, disabled, contentStyle, height, ...rest } = this.props
    // const viewProps = omit(rest, ['value'])
    const { editorState } = this.state
    const cls = classnames(this.prefix, className, {
      [`${this.prefix}-disabled`]: !!disabled
    })
    const contentSty = Object.assign({}, { height: `${height}px` }, contentStyle)
    return (
      <BraftEditor
        {...rest}
        className={cls}
        value={editorState}
        readOnly={readOnly || disabled}
        contentStyle={contentSty}
        controls={this.customControls}
        onChange={this.handleChange.bind(this)}
        onFocus={this.handleFocus.bind(this)}
        onBlur={this.handleBlur.bind(this)}
      />
    )
  }
}
