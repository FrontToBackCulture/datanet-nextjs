import axios from 'axios';

let host = '';
let api = '';

// console.log('MINIAPP_HOST: ', process.env.MINIAPP_HOST);
// console.log('MINIAPP_API: ', process.env.MINIAPP_API);
// host = process.env.MINIAPP_HOST || 'https://datanet.thinkval.io';
host = process.env.MINIAPP_HOST || 'http://0.0.0.0:8085';
api = process.env.MINIAPP_API || 'miniapp_api/v0.1';

export async function dataNetMerge(params) {
  const config = {
    method: 'post',
    url: `${host}/${api}/merge`,
    headers: {},
    data: params,
  };
  console.log('what is the env:', process.env);
  return axios(config).then((res) => res);
}
