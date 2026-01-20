'use client';
import styles from "@/style/page/hotel/DetailRoom.module.scss";
import Image from 'next/image';
import React, { useState, useEffect, useCallback, useRef  } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Loading from "@/components/Loading";

export default function DetailRoom() {
  
  const router = useRouter();
  const backPage=  () =>  {
    router.back(); 
  }
  // 로딩
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // if (!roomDetail) {
  //   return (
  //     <>
  //       {isLoading && <Loading />}
  //     </>
  //   );
  // }
  return (
    <div className={styles.roomWrap}>
        <div className={styles.titleContainer}>
          <Image src="/icons/backBlack.svg" alt='뒤로가기' width={25} height={25} className={styles.back} onClick={backPage}/>
          <div className={styles.title01}>그랜드 하얏트 호텔</div>
          <Image src="/icons/moreIconBlack.svg" alt='더보기' width={25} height={25} className={styles.more}/>
        </div>
        <div className={styles.roomContainer}>
          <div className={styles.roomImg}>
            <Image src="/images/room3.jpg" alt='호텔' width={500} height={300} className={styles.mainImg}/>
          </div>
          <div className={styles.infoContainer}>
            <div className={styles.room01}>
              <div className={styles.roomTitle}>프리미엄 스위트룸</div>
              <div className={styles.icon}>
                <Image src="/icons/binPeople.svg" alt='인원' width={16} height={16}/>
                <div className={styles.roomPeople}>기준 2인 / 최대 2인</div>
              </div>
              <div className={styles.icon}>
                <Image src="/icons/time.svg" alt='시간' width={16} height={16}/>
                <div className={styles.roomTime}>체크인 15:00 ~ 체크아웃 11:00</div>
              </div>
            </div>
            <hr className={styles.roomLine}/>
            <div  className={styles.room02}>
              <div className={styles.icon}>
                <Image src="/icons/bed.svg" alt='침대' width={16} height={16}/>
                <div className={styles.roomInfo01}>더블침대 1개</div>
              </div>
              <div className={styles.icon}>
                <Image src="/icons/building.svg" alt='객실크기' width={16} height={16}/>
                <div className={styles.roomInfo02}>29.75㎡</div>
              </div>
              <div className={styles.icon}>
                <Image src="/icons/trash.svg" alt='금연' width={16} height={16}/>
                <div className={styles.roomInfo02}>금연객실</div>
              </div>
            </div>
            <hr className={styles.roomLine}/>
            <div className={styles.room03}>
              <div className={styles.subtitle}>객실 시설/서비스</div>
              <div className={styles.serviceContainer}>
                <div className={styles.service}>
                  <Image src="/icons/check.svg" alt='서비스' width={18} height={18}/>
                  <div>와이파이</div>
                </div>
                <div className={styles.service}>
                  <Image src="/icons/check.svg" alt='서비스' width={18} height={18}/>
                  <div>정수기</div>
                </div>
                <div className={styles.service}>
                  <Image src="/icons/check.svg" alt='서비스' width={18} height={18}/>
                  <div>개인바베큐</div>
                </div>
                <div className={styles.service}>
                  <Image src="/icons/check.svg" alt='서비스' width={18} height={18}/>
                  <div>TV</div>
                </div>
                <div className={styles.service}>
                  <Image src="/icons/check.svg" alt='서비스' width={18} height={18}/>
                  <div>커피포트</div>
                </div>
              </div>
            </div>
            <hr className={styles.roomLine}/>
            <div className={styles.room04}>
              <div className={styles.subtitle}>취소규정</div>
              <div className={styles.cancelContainer}>
                <div className={styles.cancelList}>
                  <div>˙ </div>
                  <div>이 숙소의 취소 규정 확인 바랍니다. 당일예약은 체크인 시각의 3시간전까지, 미리예약은 체크인 날짜의 1일전까지 취소 가능합니다.</div>
                </div>
                <div className={styles.cancelList}>
                  <div>˙ </div>
                  <div>연박의 경우엔 부분취소(일부 날짜만 취소) 할 수 없습니다.</div>
                </div>
                <div className={styles.cancelList}>
                  <div>˙ </div>
                  <div>숙소 사정에 의한 취소는 100% 환불 가능 합니다.</div>
                </div>
                <div className={styles.cancelList}>
                  <div>˙ </div>
                  <div>예약 직후 1시간 이내라 하더라도 입실(체크인) 시간 경과 시 취소/환불 불가합니다.</div>
                </div>
              </div>
            </div>
          </div>
      </div>
      <div className={styles.roomPriceContainer}>
        <div className={styles.roomPriceInfo}>
          <div className={styles.date}>11.11~11.12</div>
          <div className={styles.price}>1,200,000원</div>
        </div>
        <Link href="/hotel/Reserve" style={{textDecoration: 'none'}}>
          <div className={styles.reserveBtn}>예약하기</div>
        </Link>
      </div>
    </div>
  );
}                                                                                