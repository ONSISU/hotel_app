'use client';
import styles from "@/style/components/payment/Completion.module.scss";
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect  } from 'react';
import { useRouter } from 'next/navigation'


function Completion() {
  const router = useRouter();
  
  const goHome = () => {
    router.replace('/');
  }
  const goDetailReserve = () => {
    router.push('/payment/DetailReserveCompletion');
  }
useEffect(() => {
  window.history.replaceState(null, '', '/');
  window.history.pushState(null, '', window.location.pathname);
  
  const handler = () => {
    router.push('/');
  };

  window.addEventListener('popstate', handler);
  return () => {
    window.removeEventListener('popstate', handler);
  };     
}, [router]);

  return (
    <div className={styles.completionWrap}>
      <div className={styles.titleContainer}>
        <Link href={`/`}>
          <Image src="/icons/close02.svg" alt='뒤로가기' width={25} height={25} className={styles.back}/>
        </Link>
        <Image src="/icons/moreIconBlack.svg" alt='더보기' width={25} height={25} className={styles.more}/>
      </div>
      <div className={styles.completionContainer}>
        <div className={styles.headerContainer}>
          <div className={styles.headerTit}>
            <div>예약이 완료되었습니다.</div>
            <div>예약일시 : 2026.01.19 (월) 16:30</div>
          </div>
          <div className={styles.mainContainer}>
            <div className={styles.hotelData}>
              <div className={styles.hotelName}>그랜드 하얏트 호텔</div>
              <div className={styles.hotelSubInfo}>
                <Image src="/images/popularImg01.jpg" alt='호텔사진' width={72} height={72} className={styles.hotelImg}/>
                <div className={styles.hotelInfo}>
                  <div className={styles.roomName}>프리미엄 스위트룸</div>
                  <div className={styles.roomDate}>2026.1.20 (화) - 2026.1.21 (수) <span>ㅣ</span> 1박</div>
                  <div className={styles.roomCheckTime}>체크인 15:00 <span>ㅣ</span>체크아웃  11:00</div>
                  <div className={styles.roomPerson}>기준 2명 / 최대 2명</div>
                </div>
              </div>
            </div>
            <div className={styles.userData}>
              <div className={styles.tit}>이용자 정보</div>
              <div className={styles.name}>
                <div>이름</div>
                <div>남대리</div>
              </div>
              <div className={styles.phone}>
                <div>휴대폰 번호</div>
                <div>010-1111-2222</div>
              </div>
            </div>
            <div className={styles.reserveData}>
              <div className={styles.tit}>예약 정보</div>
              <div className={styles.reserve}>
                <div>예약상품</div>
                <div>그랜드 하얏트 호텔</div>
              </div>
              <div className={styles.payment}>
                <div>결제 수단</div>
                <div>토스페이</div>
              </div>
            </div>
            <div className={styles.paymentData}>
              <div className={styles.tit}>결제 정보</div>
              <div className={styles.originalPay}>
                <div>상품금액</div>
                <div>80,000원</div>
              </div>
              <div className={styles.discountPay}>
                <div>할인 금액</div>
                <div>-20,000원</div>
              </div>
              <div className={styles.totalPay}>
                <div>총 결제 금액</div>
                <div>60,000원</div>
              </div>
            </div>
            <div className={styles.completionBtn}>
              <div className={styles.detailReserveBtn} onClick={goDetailReserve}>상세 예약내역 보기</div>
              <div className={styles.homeBtn} onClick={goHome}>홈으로 가기</div>
            </div>
          </div>
          <div className={styles.completionNotice}>(주)OOOO은 통신판매 중개자로서 통신판매의 당사자가 아니며 상품의 예약, 이용 및 환불 등과 관련된 의무와 책임은 각 판매자에게 있습니다.</div>
        </div>
      </div>
    </div>
  )
}
export default Completion;