<template>
  <div class="rc-tabs">
    <el-tabs
      :value="currentTab"
      @tab-click="onTabClick"
      @tab-remove="onTabRemove">
      <el-tab-pane
        class="rc-tabs__no-close"
        label="首页"
        name="home"/>
      <el-tab-pane
        v-for="(tab, index) in tabs"
        :label="tab.label"
        :name="tab.name"
        :key="'tab' + index"
        closable/>
    </el-tabs>
    <el-dropdown @command="onCommand">
      <span class="el-dropdown-link">
        <i class="rc-icon-tool el-icon--right"/>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="closeAll">关闭所有</el-dropdown-item>
        <el-dropdown-item command="closeOther">关闭其它</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
  import {mapState, mapGetters, mapMutations} from 'vuex'
  export default {
    name: 'RcTabs',
    computed: {
      ...mapState({
        current: state => state.tabs.currentTab
      }),
      ...mapGetters({
        tabs: 'getTabs'
      }),
      currentTab: {
        get () {
          return this.current
        },
        set (val) {
          this.selectTab(val)
        }
      }
    },
    methods: {
      ...mapMutations({
        selectTab: 'rcMaterialsTabsCurrentTab',
        deleteTab: 'rcMaterialsTabsDeleteTab',
        commandTab: 'rcMaterialsTabsToolCommand'
      }),
      onTabClick (tab) {
        const name = tab.name
        // 如果当前 tab 是当前tab 不进行路由刷新
        if (this.$route.name === name) {
          return
        }
        // 如果是首页 直接调首页 因为首页是默认的
        if (name === 'home') {
          this.$router.push('/')
          return
        }
        const currentTab = this.tabs.filter(item => item.name === name)[0]
        currentTab && this.$router.push(currentTab.fullPath)
      },
      onTabRemove (tab) {
        // this.$bus.$emit('$rcTabClose', ['close', tab])
        this.deleteTab({value: tab, vm: this})
      },
      // 处理更多操作
      onCommand (command) {
        // this.$bus.$emit('$rcTabClose', [command, this.current])
        this.commandTab({value: command, vm: this})
      }
    }
  }
</script>
<style lang="scss">
  @include b(tabs) {
    position: relative;
    padding: 0 12px;
    background-color: #fff;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.09);

    @include e(no-close) {
      i.el-icon-close {
        display: none;
      }
    }

    .el-tabs {
      padding-right: 30px;
    }

    .el-dropdown {
      text-align: center;
      position: absolute;
      top: 50%;
      right: 12px;
      transform: translateY(-50%);
    }

    .el-dropdown-link {
      cursor: pointer;
    }

    .el-tabs__header {
      margin: 0;
    }

    .el-tabs__item {
      font-weight: normal;
      font-size: 12px;

      @include user-select(none);

      &:focus.is-active.is-focus:not(:active) {
        box-shadow: none;
        border-radius: 3px;
      }
    }

    .el-tabs__item.is-active {
      color: $primary;
    }

    .el-tabs__nav-wrap::after {
      height: 1px;
      background-color: #f1f1f1;
    }
  }
</style>
