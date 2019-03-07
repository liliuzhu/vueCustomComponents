<template>
  <div
    :class="[
      isCollapse ? 'rc-body--collapse' : ''
    ]"
    class="rc-body">
    <slot/>
  </div>
</template>
<script>
  import { mapState } from 'vuex'
  export default {
    name: 'RcBody',
    computed: {
      ...mapState({
        isCollapse: state => state.slidebar.isMenuAsideCollapse
      })
    }
  }
</script>
<style lang="scss">
  @include b(body) {
    min-height: 100vh;
    transition: margin-left $side-bar-animate;
    margin-left: $side-bar-width;
    background-color: $bg-color;

    @include m(collapse) {
      margin-left: $side-bar-width-mini !important;

      .rc-content {
        left: $side-bar-width-mini !important;
      }
    }
  }

  @include is-windows {
    @include b(body) {
      // window 把颜色亮度降低 百分之 8%
      background-color: #f0f0f0;
    }
  }
</style>
