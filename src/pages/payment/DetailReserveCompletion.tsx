'use client';
import styles from "@/style/components/payment/DetailReserveCompletion.module.scss";
import Image from 'next/image';
import React, { useState, useEffect, useCallback, useRef  } from 'react';
import Link from 'next/link';

export default function DetailReserveCompletion() {
  
  return (
    <div className={styles.detailReserveWrap}>
      <div className={styles.titleContainer}>
        <Image src="/icons/backBlack.svg" alt='뒤로가기' width={25} height={25} className={styles.back}/>
        <div className={styles.title01}>상세 예약내역</div>
        <Image src="/icons/moreIconBlack.svg" alt='더보기' width={25} height={25} className={styles.more}/>
      </div>
      <div className={styles.reserveSelectContainer}>
        <div className={styles.orderContainer}>
          <div className={styles.tit}>예약 정보</div>
          <div className={styles.date}>2026.01.19 (월) <span>16:30</span></div>
        </div>
        <div className={styles.productContainer}>
          <div className={styles.hotelData}>
            <div className={styles.headerTit}>상품 및 이용 정보</div>
            <div className={styles.status}>예약완료</div>
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
          <div className={styles.infoData}>
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
          </div>
          {/* --------------------- 예약 취소인 경우에만 생성 --------------------- */}
          <div className={styles.reserveCancel}>
            <div className={styles.tit}>취소 및 환불 정보</div>
            <div className={styles.notice}>
              <div className={styles.txt}>환불은 영업일 기준 최대 <span>7</span>일이 걸립니다. 자세한 내용은 <span>환불정책
                <Image src="/icons/question.svg" alt='수수료' width={16} height={16} />
                </span>을 참고해 주세요.</div>
            </div>
            <div className={styles.cancelInfo}>
              <div className={styles.productName}>그랜드 하얏트 호텔</div>
              <div className={styles.date}>2026.01.20 (화) 15:00</div>
              <div className={styles.cancelReason}>
                <div>취소사유 :</div>
                <div>단순변심으로 인한 환불</div>
              </div>
            </div>
            <div className={styles.cancelTit}>환불금액</div>
            <div className={styles.originalPay}>
              <div>상품 금액</div>
              <div>80,000원</div>
            </div>
            <div className={styles.discountPay}>
              <div>할인 금액</div>
              <div>-20,000원</div>
            </div>
            <div className={styles.commissionPay}>
              <div>
                <span>수수료</span>
                <Image src="/icons/question.svg" alt='수수료' width={16} height={16} />
              </div>
              <div>0원</div>
            </div>
            <div className={styles.cancelPay}>
              <div>예상 환불 금액</div>
              <div>60,000원</div>
            </div>
          </div>
          {/* --------------------- 예약 취소인 경우에만 생성 --------------------- */}
        </div>
      </div>

    </div>
  );
}                                                                                