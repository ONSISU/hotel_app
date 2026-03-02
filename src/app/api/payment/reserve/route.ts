// app/api/payment/route.ts

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	const { searchParams } = req.nextUrl;
	
	const paymentKey = searchParams.get("paymentKey");
	const orderId = searchParams.get("orderId");
	const orderKey = searchParams.get("orderKey");
	
	
	const [res1, err] = await fetch(
		"http://tomhoon.my:33000/api/v1/payment/saveReservation",
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				paymentKey,
				orderId,
				orderKey
			}),
		}
	)
	.then((res) => {
		if (res.status !== 200) {
			console.error('결제 결과: [결제실패] ### ', res.statusText);
			return [null, new Error(res.statusText)];
		}
		return [res, null];
	})
	.catch((err) => {
		console.error('결제 결과: [결제실패] ### ', err);
		return [null, err]
	});
	
	if (err) {
		const response = NextResponse.redirect(
			new URL("/reserve/payment/fail", req.nextUrl.origin)
		);
		
		return response;
	}
	
	const json = await res1.json();
	console.log('결제 결과: [결제성공] ### ', json);
	
	const response = NextResponse.redirect(
		new URL("/reserve/payment/success", req.nextUrl.origin)
	);
	
	// 성공시 사용할 데이터 쿠키에 삽입
	response.cookies.set({
		name: "orderId",
		value: json.orderId,
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		path: "/",
		maxAge: 60 * 60 * 24,
	});
	
	return response;
}