import classnames from 'classnames'
import Moment from 'components/moment'
import { ROOT_PREFIX } from 'libs/view'
import { CURRENT, FillValue } from './util'

export function IsSelected(type: string, val: number, selected: any) {
  return Moment[type](selected) === val
}

export function IsCurrent(type: string, val: number) {
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
        [`${ROOT_PREFIX}-time-cell-current`]: IsCurrent(type, i),
        [`${ROOT_PREFIX}-time-cell-selected`]: IsSelected(type, i, selected),
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

// datePicker timePicker 共有属性
export interface DTCommonProps {
  className?: string
  style?: object
  value?: any
  min?: any
  max?: any
  showNow?: boolean
  nowText?: string
  confirmText?: string
  width: number
  disabled?: boolean
  format?: string
  showError?: boolean
  onBeforeClear?: () => boolean
  onBeforeConfirm?: () => boolean
}

// rangePicker 共有属性
export interface RangeCommonProps extends DTCommonProps {
  wrapperClassName?: string,
  wrapperStyle?: object
  placeholder: string[]
  // value: any[]
  onChange?: (moment: any[], time: string[]) => void
  toText: string | React.ReactNode
}

// timePicker 共有属性
export interface TimeCommonProps extends DTCommonProps {
  hourStep?: number
  minuteStep?: number
  secondStep?: number
  disabledTime?: () => {}
  showReset?: boolean
  resetText?: string
  showSecond?: boolean
}

// datePicker 共有属性
export interface DateCommonProps extends DTCommonProps {
  disabledDate?: (val: any) => void
}