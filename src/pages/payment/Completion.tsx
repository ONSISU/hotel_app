'use client';
import styles from "@/style/components/payment/Completion.module.scss";
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect, useCallback, useRef  } from 'react';
import { useRouter } from 'next/router';

function Completion() {
  const [isChecked, setIsChecked] = useState(true);
  const router = useRouter();

  const home = () => {
    router.replace('/');
  }
  
  useEffect(() => {
    // 컴포넌트 마운트 시, 뒤로가기 동작을 가로채는 핸들러 등록
    router.beforePopState((state) => {
      // 'state.url'은 브라우저가 이동하려는 다음 URL입니다.
      // 만약 다음 URL이 홈페이지('/')가 아니라면,
      // 그리고 현재 페이지('/result')에서 뒤로가기를 시도했다면,
      // 홈페이지로 강제 이동시킵니다.
      if (state.url !== '/') {
        router.replace('/'); // 홈페이지로 이동하면서 현재 히스토리 스택을 대체
        return false; // 브라우저의 기본 뒤로가기 동작을 막습니다.
      } 
      // 다음 URL이 이미 홈페이지이거나, 다른 상황에서는 기본 동작을 허용 (선택적)
      return true;
    });

    // 컴포넌트 언마운트 시, 핸들러 제거
    // (선택 사항: 대부분의 경우 next.js 라우터가 페이지 전환 시 내부적으로 처리하지만, 명시적으로 해주는 것도 좋습니다.)
    return () => {
      router.beforePopState(() => true); // 기본 동작으로 되돌립니다.
    };
  }, [router]); // router 객체가 변경될 때만 다시 등록
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
              <div className={styles.detailReserveBtn}>상세 예약내역 보기</div>
              <div className={styles.homeBtn} onClick={home}>홈으로 가기</div>
            </div>
          </div>
          <div className={styles.completionNotice}>(주)OOOO은 통신판매 중개자로서 통신판매의 당사자가 아니며 상품의 예약, 이용 및 환불 등과 관련된 의무와 책임은 각 판매자에게 있습니다.</div>
        </div>
      </div>
    </div>
  )
}
export default Completion;