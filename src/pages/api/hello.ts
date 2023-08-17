// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { getBaseUrl } from '@/lib/http/client';
export default async function hello(req: NextApiRequest, res: NextApiResponse) {
  const token = req.cookies.access_token;
  const token_type = req.cookies.token_type;
  const user = await axios.get(`${getBaseUrl()}/user`, {
    headers: {
      Authorization: `${token_type} ${token}`, //TODO: get from redux
    },
  });
  res.status(200).json({user:user.data});
}
