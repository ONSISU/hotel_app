'use client';
import styles from "@/style/components/payment/Completion.module.scss";
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect, useCallback, useRef  } from 'react';
import { useRouter } from 'next/navigation';

function Completion() {
  const [time, setTime] = useState<string>('');
  const router = useRouter();


  useEffect(() => {
    const now = new Date();
    setTime(now.toLocaleTimeString());
  }, []);

  return (
    <div className={styles.completionWrap}>
      <div className={styles.titleContainer}>
        <Link href={`/`}>
          <Image src="/icons/close02.svg" alt='뒤로가기' width={25} height={25} className={styles.back}/>
        </Link>
        <Image src="/icons/moreIconBlack.svg" alt='더보기' width={25} height={25} className={styles.more}/>
      </div>
      <div className={styles.failContainer}>
        <div className={styles.headerContainer}>
          <div className={styles.headerTit}>예약에 실패했습니다.</div>
          <div className={styles.headerTxt}>결제시간 : {time}</div>
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
        </div>
        <div className={styles.failBtn}>
          <Link href={`/`}>
            <div className={styles.homeBtn}>홈으로 가기</div>
          </Link>
          <div className={styles.paymentBtn}>결제 페이지로</div>
        </div>
      </div>
    </div>
  )
}
export default Completion;