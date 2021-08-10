<template>
  <div>
    123
    <!--<rc-button @click="toggle">vuxCalendar-toggle</rc-button>-->
    <el-button @click="toggle">vuxCalendar-toggle</el-button>
    <vux-calendar v-model="period" :visible.sync="show" :display-format="func" title="" @on-change="onPeriodChange" @on-hide="onCalendarHide"/>
  </div>
</template>
<script type="text/ecmascript-6">
  import VuxCalendar from '@/components/VuxCalendar'
  import format from '@/components/VuxCalendar/tools/date/format'

  export default {
    name: 'CalendarExample',
    components: {VuxCalendar},
    data() {
      return {
        // 时间段
        period: [
          this.getToday(),
          this.getToday(),
        ],
        show: false
      }
    },
    methods: {
      getToday () {
        return format(new Date(), 'YYYY-MM-DD')
      },
      // 空函数
      func () {
      },
      toggle() {
        this.show = !this.show
      },
      onPeriodChange (val) {
        console.log(1, val)
      },
      onCalendarHide (val) {
        // 加个相同判断
        console.log(2, val)
      }
    }
  }
</script>
<style rel="stylesheet/css" type="text/css" lang="scss">

</style>
