import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req:NextApiRequest, res: NextApiResponse) {

  const failPath = '/reserve/payment/fail';

  res.redirect(302, failPath);
}
