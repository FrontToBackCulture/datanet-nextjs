// _data
// import { _jobs } from '../../../../_data/mock';

import { readVAL } from '../../../api/grpc';
// ----------------------------------------------------------------------

export default async function handler(req, res) {
  const { id } = req.query;
  console.log('Melvin: ', req.query);

  const valJobs = await readVAL({ queryID: '10', domain: 'dev' });

  const filtered = valJobs.data.find((job) => job.ID === id);

  if (filtered) {
    res.status(200).json(filtered);
  } else {
    res.status(404).json({ message: `Job with id: ${id} not found.` });
  }
}
