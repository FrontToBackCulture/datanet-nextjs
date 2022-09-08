import axios from 'axios';

let host = '';
let api = '';
if (process.env.DEPLOY_STAGE === 'development' || process.env.DEPLOY_STAGE === 'staging') {
  host = process.env.MINIAPP_HOST;
  api = process.env.MINIAPP_API;
}

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
  console.log(`${host}/${api}/readVAL`);
  const config = {
    method: 'post',
    url: `${host}/${api}/readVAL`,
    headers: {},
    data: params,
  };

  return axios(config).then((res) => res);
}
