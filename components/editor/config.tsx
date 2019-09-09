import * as React from 'react'
import Icon from '../icon'

export const FONT_SIZES = [10, 12, 13, 14, 15, 16, 17, 18, 19, 20, 22, 24, 26, 28, 30, 32, 36, 40, 44, 48, 56, 64, 72, 96, 120, 144]

export const LINE_HEIGHTS = [0.8, 1, 1.2, 1.5, 1.75, 2, 2.5, 3, 4]

export const FONT_FAMILYS = [
  {
    name: '宋体',
    family: 'tahoma, arial, "Hiragino Sans GB", 宋体, sans-serif'
  }, {
    name: '微软雅黑',
    family: '微软雅黑, Microsoft Yahei'
  }, {
    name: 'Araial',
    family: 'Arial, Helvetica, sans-serif'
  }, {
      name: 'Georgia',
      family: 'Georgia, serif'
  }, {
      name: 'Impact',
      family: 'Impact, serif'
  }, {
      name: 'Monospace',
      family: '"Courier New", Courier, monospace'
  }, 
]

export function PREVIEW_CONTROL(props: any) {
  const { onClick } = props
  return {
    key: 'priview',
    type: 'button',
    title: '预览',
    text: <Icon type='filetext' />,
    onClick
  }
}

export const DEFAULT_CONTROLS = [
      'undo', 'redo', 'separator',
      'font-size', 'font-family', 'line-height', 'letter-spacing', 'separator',
      'text-color', 'bold', 'italic', 'underline', 'strike-through', 'separator',
      'superscript', 'subscript', 'remove-styles', 'emoji',  'separator', 'text-indent', 'text-align', 'separator',
      'headings', 'list-ul', 'list-ol', 'blockquote', 'code', 'separator',
      'link', 'separator', 'hr', 'separator',
      'media', 'separator',
      'clear', 'preview'
    ]