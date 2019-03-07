export default {
  path: '/dashboard',
  name: 'Dashboard',
  icon: 'el-icon-menu',
  children: [
    {
      path: '/analysis',
      name: '分析页',
    },
    {
      path: '/monitor',
      name: '监控页',
    },
    {
      path: '/workplace',
      name: '工作台',
    },
    {
      path: '/analysis?target=_blank',
      name: '新开标签页',
    }
  ]
}
