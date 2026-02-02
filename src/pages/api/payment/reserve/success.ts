import { NextApiRequest, NextApiResponse } from "next"
import { useEffect } from 'react';

export default async function handler(req:NextApiRequest, res: NextApiResponse) {

  console.log(' >>> ', req.query);

  // API - 스웨거 참고
  // 결제승인을 위해 api 날려야함(/saveTempReservation)
  // 승인 응답 받고 success, fail 로직 태워야함
  // 토큰 필수임(결제승인 이후에 실제 예약 진행을 위해..)
  // req.query안에 (orderId, paymentKey 들어가 있음. orderKey는 /checkReserveYn에서 받아야함)
  // /checkReserveYn은 위젯 띄우기 전에 미리 호출하고 예약 가능하면 위젯을 띄워야함
  const res1 = await fetch(`http://tomhoon.my:33000/api/v1/payment/saveReservation`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "paymentKey" : req.query.paymentKey,
      "orderId" : req.query.orderId,
      "orderKey" : "b480bcab-384a-44a7-a9d9-2ce3bae7f7db"
    }),
  });

  const json = await res1.json();
  console.log(' >>>>> ', json);

  const successPath = '/reserve/payment/success';
  
  res.redirect(302, successPath);
}
