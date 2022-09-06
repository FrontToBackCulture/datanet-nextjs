import axios from 'axios';

let host = '';
if (process.env.NODE_ENV === 'development') {
  host = 'http://0.0.0.0:8085';
} else {
  host = 'https://shark-app-b5dbm.ondigitalocean.app';
}

export async function insert2VAL(params) {
  const config = {
    method: 'post',
    url: `${host}/api/insert2VAL`,
    headers: {},
    data: params,
  };

  return axios(config).then((res) => res);
}

export async function readVAL(params) {
  const config = {
    method: 'post',
    url: `${host}/api/readVAL`,
    headers: {},
    data: params,
  };

  return axios(config).then((res) => res);
}
