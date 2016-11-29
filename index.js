/**
 * Created by IChocolateKapa on 16/11/10.
 *
 */
module.exports = {
	getNextDay: function (type, pack_date) {
		var _thatDay = this.getFormatTime(pack_date.end_date)
		var _curDay = this.getFormatTime()
		var _cur_year = parseInt(_curDay.slice(0, 4))
		var _cur_mon = parseInt(_curDay.slice(5, 7))
		var ret = ''
		var monthDays = 0
		var qutarDays = 0
		
		if (_thatDay != _curDay) {
			ret = this.getFormatTime(_thatDay, -1)
		} else {
			switch (type) {
				case 'week':
					//如果结束时间是今天，要找到本周最后一天，然后取下一周的第一天。。。这什么鬼逻辑
					ret = this.getFormatTime(this.endOfWeek(_curDay), -1)
					break
				case 'month':
					monthDays = this._getDaysOfMonth(_cur_year, _cur_mon)
					ret = this.getFormatTime(pack_date.start_date, -monthDays)
					break
				case 'quater':
					var n = this._getQuaterNum(_cur_mon)
					var monthList = [n * 3 - 2, n * 3 - 1, n * 3]
					var self = this
					monthList.forEach(function (m) {
						qutarDays += self._getDaysOfMonth(_cur_year, m)
					})
					ret = this.getFormatTime(pack_date.start_date, -qutarDays)
					break
			}
		}
		
		return ret
		
	},
	_getDaysOfMonth: function (year, n) {
		var total = 0
		var _l1 = [1, 3, 5, 7, 8, 10, 12]
		var _l2 = [4, 6, 9, 11]
		var _l3 = [2]
		n = parseInt(n)
		var isLeap = this.leapYear(year)
		if (_l1.indexOf(n) != -1) {
			total = 31
		} else if (_l2.indexOf(n) != -1) {
			total = 30
		} else if (_l3.indexOf(n) != -1) {
			total = isLeap ? 29 : 28
		}
		return total
	},
	_getQuaterNum: function (n) {
		var q1 = [1, 2, 3]
		var q2 = [4, 5, 6]
		var q3 = [7, 8, 9]
		var q4 = [10, 11, 12]
		if (q1.indexOf(n) != -1) {
			return 1
		} else if (q2.indexOf(n) != -1) {
			return 2
		} else if (q3.indexOf(n) != -1) {
			return 3
		} else {
			return 4
		}
		
	},
	_endOfWeek: function (date) {
		var firstDayOfWeek = date.getUTCDate() - date.getUTCDay()
		var lastDayOfWeek = new Date(date)
		lastDayOfWeek.setUTCDate(firstDayOfWeek + 7)
		return lastDayOfWeek
	},
	endOfWeek: function (day) {
		var date = new Date(day)
		var endweekdate = this._endOfWeek(date)
		return this.getFormatTime(endweekdate)
	},
	_startOfWeek: function (date) {
		var _firstDayOfWeek = date.getUTCDate() - date.getUTCDay()
		var firstDayOfWeek = new Date()
		firstDayOfWeek.setUTCDate(_firstDayOfWeek)
		return this.getFormatTime(firstDayOfWeek)
	},
	startOfWeek: function (day) {
		var date = new Date(day)
		var endweekdate = this._startOfWeek(date)
		return this.getFormatTime(endweekdate)
	},
	leapYear: function (year) {
		year = year || new Date();
		year = year instanceof Date ? year.getFullYear() : year;
		return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
	},
	yearDays: function (year) {
		return this.leapYear(year) ? 366 : 365;
	},
	totalWeeksOfYear: function (year) {
		return (this.yearDays(year) / 7) | 0;
	},
	/**
	 * 获取指定的格式化时间yyyy-mm-dd
	 * 1，不传参数，得到今天的时间
	 * 2，传start_day，格式为yyyy-mm-dd，传n，表示以start_day开始，往前n(正值)或者往后(负值)天的格式化时间
	 * 3，只传n,start_day是今天
	 * 4，只传start_day好像没啥意义啊
	 * */
	getFormatTime: function (start_day, n, format) {
		var curD
		if (start_day) {
			//yyyy-mm-dd
			if (start_day.indexOf('-') != -1) {
				curD = new Date(start_day)
			} else {
				//时间戳，毫秒
				var _d = new Date()
				curD = _d.setTime(parseInt(start_day))
			}
			
		} else {
			curD = new Date()
		}
		
		n = parseInt(n)
		
		var oTime = n ? curD.getTime() - 1000 * 60 * 60 * 24 * n : curD.getTime()
		
		var _date = new Date()
		_date.setTime(oTime)
		
		
		format = format.toUpperCase()
		let year = _date.getFullYear()
		let month = (_date.getMonth() + 1) > 9 ? _date.getMonth() + 1 : '0' + (_date.getMonth() + 1)
		let day = _date.getDate() > 9 ? _date.getDate() : '0' + _date.getDate()
		let hour = _date.getHours() > 9 ? _date.getHours() : '0' + _date.getHours()
		let minute = _date.getMinutes() > 9 ? _date.getMinutes() : '0' + _date.getMinutes()
		let second = _date.getSeconds() > 9 ? _date.getSeconds() : '0' + _date.getSeconds()
		let millon_second = _date.getMilliseconds() > 9 ? _date.getMilliseconds() : '0' + _date.getMilliseconds()
		
		let ymd = [year, month, day].join('-')
		let hms = [hour, minute, second].join(':')
		
		if (!format) {
			return ymd
		}
		if (format == 'YYYY-MM-DD') {
			return ymd
		} else if (format == 'YYYY-MM-DD HH:MM:SS') {
			return ymd + ' ' + hms
		} else if (format == 'YYYY-MM-DD HH:MM:SS:SSSS') {
			return ymd + ' ' + hms + ':' + millon_second
		} else {
			console.error('unknown format')
			return '1970-01-01 00:00:00'
		}
	},
	currentWeekNumber: function (date) {
		var instance;
		if (typeof date === 'string' && date.length) {
			instance = new Date(date);
		} else if (date instanceof Date) {
			instance = date;
		} else {
			instance = new Date();
		}
		
		var target = new Date(instance.valueOf());
		var dayNr = (instance.getDay() + 6) % 7;
		target.setDate(target.getDate() - dayNr + 3);
		
		var firstThursday = target.valueOf();
		target.setMonth(0, 1);
		if (target.getDay() !== 4) {
			target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7);
		}
		var weekNumber = 1 + Math.ceil((firstThursday - target) / 604800000);
		return weekNumber;
	},
	getWeekList: function (start_day) {
		var tmp_year = parseInt(start_day.slice(0, 4))
		
		var _curDay = this.getFormatTime()
		var _cur_year = parseInt(_curDay.slice(0, 4))
		
		
		var diff_year = _cur_year - tmp_year + 1
		
		var weekList = []
		for (var i = 0; i < diff_year; i++) {
			var _that_year = i + tmp_year
			var totalWeeksOfYear = this.totalWeeksOfYear(_that_year)
			var start_w = this.currentWeekNumber(start_day)
			
			var _week
			var isLast = 0
			for (var j = start_w; j <= totalWeeksOfYear; j++) {
				var endWeekDay = this.endOfWeek(start_day)
				
				//如果是当年最后一天
				/*if (j == totalWeeksOfYear && isLast) {
					j++
					endWeekDay = _that_year + '-12-31'
				}*/
				//如果是今天
				if (endWeekDay === this.endOfWeek(_curDay)) {
					endWeekDay = _curDay
				}
				
				_week = _that_year + '第' + j + '周(' + start_day + '至' + endWeekDay + ')'
				
				weekList.unshift({
					start_date: start_day,
					end_date: endWeekDay,
					text: _week
				})
				//如果不是当年最后一天
				var diff = 31 - parseInt(endWeekDay.slice(-2))
				if (j == totalWeeksOfYear && (diff < 7 && diff > 0)) {
					isLast = 1
					j--
				}
				
				if (endWeekDay == _curDay) {
					break
				}
				
				start_day = this.getFormatTime(endWeekDay, -1)
			}
		}
		return weekList
	},
	getMonthList: function (start_day) {
		var tmp_year = parseInt(start_day.slice(0, 4))
		
		var _curDay = this.getFormatTime()
		var _cur_year = parseInt(_curDay.slice(0, 4))
		var _cur_mon = parseInt(_curDay.slice(5, 7))
		
		
		var diff_year = _cur_year - tmp_year + 1
		
		var start_w = parseInt(start_day.slice(5, 7))
		
		var months = [];
		for (var i = 0; i < diff_year; i++) {
			var _that_year = i + tmp_year
			
			for (var j = start_w; j <= 12; j++) {
				var _j, _month
				if (!(_that_year == _cur_year && j == _cur_mon)) {
					_j = j > 9 ? j : '0' + j
					_month = _that_year + '-' + _j
					months.unshift({
						start_date: _month + '-01',
						end_date: _month + '-' + this._getDaysOfMonth(_that_year, j),
						text: _month
					})
				} else {
					_j = j > 9 ? j : '0' + j
					_month = _that_year + '-' + _j
					months.unshift({
						start_date: _month + '-01',
						end_date: this.getFormatTime(),
						text: _month
					})
					
					break
				}
				
				
				
			}
			start_w = 1
			
		}
		
		return months;
	},
	getQuarterList: function (start_day) {
		var tmp_year = parseInt(start_day.slice(0, 4))
		
		var _curDay = this.getFormatTime()
		var _cur_year = parseInt(_curDay.slice(0, 4))
		var _cur_mon = parseInt(_curDay.slice(5, 7))
		
		
		var diff_year = _cur_year - tmp_year + 1
		
		var start_w = parseInt(start_day.slice(5, 7))
		
		var quarterList = [];
		
		for (var i = 0; i < diff_year; i++) {
			var _that_year = i + tmp_year
			
			for (var j = start_w; j <= 12; j++) {
				var _j
				if (j % 3 == 0) {
					var _q = _that_year + '年第' + j / 3 + '季度'
					_j = j - 2 > 9 ? j - 2 : '0' + (j - 2)
					var _k = j > 9 ? j : '0' + j
					quarterList.unshift({
						start_date: _that_year + '-' + _j + '-01',
						end_date: _that_year + '-' + _k + '-' + this._getDaysOfMonth(_that_year, j),
						text: _q
					})
				} else if (_that_year == _cur_year && j == _cur_mon) {
					_j = this._getQuaterNum(j)
					var _s = _j * 3 - 2
					var _m = _s > 9 ? _s : '0' + _s
					
					quarterList.unshift({
						start_date: _that_year + '-' + _m + '-01',
						end_date: this.getFormatTime(),
						text: _that_year + '年第' + _j + '季度'
					})
				}
				
				
				if (_that_year == _cur_year && j == _cur_mon) {
					break
				}
			}
			start_w = 1
			
		}
		
		return quarterList
	}
}