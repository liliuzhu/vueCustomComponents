<script type="text/ecmascript-6">
    export default {
        name: "scoped-slot",
        data() {
            return {};
        },
        created() {
            this.$options.render = h => h('div', this.renderNode)
        },
        props: {
            renderNode: {
                type: Array,
                required: true
            }
        }
    };
</script>
