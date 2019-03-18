## Moment 时刻

用于处理与时间相关的操作。

### 基本用法

::: demo
```js
render() {
  const test = Moment.add(new Date(), 1)
  return (
    <div>
      <div>格式化Date Moment(new Date(1551681623848)) : {Moment(new Date(1551681623848))}</div>
      <Divider />
      <div>格式化时间戳 Moment(1551681623848) : {Moment(1551681623848)}</div>
      <Divider />
      <div>格式化字符串 Moment(20190304) : {Moment(20190304)}</div>
      <Divider />
      <div>自定义格式 Moment(1551681623848, 'HH/mm/ss') : {Moment(1551681623848, 'HH/mm/ss')}</div>
      <Divider />
      <div>获取年 Moment.year(new Date()) : {Moment.year(new Date())}</div>
      <Divider />
      <div>获取年简写 Moment(new Date(), 'YY') : {Moment(new Date(), 'YY')}</div>
      <Divider />
      <div>获取utc Moment.utc() : {Moment.utc()}</div>
      <Divider />
      <div>获取时间戳 Moment.unix() : {Moment.unix()}</div>
      <Divider />
      <div>日期计算 Moment.add(new Date(), 1) : {Moment.add(new Date(), 1)}</div>
      <Divider />
      <div>比较日期差 Moment.diff(new Date(), test) : {Moment.diff(new Date(), test)}</div>
      <Divider />
      <div>时区转换 Moment.tzc(new Date(), 8) : {Moment.tzc(new Date(), 8)}</div>
      <Divider />
      <div>当前月份天数 Moment.daysInMonth() : {Moment.daysInMonth()}</div>
      <Divider />
      <div>当前是今年第{Moment.getYearWeek()}周 Moment.getYearWeek()</div>
      <Divider />
      <div>当前是否闰年 Moment.isLeapYear() : {Moment.isLeapYear() ? '是' : '否'}</div>
    </div>
  )
}
```
:::

### 格式化规则
| 参数      | 说明          | 中文说明      | 实例                           |
|---------- |-------------- |---------- |--------------------------------  |
| YYYY | full year | 年 | 2019 |
| MM | month | 月 | 01 |
| DD | day | 日 | 01 |
| HH | hours | 时 | 01 |
| mm | minutes | 分钟 | 01 |
| ss | seconds | 秒 | 01 |
| ms | milliseconds | 毫秒 | 987 |

### Events
| 事件名称 | 说明 | 参数 |
|---------- |-------- |---------- |
| Moment(date, format = 'YYYY-MM-DD') | 格式化时间 | 接受时间戳和Date两种，默认格式化为YYYY-MM-DDD |
| Moment.year(date) | 获取年 | Date或者时间戳 |
| Moment.month(date, type) | 获取月，type为fill时获取08形式的月 | Date或者时间戳 |
| Moment.date(date, type) | 获取日，type为fill时获取08形式的日 | Date或者时间戳 |
| Moment.hour(date, type) | 获取小时，type为fill时获取08形式的小时 | Date或者时间戳 |
| Moment.minute(date, type) | 获取分钟，type为fill时获取08形式的分钟 | Date或者时间戳 |
| Moment.second(date, type) | 获取秒，type为fill时获取08形式的秒 | Date或者时间戳 |
| Moment.utc(date) | 获取utc时间 | Date或者时间戳 |
| Moment.unix(date) | 获取时间戳 | Date或者时间戳 |
| Moment.add(date, number, type = 'D') | 计算时间 | Date或者时间戳，差值，默认类型为天/D |
| Moment.diff(start, end) | 比较时间差 | 开始时间，结束时间 |
| Moment.tzc(date, zone) | 时区转换 | Date或者时间戳，时区(东八区即为8，西八区-8) |
| Moment.daysInMonth(date?) | 获取当前月份天数 | Date或者时间戳 |
| Moment.getYearWeek(date?) | 获取当前是今年第几周 | Date或者时间戳 |
| Moment.isLeapYear(date?) | 判断当前是否闰年 | Date或者时间戳 |
