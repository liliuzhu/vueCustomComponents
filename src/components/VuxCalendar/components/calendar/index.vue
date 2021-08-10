<template>
  <div class="vux-calendar">
    <div class="vux-cell" @click="onClick"/>
    <div v-transfer-dom="shouldTransferDom">
      <popup
        v-model="show"
        @on-show="onPopupShow"
        @on-hide="onPopupHide">

        <popup-header
          v-if="shouldConfirm"
          :title="popupHeaderTitle"
          left-text="取消"
          right-text="确定"
          @on-click-left="onClickLeft"
          @on-click-right="onClickRight"/>
        <slot name="popup-before-calendar"/>
        <inline-calendar
          v-model="currentValue"
          :render-month="renderMonth"
          :start-date="startDate"
          :end-date="endDate"
          :show-last-month="showLastMonth"
          :show-next-month="showNextMonth"
          :highlight-weekend="highlightWeekend"
          :return-six-rows="returnSixRows"
          :hide-header="hideHeader"
          :hide-week-list="hideWeekList"
          :replace-text-list="replaceTextList"
          :weeks-list="weeksList"
          :render-function="renderFunction"
          :render-on-value-change="renderOnValueChange"
          :disable-past="disablePast"
          :disable-future="disableFuture"
          :marks="marks"
          :disable-weekend="disableWeekend"
          :disable-date-function="disableDateFunction"
          @on-change="onCalendarValueChange"
        />

      </popup>
    </div>
  </div>
</template>

<script>
  import InlineCalendar from '../inline-calendar'
  import Popup from '../popup'
  import props from '../inline-calendar/props'
  import TransferDom from '../../directives/transfer-dom'
  import PopupHeader from '../popup-header'
  import format from '../../tools/date/format'

  const getType = (value) => {
    if (typeof value === 'string') {
      return 'string'
    }
    if (Object.prototype.toString.call(value) === '[object Array]') {
      return 'array'
    }
    return ''
  }

  const pure = function (value) {
    const type = getType(value)
    if (type === 'string') {
      return value
    } else if (type === 'array') {
      return JSON.parse(JSON.stringify(value))
    }
    return ''
  }

  const Props = {
    ...props(),
    placeholder: String,
    showPopupHeader: Boolean,
    popupHeaderTitle: String,
    displayFormat: {
      type: Function,
      default: (value) => {
        return typeof value === 'string' ? value : value.join(', ')
      }
    },
    // for test only
    shouldTransferDom: {
      type: Boolean,
      default: true
    },
    readonly: Boolean
  }

  export default {
    name: 'VuxCalendar',
    directives: {
      TransferDom
    },
    components: {
      InlineCalendar,
      Popup,
      PopupHeader,
      // Cell
    },
    props: Props,
    data() {
      return {
        show: false,
        currentValue: ''
      }
    },
    computed: {
      shouldConfirm() {
        return this.showPopupHeader || this.getType(this.value) === 'array'
      },
      shouldShowPlaceholder() {
        if (typeof this.value === 'string' && !this.value) {
          return true
        }
        if (getType(this.value) === 'array' && !this.value.length) {
          return true
        }
        return false
      }
    },
    watch: {
      value(newVal, oldVal) {
        if (this.getType(this.value) === 'string') {
          this.currentValue = newVal
          this.$emit('on-change', newVal)
        } else {
          if (JSON.stringify(newVal) !== JSON.stringify(oldVal)) {
            this.$emit('on-change', pure(newVal))
          }
          this.currentValue = pure(newVal)
        }
      },
    },
    created() {
      if (this.value === 'TODAY') {
        this.currentValue = format(new Date(), 'YYYY-MM-DD')
        this.$emit('input', this.currentValue)
      } else {
        if (this.getType(this.value) === 'string') {
          this.currentValue = this.value
        } else {
          this.currentValue = pure(this.value)
        }
      }
    },
    methods: {
      onPopupShow() {
        this.$emit('on-show')
      },
      onPopupHide() {
        this.$emit('on-hide')
        // reset value to show value
        this.currentValue = pure(this.value)
      },
      getType,
      onClickLeft() {
        this.show = false
        this.currentValue = pure(this.value)
      },
      onClickRight() {
        this.show = false
        const value = pure(this.currentValue)
        this.$emit('input', value)
      },
      onClick() {
        if (!this.readonly) {
          this.show = true
        }
      },
      onCalendarValueChange(val) {
        if (!this.shouldConfirm) {
          this.show = false
          this.$emit('input', pure(val))
        }
      }
    }
  }
</script>

<style lang="less">
  .vux-calendar {
    position: relative;

    .vux-cell {
      padding: 10px 15px;
      position: relative;
    }
  }
</style>
