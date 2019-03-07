import Analysis from './src/analysis.vue'

export default {
  tabs: [
    {
      name: 'dashboardAnalysis',
      path: '/dashboard/analysis',
      component: Analysis,
      meta: {
        title: '分析页',
        rule: 'analysis',
        isMenu: true
      }
    },
    {
      name: 'dashboardMonitor',
      path: '/dashboard/monitor',
      component: () => import(/* webpackChunkName: "dashboard" */'./src/monitor'),
      meta: {
        title: '监控页',
        rule: 'monitor',
        isMenu: true,
        keepAlive: true,
      }
    },
    {
      name: 'dashboardWorkplace',
      path: '/dashboard/workplace',
      component: () => import(/* webpackChunkName: "dashboard" */'./src/workplace.vue'),
      meta: {
        title: '工作台',
        rule: 'workplace',
        isMenu: true
      }
    },
    {
      name: 'dashboardDetail',
      path: '/dashboard/detail/:id',
      component: () => import(/* webpackChunkName: "dashboard" */'./src/detail.vue'),
      meta: {
        title (to) {
          return `详情页-${to.params.id}`
        },
        rule: 'detail'
      }
    }
  ]
}
