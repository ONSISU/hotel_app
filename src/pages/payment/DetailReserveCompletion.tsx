'use client';
import styles from "@/style/components/payment/DetailReserveCompletion.module.scss";
import Image from 'next/image';
import React, { useState, useEffect, useCallback, useRef  } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import BottomSheet from '@/components/common/HotelInfoBottomSheet';

export default function DetailReserveCompletion() {
  const router = useRouter();
  const [isCancelActive, setIsCancelActive] = useState<boolean>(false); // 예약완료일시 true
  // 수수료 말풍선
  const [showCommissionBubble, setShowCommissionBubble] = useState<boolean>(false);
  // 바텀시트
  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false); // 바텀 시트 열림/닫힘 상태
  const openSheet = () => setIsSheetOpen(true);
  const closeSheet = () => setIsSheetOpen(false);

  const goHome = () => {
    router.replace('/');
  }
  const toggleCommissionBubble = () => {
    setShowCommissionBubble(prev => !prev);
  };
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
            <div className={styles.status}>예약완료</div> {/*예약상태에 따라 변경 */}
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
              <div className={styles.txt}>환불은 영업일 기준 최대 <span>7일</span>이 걸립니다. 자세한 내용은 
                <span> 환불정책
                <Image src="/icons/question.svg" alt='환불정책' width={16} height={16} onClick={openSheet}/>
                </span>을 참고해 주세요.
              </div>
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
                <Image src="/icons/question.svg" alt='수수료' width={16} height={16} onClick={toggleCommissionBubble} />
              </div>
              <div>0원</div>
            </div>
            {showCommissionBubble && (
              <div className={styles.commissionBubble}>
                취소 수수료는 판매금액을 기준으로 계산됩니다. 자세한 사항은 취소 규정을 참고해주세요
              </div>
            )}
            <div className={styles.cancelPay}>
              <div>예상 환불 금액</div>
              <div>60,000원</div>
            </div>
          </div>
          {/* --------------------- 예약 취소인 경우에만 생성 --------------------- */}
          <div className={styles.detailReserveBtn}>
            <button className={styles.homeBtn} onClick={goHome}>홈으로</button>
            <button className={`${styles.cancelBtn} ${isCancelActive ? styles.cancelBtnActive : ''}`} disabled={true}>예약 취소</button>
          </div>
        </div>
      </div>
      <BottomSheet isOpen={isSheetOpen} onClose={closeSheet}>
        <>
          <div className="bottomSheetHeader">
            <h3>환불 정책</h3>
            <button className="closeButton" onClick={closeSheet}>×</button>
          </div>
          <div className={styles.content01}>
            <div className={styles.tit}>결제수단 별 환불 정책</div>
            <div className={styles.line}>
              <div>-</div>
              <div>취소완료 후 원결제수단으로 취소되는 시점은 영업일 기준 3~7일이 소요됩니다.</div>
            </div>
            <div className={styles.line}>
              <div>-</div>
              <div>예약 시 선택하신 결제수단에 따라 환불이 불가능한 경우, 고객센터를 통해 계좌환불로 대체 처리 될 수 있습니다.</div>
            </div>
            <div className={styles.line}>
              <div>-</div>
              <div>계좌환불 진행 시, 고객님의 계좌로 환불금액이 완료까지 영업일 기준 2~3일이 소요될 수 있습니다.</div>
            </div>
            <div className={styles.line}>
              <div>-</div>
              <div>&lsquo;휴대폰 결제&rsquo; 예약 건은 결제 당월에 한해 원 거래 취소 및 환불 처리가 가능합니다. 익월 이후 취소 시, 계좌를 통한 현금 또는 포인트로 환불됩니다.</div>
            </div>
          </div>
          <div className={styles.content02}>
            <div className={styles.tit}>사용한 쿠폰의 반환</div>
            <div className={styles.line}>
              <div>-</div>
              <div>고객 소유의 쿠폰을 사용하신 경우, 취소수수료 발생 여부와 무관하게 예약취소 시점에 고객님 게정으로 반환됩니다.</div>
            </div>
            <div className={styles.line}>
              <div>-</div>
              <div>단, &lsquo;즉시 할인쿠폰(선착순 쿠폰)&rsquo;의 경우, 회원이 소유한 형태의 쿠폰이 아니므로, 반환 대상에서 제외됩니다.</div>
            </div>
          </div>
        </>
      </BottomSheet>
    </div>
  );
}                                                                                