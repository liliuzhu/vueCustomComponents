const menuRule = require.context('../', true, /^\.\/(pages|views)(\/[\w.-]+)?\/menu.(js|ts)$/)

const menuConfig = (r => {
  return r.keys().map(key => r(key).default)
})(menuRule)
// 非组件父级路由
const mConfig = menuConfig.reduce((pre, next) => {
  return pre.concat(next)
}, []).sort((a, b) => {
  const weightA = a.weight || 0
  const weightB = b.weight || 0
  return weightB - weightA
})

export const AsideMenuConfig = [
  {
    path: '/',
    name: '首页',
    icon: 'rc-icon-home',
  }
]

export default AsideMenuConfig.concat(mConfig)
