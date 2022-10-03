import axios from 'axios';

const host = process.env.NEXT_PUBLIC_MINIAPP_HOST;
const api = process.env.NEXT_PUBLIC_MINIAPP_API;

export async function clearCache(params) {
  const config = {
    method: 'post',
    url: `${host}/${api}/clearCache`,
    headers: {},
    data: params,
  };

  return axios(config).then((res) => res);
}
