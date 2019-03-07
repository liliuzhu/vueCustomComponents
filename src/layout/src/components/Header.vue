<template>
  <header class="rc-header">
    <div
      class="rc-header__tool"
      @click="onToggleCollapse" >
      <i :class="[isMenuAsideCollapse ? 'rc-icon-packup' : 'rc-icon-un']"/>
    </div>
    <div class="rc-header__profile-container">
      <div class="rc-header__profile-content">
        <div class="rc-header__menu-icons">
          <!--<span class="rc-header__menu-icon"><i class="el-icon-search icon"/></span>-->
          <!--<span class="rc-header__menu-icon"><i class="el-icon-message icon"/></span>-->
          <!--<span class="rc-header__menu-icon">-->
          <!--<el-badge-->
          <!--is-dot-->
          <!--class="item">-->
          <!--<i class="el-icon-bell icon"/>-->
          <!--</el-badge>-->
          <!--</span>-->
        </div>
        <el-dropdown>
          <div class="rc-header__profile-body">
            <img
              class="user-avatar"
              src="https://gw.alipayobjects.com/zos/rmsportal/eHBsAsOrrJcnvFlnzNTT.png">
            <span class="user-name">{{currentUserName}}</span>
          </div>
          <el-dropdown-menu
            slot="dropdown"
            class="user-dropdown">
            <router-link to="/">
              <el-dropdown-item>
                首页
              </el-dropdown-item>
            </router-link>
            <!--<router-link to="/">-->
            <!--<el-dropdown-item>-->
            <!--个人设置-->
            <!--</el-dropdown-item>-->
            <!--</router-link>-->
            <el-dropdown-item>
              <span style="display:block;"><a :href="logoutUrl" style="font-size: 14px; color: initial;">退出</a></span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </header>
</template>
<script>
  import { mapState, mapMutations } from 'vuex'
  import Watermark from '@rrc/watermark'
  export default {
    name: 'RcHeader',
    data() {
      return {
        logoutUrl: JSON.parse(process.env.CLIENT).logoutUrl
      }
    },
    computed: {
      ...mapState({
        isMenuAsideCollapse: state => state.slidebar.isMenuAsideCollapse,
        currentUserName: state => (state.userInfo && state.userInfo.name) || '人人车'
      })
    },
    mounted() {
      let fontSize = 20 // 字体大小
      let rotateDegree = 30 * Math.PI / 180 // 角度(0-360)
      let cos = Math.cos(rotateDegree) // 余弦
      let sin = Math.sin(rotateDegree) // 正弦
      let diagonal = this.currentUserName.length * fontSize + 100 // 对角线
      let height = Math.ceil(diagonal * sin)
      let width = Math.ceil(diagonal * cos)
      let minVal = {w: 174, h: 100} // 最小值
      new Watermark().init({
        text: this.currentUserName,
        font: `${fontSize}px Times New Roman`, // 字体
        rotateDegree: rotateDegree, // 旋转角度
        width: width > minVal.w ? width : minVal.w, // 宽
        height: height > minVal.w ? height : minVal.w // 高
      })
    },
    methods: {
      ...mapMutations({
        onToggleCollapse: 'rcMaterialsMenuAsideCollapse'
      })
    }
  }
</script>
<style lang="scss">
  @include b(header) {
    background-color: #fff;
    height: $header-height;
    min-width: 500px;
    // box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    border-bottom: 1px solid rgba(0, 21, 41, 0.08);
    position: relative;

    @include e(tool) {
      position: absolute;
      left: 8px;
      cursor: pointer;
      display: flex;
      transition: all 0.3s, padding 0s;
      padding: 24px;
      font-size: 20px;

      @include pseudo(hover) {
        background-color: $select-hover-background;
        color: $primary;
      }
    }

    @include e(profile-container) {
      position: absolute;
      right: 20px;
      display: flex;
    }

    @include e(profile-content) {
      display: flex;
      padding: 20px 0;
      cursor: pointer;
    }

    @include e(menu-icons) {
      display: flex;
      align-items: center;
    }

    @include e(menu-icon) {
      padding: 0 12px;

      .icon {
        display: inline-block;
        font-size: 18px;
        text-align: center;
      }
    }

    @include e(profile-body) {
      position: relative;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding-right: 14px;

      .user-avatar {
        width: 24px;
        height: 24px;
        margin: 0 8px 0 12px;
        border-radius: 4px;
      }

      .user-name {
        color: rgba(0, 0, 0, 0.65);
      }

      .user-department {
        font-size: 12px;
        color: rgba(102, 102, 102, 0.65);
      }
    }
  }

  @include is-windows {
    @include b(header) {
      border-bottom: 1px solid rgba(0, 21, 41, 0.13);
    }
  }
</style>
