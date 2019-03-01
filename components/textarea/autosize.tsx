let Ghost_Textarea: any

const Ghost_Textarea_Hidden_Style = `
  height: 0;
  position: absolute;
  top: -1000px;
  right: 0;
  overflow: hidden
`

const CONTEXT_STYLE = [
  'letter-spacing',
  'line-height',
  'padding-top',
  'padding-bottom',
  'font-family',
  'font-weight',
  'font-size',
  'text-rendering',
  'text-transform',
  'width',
  'text-indent',
  'padding-left',
  'padding-right',
  'border-width',
  'box-sizing',
  'cursor'
]

function calcNodeStyle(node: any) {
  const style = window.getComputedStyle(node)
  const paddingSize = (
    parseFloat(style.getPropertyValue('padding-bottom')) +
    parseFloat(style.getPropertyValue('padding-top'))
  )
  const borderSize = (
    parseFloat(style.getPropertyValue('border-bottom')) +
    parseFloat(style.getPropertyValue('border-top'))
  )
  const boxSizing = style.getPropertyValue('box-sizing')
  const contextSty = CONTEXT_STYLE
    .map(name => `${name}:${style.getPropertyValue(name)}`)
    .join(';')
  return { contextSty, paddingSize, borderSize, boxSizing }
}

export default function AutoSize(node: any, minRows: number, maxRows: number) {
  if (!Ghost_Textarea) {
    Ghost_Textarea = document.createElement('textarea')
    document.body && document.body.appendChild(Ghost_Textarea)
  }
  const { contextSty, boxSizing, paddingSize, borderSize } = calcNodeStyle(node)
  Ghost_Textarea.setAttribute('style', `${contextSty};${Ghost_Textarea_Hidden_Style}`)
  Ghost_Textarea.value = node.value || node.placeholder || ''
  let height = Ghost_Textarea.scrollHeight
  if (boxSizing === 'border-box') {
    height = height + borderSize
  } else if (boxSizing === 'content-box') {
    height = height - paddingSize
  }
  Ghost_Textarea.value = ''
  let singleRowHeight = Ghost_Textarea.scrollHeight - paddingSize
  if (minRows) {
    let minHeight = singleRowHeight * minRows
    if (boxSizing === 'border-box') {
      minHeight = minHeight + paddingSize + borderSize
    }
    height = Math.max(minHeight, height)
  }
  if (maxRows) {
    let maxHeight = singleRowHeight * maxRows
    if (boxSizing === 'border-box') {
      maxHeight = maxHeight + paddingSize + borderSize
    }
    height = Math.min(maxHeight, height)
  }
  return { height: `${height}px` }
}