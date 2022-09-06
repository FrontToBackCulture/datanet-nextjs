// _data
// import { _jobs } from '../../../../_data/mock';
import { readVAL } from '../../../api/grpc';
// ----------------------------------------------------------------------

export default async function handler(req, res) {
  console.log('I am in Promotions Index');
  const valJobs = await readVAL({ queryID: '9', domain: 'dev' });
  res.status(200).json(valJobs.data);
}
