import * as React from 'react'
import * as ReactDOM from 'react-dom'
import omit from 'omit.js'
import * as sortableJS from 'sortablejs'
import View, { ROOT_PREFIX } from '../../libs/view'

export interface SortableProps {
  className?: string
  style?: object
  tag: string
  filterClass?: string
  items?: Array<any>
  animation: number
  group?: string
  sort: boolean
  delay?: number
  ghostClass?: string
  chosenClass?: string
  dragClass?: string
  forceFallback?: boolean
  fallbackClass?: string
  fallbackOnBody?: boolean
  fallbackTolerance?: number
  scroll?: boolean
  scrollSensitivity: number
  scrollSpeed: number
  onChange?: (newIndex: number, oldIndex: number) => void
  onMove?: (event: Event) => boolean
  onEnd?: (event: Event) => any
  onChoose?: (event: Event) => any
  onStart?: (event: Event) => any
  onAdd?: (event: Event) => any
  onUpdate?: (event: Event) => any
  onSort?: (event: Event) => any
  onRemove?: (event: Event) => any
  onFilter?: (event: Event) => any
  onClone?: (event: Event) => any
}

export default class Sortable extends React.Component<SortableProps> {
  private prefix = `${ROOT_PREFIX}-sortable`
  static defaultProps = {
    tag: 'div',
    animation: 150,
    sort: true,
    scrollSensitivity: 30,
    scrollSpeed: 10
  }
  sortable: any

  componentWillUnmount() {
    if (this.sortable) {
      this.sortable.destroy()
      this.sortable = null
    }
  }

  initSortable(node: any) {
    if (!node) {
      return
    }
    const { filterClass, onMove, onEnd, onChange, ghostClass, chosenClass, dragClass, fallbackClass, children, ...rest } = this.props
    const options = {
      filter: filterClass ? `.${filterClass}` : '',
      ghostClass: ghostClass || `${this.prefix}-ghost`,
      chosenClass: chosenClass || `${this.prefix}-chosen`,
      dragClass: dragClass || `${this.prefix}-drag`,
      fallbackClass: fallbackClass || `${this.prefix}-fallback`,
      onMove: (e: any) => {
        if (onMove) {
          return onMove(e)
        }
        return e.related.className !== filterClass
      },
      onEnd: (e: any) => {
        onEnd && onEnd(e)
        const { items } = this.props
        if (!items) {
          return
        }
        const { oldIndex, newIndex } = e
        onChange && onChange(newIndex, oldIndex)
      },
      ...rest,
    }
    this.sortable = sortableJS.create(ReactDOM.findDOMNode(node), options)
  }

  render() {
    const { tag, children, ...rest } = this.props
    const viewProps = omit(rest, ['filterClass', 'onMove', 'onEnd', 'items', 'onChange', 'animation', 'group', 'sort', 'delay', 'ghostClass', 'chosenClass', 'dragClass', 'forceFallback', 'fallbackClass', 'fallbackOnBody', 'fallbackTolerance', 'scroll', 'scrollSensitivity', 'scrollSpeed', 'onChoose', 'onStart', 'onAdd', 'onUpdate', 'onSort', 'onRemove', 'onFilter', 'onClone'])
    return (
      <View config={{...viewProps, prefix: this.prefix}} tag={tag} ref={(node: any) => this.initSortable(node)}>{children}</View>
    )
  }
}
