import axios from 'axios';

let host = '';
let api = '';

// console.log('MINIAPP_HOST: ', process.env.MINIAPP_HOST);
// console.log('MINIAPP_API: ', process.env.MINIAPP_API);
host = process.env.MINIAPP_HOST || 'https://datanet.thinkval.io';
api = process.env.MINIAPP_API || 'miniapp_api/v0.1';

export async function clearCache(params) {
  const config = {
    method: 'post',
    url: `${host}/${api}/clearCache`,
    headers: {},
    data: params,
  };

  return axios(config).then((res) => res);
}
