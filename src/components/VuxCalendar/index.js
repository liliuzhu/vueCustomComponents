import calendar from './components/calendar'

calendar.install = function (Vue) {
  if (this.install.installed) {
    return
  }

  this.install.installed = true
  Vue.component(calendar.name, calendar)
}
export default calendar
