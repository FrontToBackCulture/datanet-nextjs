import axios from 'axios';

const host = process.env.NEXT_PUBLIC_MINIAPP_HOST
const api = process.env.NEXT_PUBLIC_MINIAPP_API

export async function insert2VAL(params) {
  const config = {
    method: 'post',
    url: `${host}/${api}/insert2VAL`,
    headers: {},
    data: params,
  };

  return axios(config).then((res) => res);
}

export async function readVAL(params) {
  const config = {
    method: 'post',
    url: `${host}/${api}/readVAL`,
    headers: {},
    data: params,
  };
  return axios(config).then((res) => res);
}
