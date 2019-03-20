export function FillValue(val: number) {
  return val < 10 ? `0${val}` : val
}

export const CURRENT = new Date()