import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req:NextApiRequest, res: NextApiResponse) {

  const successPath = '/reserve/payment/success';

  res.redirect(302, successPath);
}
