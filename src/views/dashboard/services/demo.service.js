import Http from '@rrc/http'

export function getList (params) {
  return Http.get('list', params)
}

/**
 *
 * 获取城市
 * @export
 * @param {*} parmas
 * @returns
 */
export async function getCity (parmas) {
  const res = await Http.get('city', parmas)
  return res.data
}

/**
 *
 * 获取客服列表
 * @export
 * @returns
 */
export async function getCcList () {
  const res = await Http.get('cc')
  return res.data
}
