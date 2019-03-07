export default {
  inject: ['rcSlidebar'],
  props: {
    // 用户权限列表
    rules: {
      type: Array,
      default () {
        return []
      }
    },
    // 当前选择菜单分组 用于过滤当前显示什么菜单
    group: {
      type: String
    }
  },
  data () {
    return {
      selected: 'rcMenu0',
    }
  },
  computed: {
    menuConfig () {
      // 过滤权限
      const filterRule = (menu) => {
        if (menu.rule) {
          return this.rules.indexOf(menu.rule) !== -1
        }
        return true
      }
      let menus = this.rcSlidebar.AsideMenuConfig
      if (this.group) {
        menus.filter(menu => menu.group === this.group)
      }

      // 这里会考虑代码简洁性  不考虑性能呢 反正以没多少菜单 就循环多次吧
      menus = menus.filter(menu => {
        if (menu.children) {
          // 孩子节点
          menu.children = menu.children.filter(childMenu => {
            childMenu.path = `${menu.path}${childMenu.path}`
            if (childMenu.children) {
              // 孙子节点
              childMenu.children = childMenu.children.filter(grandsonMenu => {
                grandsonMenu.path = `${childMenu.path}${grandsonMenu.path}`
                return filterRule(grandsonMenu)
              })
            }
            return filterRule(childMenu)
          })
        }
        return filterRule(menu)
      })
      return menus
    }
  },
  watch: {
    $route (to) {
      this.initSelected(to)
    }
  },
  created () {
    this.initSelected(this.$route)
  },
  methods: {
    renderChildItem (menu) {
      const {name, path, icon, children} = menu
      return (
        <el-submenu
          popper-class="rc-sidebar__menu-popper"
          index={name || path}>
          <template slot="title">
            {icon && (<i class={icon}></i>)}
            {name && (<span slot="title">{name}</span>)}
          </template>
          {
            this._l(children, (childMenu, childIndex) => {
              // 如果还有子级的话
              if (childMenu.children) {
                return this.renderChildItem(childMenu, childIndex)
              }
              // 处理path 加上子项
              return this.renderMenuItem(childMenu, childIndex)
            })
          }
        </el-submenu>
      )
    },
    renderMenuItem (menu) {
      const {path, icon, name} = menu
      return (
        <el-menu-item index={path}>
          {icon && (<i class={icon}></i>)}
          {name && (<span slot="title">{name}</span>)}
        </el-menu-item>
      )
    },
    onSelect (index) {
      // 在新标签打开
      if (index.indexOf('target=_blank') !== -1) {
        const link = document.createElement('a')
        link.setAttribute('href', index)
        link.setAttribute('target', '_blank')
        link.click()
        return
      }
      this.selected = index
      this.$router.push(index)
    },
    // 初始化选中状态
    initSelected (to) {
      const {meta, path} = to
      if (meta && meta.isMenu) {
        this.selected = path
      }
    }
  },
  render () {
    const rcSlideBar = this.rcSlidebar
    const data = {
      props: {
        'show-timeout': 200,
        'hide-timeout': 200,
        'default-active': this.selected,
        'unique-opened': true,
        collapse: rcSlideBar.isCollapse
      }
    }
    return (
      <el-menu
        onSelect={this.onSelect}
        class="rc-sidebar__menu"
        mode="vertical" {...data}>
        {
          this._l(this.menuConfig, (menu, index) => {
            if (menu.children) {
              // 这里这么 啰嗦是 在这里处理数据会导致重绘又不想在别的地方处理
              return this.renderChildItem(menu, index)
            }
            return this.renderMenuItem(menu, index)
          })
        }
      </el-menu>
    )
  },
}
