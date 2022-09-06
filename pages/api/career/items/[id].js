// _data
// import { _jobs } from '../../../../_data/mock';

import { readVAL } from '../../../api/grpc';
// ----------------------------------------------------------------------

export default async function handler(req, res) {
  const { id } = req.query;

  const valJobs = await readVAL({ queryID: '9', domain: 'dev' });
  console.log('Type: ', typeof valJobs);
  console.log('No. of Jobs: ', valJobs.data.length);

  // console.log('I am in Promotions id.js');
  // const filtered = _jobs.find((job) => job.id === id);
  const filtered = valJobs.data.find((job) => job.ID === id);

  if (filtered) {
    res.status(200).json(filtered);
  } else {
    res.status(404).json({ message: `Job with id: ${id} not found.` });
  }
}
