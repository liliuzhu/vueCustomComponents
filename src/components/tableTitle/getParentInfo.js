export default {
  data() {
    return {}
  },
  computed: {
    parent() {
      let parent = this.$parent
      while (parent && !parent.tableTitleIdSeed) {
        parent = parent.$parent
      }
      return parent
    },
    tableData() {
      return this.parent.tableData
    },
    columns() {
      return this.parent.columns
    }
  }
}
