<template>
  <div v-bind="$attrs" :style="{'width':width}" class="table_title">
    <table v-if="type ==='row'" class="row_container">
      <tableTitleColgroup/>
      <div class="table_title_group">
        <tableTitleHeader/>
        <tableTitleBody/>
      </div>
    </table>
    <div v-else class="column_container">
      <slot/>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import tableTitleColgroup from './tableTitleColgroup'
  import tableTitleHeader from './tableTitleHeader'
  import tableTitleBody from './tableTitleBody'

  let tableTitleIdSeed = 1
  export default {
    name: 'TableTitle',
    components: {
      tableTitleHeader, tableTitleBody, tableTitleColgroup
    },
    props: {
      width: {
        type: String,
        default: ''
      },
      data: {
        type: Object,
        required: true
      },
      type: {
        type: String,
        default: 'row'
      }
    },
    data() {
      return {
        titleColumns: []
      };
    },
    computed: {
      tableData() {
        return this.data
      },
      columns() {
        return this.titleColumns;
      }
    },
    created() {
      this.tableTitleIdSeed = `table-title_${tableTitleIdSeed++}`
      this.titleColumns = this.$slots.default.filter(column => {
        return column.tag
      })
    }
  }
</script>
<style rel="stylesheet/css" type="text/css" lang="scss">
  @import "tableTitle";
</style>
