<template>
  <div class="rc-content">
    <Tabs/>
    <div class="rc-content__wrapper" >
      <transition
        name="fade"
        mode="out-in">
        <rc-cache :include="getTabKeepAliveInclude">
          <!-- 这里指定了 key 会导致 render 热更新时白屏 是已知 vue 的bug 占时没法解决 之后看有没有别的方案 :key="$route.fullPath" -->
          <!-- 临时解决方案 可以开发的时候 放开 不缓存 之后在开启就可以 -->
          <router-view :key="$route.fullPath"/>
        </rc-cache>
      </transition>
    </div>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import Tabs from './Tabs.vue'
  import Cache from './cache'
  export default {
    name: 'RcContent',
    components: {
      Tabs,
      RcCache: Cache
    },
    computed: {
      ...mapGetters({
        getTabKeepAliveInclude: 'getTabKeepAliveInclude'
      })
    }
  }
</script>
<style lang="scss">
  @include b(content) {
    width: auto;
    min-width: 500px;
    position: absolute;
    left: $side-bar-width;
    right: 0;
    top: 65px;
    bottom: 0;
    overflow: hidden;
    transition: left $side-bar-animate;

    @include e(wrapper) {
      position: absolute;
      left: 0;
      right: 0;
      top: 40px;
      bottom: 0;
      overflow: auto;
      transition: all 0.2s ease;
      will-change: scroll-position;
      backface-visibility: hidden;
      -webkit-overflow-scrolling: touch;
    }
  }
</style>
