<template>
  <div :class="{'is-weekend-highlight': highlightWeekend}" class="inline-calendar">
    <div v-show="!hideHeader" class="calendar-header">
      <div class="calendar-year">
        <span @click="go(year - 1, month)">
          <a class="year-prev vux-prev-icon" href="javascript:"/>
        </span>
        <a class="calendar-year-txt calendar-title" href="javascript:">{{ year }}</a>
        <span class="calendar-header-right-arrow" @click="go(year + 1, month)">
          <a class="year-next vux-next-icon" href="javascript:"/>
        </span>
      </div>

      <div class="calendar-month">
        <span @click="prev">
          <a class="month-prev vux-prev-icon" href="javascript:"/>
        </span>
        <a class="calendar-month-txt calendar-title" href="javascript:">{{ months[month] }}</a>
        <span class="calendar-header-right-arrow" @click="next">
          <a class="month-next vux-next-icon" href="javascript:"/>
        </span>
      </div>
    </div>

    <table>
      <thead v-show="!hideWeekList">
        <tr>
          <th v-for="(week, index) in _weeksList" :key="index" :class="`is-week-list-${index}`" class="week">{{ week }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(day,k1) in days" :key="k1">
          <td
            v-for="(child,k2) in day"
            :key="`${k1}_${k2}`"
            :data-date="formatDate(year, month, child)"
            :data-current="currentValue"
            :class="buildClass(k2, child)"
            @click="select(k1, k2, child)">
            <slot
              :year="year"
              :month="month"
              :child="processDateItem(child)/* deprecated, use date instead */"
              :date="processDateItem(child)"
              :row="k1"
              :col="k2"
              :raw-date="formatDate(year, month, child)"
              :show-date="replaceText(child.day, formatDate(year, month, child))"
              :is-show="showChild(year, month, child)"
              class-name="vux-calendar-each-date"
              name="each-day">
              <span
                v-show="showChild(year, month, child)"
                :style="getMarkStyle(child)"
                class="vux-calendar-each-date">
                {{ replaceText(child.day, formatDate(year, month, child)) }}
                <span v-if="isShowTopTip(child)" :style="isShowTopTip(child, 'style')" class="vux-calendar-top-tip">
                  <span>{{ isShowTopTip(child, 'text') }}</span>
                </span>
              </span>
              <span v-if="isShowBottomDot(child)" class="vux-calendar-dot"/>
              <div v-show="showChild(year, month, child)" v-html="renderFunction(k1, k2, child)"/>
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import format from '../../tools/date/format'
  import { getDays, zero, isBetween, isBetweenRange, sortTime } from './util'
  import props from './props'
  import calendarMarksMixin from '../../mixins/calendar-marks'

  export default {
    name: 'InlineCalendar',
    mixins: [calendarMarksMixin],
    props: props(),
    data() {
      return {
        multi: false,
        year: 0,
        month: 0,
        days: [],
        today: format(new Date(), 'YYYY-MM-DD'),
        months: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        currentValue: '',
        viewChangeEventCount: -1
      }
    },
    computed: {
      _weeksList() { // eslint-disable-line
        if (this.weeksList && this.weeksList.length) {
          return this.weeksList
        }
        return ['日', '一', '二', '三', '四', '五', '六']
        // if (!this.weeksList || !this.weeksList.length) {
        //   // tip for older vux-loader
        //   if (typeof V_LOCALE === 'undefined') {
        //     if (process.env.NODE_ENV === 'development') {
        //       console.warn('[VUX warn] 抱歉，inline-calendar 组件需要升级 vux-loader 到最新版本才能正常使用')
        //     }
        //     return ['日', '一', '二', '三', '四', '五', '六']
        //   } else {
        //     if (V_LOCALE === 'en') { // eslint-disable-line
        //       return ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
        //     } else if (V_LOCALE === 'zh-CN') { // eslint-disable-line
        //       return ['日', '一', '二', '三', '四', '五', '六']
        //     } else if (V_LOCALE === 'MULTI') { // eslint-disable-line
        //       return [0, 0, 0, 0, 0, 0, 0]
        //     }
        //   }
        // }
      },
      _replaceTextList() {
        const rs = {}
        for (const i in this.replaceTextList) {
          rs[this.convertDate(i)] = this.replaceTextList[i]
        }
        return rs
      },
      currentYearMonth() {
        return this.year + this.month
      }
    },
    watch: {
      value(val) {
        this.currentValue = this.multi ? val : this.convertDate(val)
      },
      currentValue(val, oldVal) {
        this.$emit('input', this.currentValue)
        this.$emit('on-change', this.currentValue)

        if (this.renderOnValueChange) {
          // if on the same year+month, stay quiet
          if (val && oldVal && val.slice(0, 7) === oldVal.slice(0, 7)) {
            return
          }
          this.render(null, null, 'value change')
        }
      },
      renderFunction() {
        this.render(this.year, this.month, this.currentValue)
      },
      renderMonth(val) {
        if (val && val.length === 2) {
          this.render(val[0], val[1] - 1)
        }
      },
      returnSixRows() {
        this.render(this.year, this.month)
      },
      startDate() {
        this.render(this.year, this.month)
      },
      endDate() {
        this.render(this.year, this.month)
      },
      disablePast() {
        this.render(this.year, this.month)
      },
      disableFuture() {
        this.render(this.year, this.month)
      },
      currentYearMonth() {
        const lastLine = this.days[this.days.length - 1]
        const lastDate = lastLine[lastLine.length - 1]

        let days = []
        this.days.forEach(line => {
          days = days.concat(line)
        })
        days = days.filter(date => {
          return !date.isLastMonth && !date.isNextMonth
        })
        this.viewChangeEventCount++
        this.$emit('on-view-change', {
          year: this.year,
          month: this.month + 1,
          firstDate: this.days[0][0].formatedDate,
          lastDate: lastDate.formatedDate,
          firstCurrentMonthDate: days[0].formatedDate,
          lastCurrentMonthDate: days[days.length - 1].formatedDate,
          allDates: this.days
        }, this.viewChangeEventCount)
      }
    },
    created() {
      this.currentValue = this.value
      this.multi = Object.prototype.toString.call(this.currentValue) === '[object Array]'

      if (this.multi) {
        for (let i = 0; i < this.currentValue.length; i++) {
          this.$set(this.currentValue, i, this.convertDate(this.currentValue[i]))
        }
      } else {
        this.currentValue = this.convertDate(this.currentValue)
      }

      this.render(this.renderMonth[0], this.renderMonth[1] - 1)
    },
    methods: {
      isShowTopTip (child, type) { // eslint-disable-line
        // type 分三种情况
        if (!type) {
          return this.currentValue.indexOf(this.formatDate(this.year, this.month, child)) > -1
        } else if (type === 'style') {

        } else if (type === 'text') {
          if (this.currentValue.length === 2 && this.currentValue[0] !== this.currentValue[1]) {
            const sorted = sortTime(this.currentValue)
            const index = sorted.indexOf(this.formatDate(this.year, this.month, child))

            return index === 0 ? '开始' : '结束'
          }
        }
      },
      processDateItem(item) {
        const temp = JSON.parse(JSON.stringify(item))
        temp.isDisabled = this.isDisabled(item)
        temp.isBetween = this.isBetween(item.formatedDate)
        return temp
      },
      isBetween(formatedDate) {
        return isBetween(formatedDate, this.disablePast, this.disableFuture, this.startDate, this.endDate)
      },
      isDisabled(date) {
        let disabled = !this.isBetween(date.formatedDate)
        disabled = disabled || (date.isWeekend && this.disableWeekend)
        disabled = disabled || date.isNextMonth || date.isLastMonth

        if (!this.disableDateFunction) {
          return disabled
        } else {
          const value = this.disableDateFunction(date)
          if (typeof value === 'undefined') {
            return disabled
          } else {
            return value
          }
        }
      },
      switchViewToToday() {
        const today = new Date()
        this.render(today.getFullYear(), today.getMonth())
      },
      switchViewToCurrentValue() {
        if (!this.currentValue || (this.multi && !this.currentValue.length)) {
          return
        }

        let value
        if (typeof this.currentValue === 'string') {
          value = this.currentValue
        } else {
          value = this.currentValue[0]
        }
        const splitList = value.split('-')
        const year = parseInt(splitList[0], 10)
        const month = parseInt(splitList[1], 10)
        this.switchViewToMonth(year, month)
      },
      switchViewToMonth(year, month) {
        if (!year || !month) {
          this.switchViewToToday()
        } else {
          this.render(year, month - 1)
        }
      },
      getDates() {
        return this.days
      },
      replaceText(day, formatDay) {
        const text = this._replaceTextList[formatDay]
        if (!text && typeof text === 'undefined') {
          return day
        } else {
          return text
        }
      },
      convertDate(date) {
        return date === 'TODAY' ? this.today : date
      },
      buildClass(index, child) {
        let isCurrent = false
        let isBetween2 = false
        if (!child.isLastMonth && !child.isNextMonth) {
          if (this.multi && this.currentValue.length > 0) {
            isCurrent = this.currentValue.indexOf(this.formatDate(this.year, this.month, child)) > -1
            if (this.currentValue.length === 2) {
              isBetween2 = isBetweenRange(this.formatDate(this.year, this.month, child), this.currentValue)
            }
          } else {
            isCurrent = this.currentValue === this.formatDate(this.year, this.month, child)
          }
        }
        const className = {
          'current': isCurrent,
          'is-between': isBetween2,
          'is-disabled': this.isDisabled(child),
          'is-today': child.isToday,
          [`is-week-${index}`]: true
        }
        return className
      },
      render(year, month, force = false) {
        let data = null
        const value = this.multi ? this.currentValue[this.currentValue.length - 1] : this.currentValue
        data = getDays({
          year: year,
          month: month,
          value,
          rangeBegin: this.convertDate(this.startDate),
          rangeEnd: this.convertDate(this.endDate),
          returnSixRows: this.returnSixRows,
          disablePast: this.disablePast,
          disableFuture: this.disableFuture
        })

        if (this.year === data.year && this.month === data.month && !force) {
          return
        }
        this.year = data.year
        this.month = data.month
        this.days = data.days
      },
      formatDate: (year, month, child) => {
        return [year, zero(child.month + 1), zero(child.day)].join('-')
      },
      prev() {
        if (this.month === 0) {
          this.month = 11
          this.year = this.year - 1
        } else {
          this.month = this.month - 1
        }
        this.render(this.year, this.month, true)
      },
      next() {
        if (this.month === 11) {
          this.month = 0
          this.year = this.year + 1
        } else {
          this.month = this.month + 1
        }
        this.render(this.year, this.month, true)
      },
      go(year, month) {
        this.render(year, month, true)
      },
      select(k1, k2, data) {
        if (data.isLastMonth && !this.showLastMonth) {
          return
        }
        if (data.isNextMonth && !this.showNextMonth) {
          return
        }
        if (!this.isBetween(data.formatedDate)) {
          return
        }

        if (this.isDisabled(data)) {
          // not in range
          if (!this.isBetween(data.formatedDate)) {
            return
          } else { // in range but disabled by disableDateFunction
            if (this.disableDateFunction && this.disableDateFunction(data)) {
              return
            }
            if (data.isWeekend && this.disableWeekend) {
              return
            }
          }
        }
        let _currentValue = null // eslint-disable-line
        if (!data.isLastMonth && !data.isNextMonth) {
          this.days[k1][k2].current = true
          _currentValue = [this.year, zero(this.month + 1), zero(this.days[k1][k2].day)].join('-')
        } else {
          _currentValue = [data.year, zero(data.month + 1), zero(data.day)].join('-')
        }
        if (this.multi) {
          const index = this.currentValue.indexOf(_currentValue)
          if (index > -1) {
            this.currentValue.splice(index, 1)
          } else {
            if (this.currentValue.length >= 2) {
              this.currentValue = []
            }
            this.currentValue.push(_currentValue)
          }
        } else {
          this.currentValue = _currentValue
        }

        if (this.multi) {
          for (let i = 0; i < this.currentValue.length; i++) {
            this.$set(this.currentValue, i, this.convertDate(this.currentValue[i]))
          }
        } else {
          this.currentValue = this.convertDate(this.currentValue)
        }

        if (this.renderOnValueChange) {
          this.render(null, null)
        }
      },
      showChild(year, month, child) {
        if (this.replaceText(child.day, this.formatDate(year, month, child))) {
          return (!child.isLastMonth && !child.isNextMonth) || (child.isLastMonth && this.showLastMonth) || (child.isNextMonth && this.showNextMonth)
        } else {
          return false
        }
      }
    }
  }
</script>

<style lang="less">
  @import '../../styles/variable.less';

  .current {
    background-color: #ff6b23;
  }

  .is-between {
    background-color: rgba(255, 107, 35, 0.7);
  }

  .calendar-year > span,
  .calendar-month > span {
    position: absolute;
    top: 0;
    left: 0;
    display: inline-block;
    padding: 8px;
    width: 24px;
    height: 24px;
  }

  .calendar-year > span.calendar-header-right-arrow,
  .calendar-month > span.calendar-header-right-arrow {
    left: auto;
    right: 0;
  }

  .vux-prev-icon,
  .vux-next-icon {
    position: absolute;
    left: 0;
    top: 15px;
    display: inline-block;
    width: 12px;
    height: 12px;
    border: 1px solid @calendar-arrow-color;
    border-radius: 0;
    border-top: none;
    border-right: none;
    transform: rotate(45deg);
    margin-left: 15px;
    line-height: 40px;
  }

  .vux-next-icon {
    transform: rotate(-135deg);
    left: auto;
    top: 14px;
    right: 15px;
  }

  .is-weekend-highlight td.is-week-list-0,
  .is-weekend-highlight td.is-week-list-6,
  .is-weekend-highlight td.is-week-0,
  .is-weekend-highlight td.is-week-6 {
    color: @calendar-highlight-color;
  }

  .inline-calendar a {
    text-decoration: none;
    tap-highlight-color: rgba(0, 0, 0, 0); // stylelint-disable-line
  }

  .calendar-year,
  .calendar-month {
    position: relative;
  }

  .calendar-header {
    line-height: 40px;
    font-size: 1.2em;
    overflow: hidden;
  }

  .calendar-header > div {
    float: left;
    width: 50%;
    text-align: center;
    overflow: hidden;
  }

  .calendar-header span:last-of-type {
    float: right;
    vertical-align: bottom;
  }

  .switch-btn,
  .calendar-title {
    display: inline-block;
    border-radius: 4px;
    line-height: 30px;
  }

  .switch-btn {
    width: 30px;
    margin: 5px;
    color: #39b5b8;
    font-family: "SimSun"; // stylelint-disable-line
  }

  .calendar-title {
    padding: 0 6%;
    color: #333;
  }

  .switch-btn:active,
  .calendar-title:active,
  .calendar-header a.active {
    background-color: #39b5b8;
    color: #fff;
  }

  .calendar-week {
    overflow: hidden;
  }

  .calendar-week span {
    float: left;
    width: 14.28%;
    font-size: 1.6em;
    line-height: 34px;
    text-align: center;
  }

  .inline-calendar {
    width: 100%;
    background-color: @calendar-bg-color;
    border-radius: 2px;
    transition: all 0.5s ease;
  }

  .inline-calendar td.is-today,
  .inline-calendar td.is-today.is-disabled {
    color: @calendar-today-font-color;
  }

  .calendar-enter,
  .calendar-leave-active {
    opacity: 0;
    transform: translate3d(0, -10px, 0);
  }

  .calendar::before {
    position: absolute;
    left: 30px;
    top: -10px;
    content: "";
    border: 5px solid rgba(0, 0, 0, 0);
    border-bottom-color: #dedede;
  }

  .calendar::after {
    position: absolute;
    left: 30px;
    top: -9px;
    content: "";
    border: 5px solid rgba(0, 0, 0, 0);
    border-bottom-color: #fff;
  }

  .inline-calendar table {
    clear: both;
    width: 100%;
    border-collapse: collapse;
    color: #444;
  }

  .inline-calendar td {
    padding: 5px 0;
    text-align: center;
    vertical-align: middle;
    font-size: @calendar-date-item-font-size;
    position: relative;
  }

  .inline-calendar td.week {
    pointer-events: none !important;
    cursor: default !important;
  }

  .inline-calendar td.is-disabled {
    color: @calendar-disabled-font-color;
  }

  .inline-calendar td > span.vux-calendar-each-date {
    position: relative;
    display: inline-block;
    width: @calendar-each-date-item-size;
    height: @calendar-each-date-item-size;
    line-height: @calendar-each-date-item-line-height;
    border-radius: 50%;
    text-align: center;
    border: 1px solid transparent;
    box-sizing: border-box;
  }

  .inline-calendar td.current > span.vux-calendar-each-date {
    // background-color: @calendar-selected-bg-color;
    background-color: #ff6b23;
    color: #fff !important;
  }

  .inline-calendar th {
    color: @calendar-header-day-item-color;
    font-weight: normal;
  }

  /**  same as week-calendar style  **/
  .vux-calendar-top-tip {
    position: absolute;
    left: -10px;
    top: 0;
    font-size: 20px;
    transform: scale(0.5);
    transform-origin: top left;
  }

  .vux-calendar-dot {
    display: block;
    text-align: center;
    width: 5px;
    height: 5px;
    position: absolute;
    left: 50%;
    bottom: 0;
    margin-left: -2.5px;
    background-color: #f74c31;
    border-radius: 50%;
  }
</style>
