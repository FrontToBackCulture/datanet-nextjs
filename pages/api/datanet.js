import axios from 'axios'

const host = process.env.NEXT_PUBLIC_MINIAPP_HOST
const api = process.env.NEXT_PUBLIC_MINIAPP_API

export async function dataNetMerge(params) {
  const config = {
    method: 'post',
    url: `${host}/${api}/merge`,
    headers: {},
    data: params,
  }
  return axios(config).then((res) => res)
}

export async function dataNetPerformCalc(params) {
  const config = {
    method: 'post',
    url: `${host}/${api}/performCalc`,
    headers: {},
    data: params,
  }
  return axios(config).then((res) => res)
}

export async function dataNetConvert2MultiSeries(params) {
  const config = {
    method: 'post',
    url: `${host}/${api}/convert2MultiSeries`,
    headers: {},
    data: params,
  }
  return axios(config).then((res) => res)
}
