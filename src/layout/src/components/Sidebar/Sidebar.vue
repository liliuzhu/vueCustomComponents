<template>
  <el-scrollbar
    :class="[
      isCollapse ? 'rc-sidebar--collapse' : ''
    ]"
    class="rc-sidebar">
    <div
      v-if="!isCollapse"
      class="rc-sidebar__logo">
      <img
        src="../assets/logo.png"
        width="65">
      <h1 class="site-name">CRM ADMIN</h1>
    </div>
    <div
      v-else
      class="rc-sidebar__logo" >
      <img
        src="../assets/mini-logo.png"
        width="30">
    </div>
    <Menu :rules="rules"/>
  </el-scrollbar>
</template>
<script>
  import { mapState, mapGetters } from 'vuex'
  import AsideMenuConfig from '@rrc-materials/menu-config'
  import Menu from './menu'
  export default {
    name: 'RcSidebar',
    components: {
      Menu
    },
    data () {
      return {
        AsideMenuConfig
      }
    },
    provide () {
      return {
        rcSlidebar: this
      }
    },
    computed: {
      ...mapState({
        isCollapse: state => state.slidebar.isMenuAsideCollapse
      }),
      ...mapGetters({
        rules: 'permissions'
      })
    }
  }
</script>

<style lang="scss">
  $select-bg: $nav-select-bg;

  %icon {
    i.rc-sidebar-icon {
      color: $primary;
    }
  }

  %hidemenu {
    display: none;
  }

  // 兼容 我们自己的icon 图标
  .el-menu-item [class^="rc-icon-"],
  .el-submenu [class^="rc-icon-"] {
    vertical-align: middle;
    margin-right: 5px;
    width: 24px;
    text-align: center;
    font-size: 18px;
  }

  @include b(sidebar) {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    z-index: 1001;
    overflow: hidden;
    height: 100%;
    background-color: $nav-bg;
    box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
    width: $side-bar-width;
    transition: width $side-bar-animate ease-in;

    @include m(collapse) {
      width: $side-bar-width-mini !important;

      .el-menu-item {
        span {
          @extend %hidemenu;
        }

        &.is-active {
          /*  display: none;  */
        }
      }

      .el-submenu__title {
        span {
          @extend %hidemenu;
        }
      }

      .rc-sidebar__logo {
        transition: all $side-bar-animate;
      }
    }

    @include e(logo) {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 64px;
      line-height: 64px;
      background: $primary;
      color: #fff;
      text-align: center;
      font-size: 24px;
      font-weight: 600;
      overflow: hidden;

      .site-name {
        margin-left: 10px;

        @include text-overflow-1;
      }
    }

    @include e(menu) {
      padding-top: 16px;
    }

    .el-scrollbar__wrap {
      overflow-x: hidden;
      overflow-y: auto;
    }

    .el-menu {
      background-color: $nav-bg;
      width: 100% !important;
      border: 0;
      transition: height $side-bar-animate ease-in;

      .el-menu-item,
      .el-submenu__title {
        color: #fff;
        font-size: 13px;
        transition: background-color $side-bar-animate linear;

        span {
          font-size: 14px;
        }

        &:hover,
        &:focus {
          outline: none;
          background-color: rgba($select-bg, 0.38);
        }

        // 选中状态
        @include when(active) {
          background-color: $select-bg;
          color: $primary;
          position: relative;

          @extend %icon;

          &::after {
            content: "";
            height: 100%;
            width: 3px;
            position: absolute;
            top: 0;
            left: 0;
            background-color: $primary;
          }
        }
      }
    }

    // 收起菜单时 弹出菜单
    @include e(menu-popper) {
      .el-menu-item,
      .el-submenu__title {
        @include when(active) {
          background-color: $select-hover-background;
          color: $primary;
        }
      }
    }
  }
</style>
