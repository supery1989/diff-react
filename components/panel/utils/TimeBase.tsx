import classnames from 'classnames'
import Moment from 'components/moment'
import { ROOT_PREFIX } from 'libs/view'
import { CURRENT, FillValue } from './util'

function isSelected(type: string, val: number, selected: any) {
  return Moment[type](selected) === val
}

function isCurrent(type: string, val: number) {
  return Moment[type](CURRENT) === val
}

export function GetCells(type: string, row: number, col: number, end: number, props: any) {
  const cells: any = []
  const { step, selected, disabled } = props
  let i = 0
  for (let j = 0; j < row; j++) {
    for (let k = 0; k < col && i < end; k++) {
      const isDisabled = disabled && disabled(i)
      const cls = classnames({
        [`${ROOT_PREFIX}-time-cell-current`]: isCurrent(type, i),
        [`${ROOT_PREFIX}-time-cell-selected`]: isSelected(type, i, selected),
        [`${ROOT_PREFIX}-time-cell-disabled`]: isDisabled,
      })
      cells[j] = cells[j] || []
      cells[j][k] = {
        text: FillValue(i),
        value: i,
        className: cls,
        disabled: isDisabled
      }
      i += step
    }
  }
  return cells
}

export interface TimeCommonProps {
  className?: string
  style?: object
  value?: any
  hourStep?: number
  minuteStep?: number
  secondStep?: number
  disabledTime?: () => {}
  min?: any
  max?: any
  showNow?: boolean
  showReset?: boolean
  nowText?: string
  resetText?: string
  confirmText?: string
  width: number
  disabled?: boolean
  onBeforeClear?: () => boolean
  onBeforeConfirm?: () => boolean
  showSecond?: boolean
  format?: string
  showError?: boolean
}