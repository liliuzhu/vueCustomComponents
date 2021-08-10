export default {
  global: [
    {
      name: 'Calendar',
      path: '/development/calendar',
      component: () => import(/* webpackChunkName: "CalendarExample" */'./src/CalendarExample'),
      meta: {
        title: '移动端日期组件',
        isMenu: true
      }
    }
  ]
}
