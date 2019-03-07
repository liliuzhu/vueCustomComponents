import {mapGetters} from 'vuex'

export default {
  computed: {...mapGetters(['permissions'])},
  mounted() {
    console.log(this.$route)
  },
  methods: {
    checkPermissions(permission = null) {
      return !permission || this.permissions.indexOf(permission) !== -1
    }
  }
}
