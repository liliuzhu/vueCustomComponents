const { requestPromiseNative, Log } = require('@anejs/anne-utils')

module.exports = async function sendNotify (receiver, content) {
  const options = {
    uri: `http://notify.shanyishanmei.com/api/dingtalk/message/send`,
    headers: {
      'X-TOKEN': 'cc584d1f411c2821eb9a459d29dfa237'
    },
    qs: {
      receiver,
      content
    },
    json: true
  }
  const res = await requestPromiseNative(options)
  if (res.status !== 0) {
    Log.error(res)
  }
}
