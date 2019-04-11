function initDate(date: any) {
  if (!date) {
    date = new Date()
  } else {
    if (date instanceof Date) {
      date = date
    } else if (typeof date === 'number') {
      if (String(date).length === 8) {
        date = String(date).replace(/^(\d{4})(\d{2})(\d{2})$/, "$1/$2/$3")
        date = new Date(date)
      } else {
        date = Number(date)
        date = new Date(date)
      }
    }
  }
  return date
}

function Moment(date: any, str: any = 'YYYY-MM-DD', utc: boolean = false) {
  const timeRegex = /(?=(YYYY|YY|MM|DD|HH|mm|ss|ms))\1([:/]*)/g
  const timeSpan = {
    YYYY: ['getFullYear', 4],
    YY: ['getFullYear', 2],
    MM: ['getMonth', 2, 1],
    DD: ['getDate', 2],
    HH: ['getHours', 2],
    mm: ['getMinutes', 2],
    ss: ['getSeconds', 2],
    ms: ['getMilliseconds', 3]
  }
  date = initDate(date)
  
  return str.replace(timeRegex, ((match: any, key: any, rest: any) => {
    const args = timeSpan[key]
    const chars = args[1]
    let name = args[0]
    if (utc === true) {
      name = `getUTC${name.slice(3)}`;
    }
    const val = `00${String(date[name]() + (args[2] || 0))}`
    return val.slice(-chars) + (rest || '')
  }))
}

Moment.utc = (date: any, str: any) => {
  return Moment(date, str, true);
}

Moment.isLeapYear = (date?: any) => {
  let y
  if (date && String(date).length === 4) {
    y = date
  } else {
    date = initDate(date)
    y = date.getFullYear()
  }
  return (0 === y%4 && ((y%100 !== 0) || (y%400 === 0)))
}

Moment.unix = (date?: any) => {
  date = initDate(date)
  return date.getTime()
}

Moment.add = (date: any = '', add: number, type: string = 'D') => {
  const obj = {
    Y: 31536000000,
    M: 2592000000,
    D: 86400000,
    H: 3600000,
    m: 60000,
    s: 1000
  }
  date = initDate(date)
  date = Moment.unix(date)
  date = date + add * obj[type]
  return date
}

Moment.diff = (start: any, end: any) => {
  start = Moment.unix(initDate(start))
  end = Moment.unix(initDate(end))
  return end - start
}

function timeZoneConverter(date: any, timeZone: any) {
  const oldDate = new Date(date)
  const newDate = new Date()
  const stamp = oldDate.getTime()
  if (!timeZone) return oldDate
  return (isNaN(timeZone) && !timeZone)
    ? oldDate :
    new Date(stamp + (newDate.getTimezoneOffset() * 60 * 1000) + (timeZone * 60 * 60 * 1000))
}

Moment.tzc = (date: any, timeZone: any) => {
  return timeZoneConverter(date, timeZone).toString()
}

// 返回月份的天数
Moment.daysInMonth = (date?: any) => {
  date = initDate(date)
  const m = Moment.month(date)
  let days
  if (m === 2) {
    days = Moment.isLeapYear(date) ? 29 : 28
  } else if (m === 1 || m === 3 || m === 5 || m === 7 || m === 8 || m === 10 || m === 12) {
    days = 31;
  } else {
    days = 30
  }
  return days;
}

Moment.getYearWeek = (date?: any) => {
  date = initDate(date)
  const y = Moment(date, 'YYYY')
  const first = new Date(y, 0, 1)
  const firstUnix = Moment.unix(first)
  const nowUnix = Moment.unix(date)
  const diff = Math.round((nowUnix - firstUnix) / 86400000)
  return Math.ceil((diff + (first.getDay() - 1)) / 7)
}

Moment.year = (date?: any) => {
  date = initDate(date)
  return Moment(date, 'YYYY')
}

Moment.month = (date: any = new Date(), type?: string) => {
  date = initDate(date)
  if (type === 'fill') {
    return Moment(date, 'MM')
  }
  return Number(Moment(date, 'MM'))
}

Moment.date = (date: any = new Date(), type?: string) => {
  date = initDate(date)
  if (type === 'fill') {
    return Moment(date, 'DD')
  }
  return Number(Moment(date, 'DD'))
}

Moment.hour = (date: any = new Date(), type?: string) => {
  date = initDate(date)
  if (type === 'fill') {
    return Moment(date, 'HH')
  }
  return Number(Moment(date, 'HH'))
}

Moment.minute = (date: any = new Date(), type?: string) => {
  date = initDate(date)
  if (type === 'fill') {
    return Moment(date, 'mm')
  }
  return Number(Moment(date, 'mm'))
}

Moment.second = (date: any = new Date(), type?: string) => {
  date = initDate(date)
  if (type === 'fill') {
    return Moment(date, 'ss')
  }
  return Number(Moment(date, 'ss'))
}

export default Moment
