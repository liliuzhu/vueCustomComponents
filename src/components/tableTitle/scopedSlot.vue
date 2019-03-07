<script type="text/ecmascript-6">
  export default {
    name: 'ScopedSlot',
    props: {
      renderNode: {
        type: Array,
        required: true
      }
    },
    data() {
      return {}
    },
    created() {
      this.$options.render = h => h('div', this.renderNode)
    }
  }
</script>
