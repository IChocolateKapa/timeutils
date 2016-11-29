### Install and import into your file:
> npm install timeutils

In Node.js:

`
  var timeUtils = require('timeutils')
`

if you are with ES6:

`
  import timeUtils from 'timeutils'
`

### API

> _getDaysOfMonth(year, n)

`
  var days = timeUtils.getDaysOfMonth(2015, 12)// 31
`

> endOfWeek(day)

`
  var _end = timeUtils.endOfWeek('2016-11-08') // 
`
>totalWeeksOfYear(year)

>currentWeekNumber(date)

>getFormatTime(start_day, n, format)


`
  var _f1 = timeUtils.getFormatTime('2015-12-24', -1, 'YYYY-MM-DD')  // 2015-12-25
`

`
  var _f1 = timeUtils.getFormatTime((new Date()).getTime(), 0, 'YYYY-MM-DD HH:MM:SS')  // 2016-11-29 12:23:34
`

`
  var _f1 = timeUtils.getFormatTime('2015-12-24', 2, 'YYYY-MM-DD')  // 2015-12-22
`

`
  var _f1 = timeUtils.getFormatTime() // return current date format as 'YYYY-MM-DD' by default
`

### For more infomation, I suggest you can download src file and read it by yourself. :)