export default {
  tabs: [
    {
      name: 'home',
      path: '/',
      component: () => import(/* webpackChunkName: "home" */'./src/home.vue'),
      meta: {
        title: '首页',
        isMenu: true,
      }
    }
  ],
  global: [
    {
      name: 'login',
      path: '/login',
      component: () => import(/* webpackChunkName: "home" */'./src/login')
    }
  ]
}
