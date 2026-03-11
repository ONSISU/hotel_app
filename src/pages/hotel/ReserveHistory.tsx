'use client';
import styles from "@/style/page/hotel/ReserveHistory.module.scss";
import Image from 'next/image';
import React, { useState, useEffect, useCallback, useRef  } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

function ReserveHistory() {
  const router = useRouter();
  const [listSelected, setListSelected] = useState('최근 3개월');
  const [isOpen, setIsOpen] = useState(false);
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (isOpen) {
      setShow(true);
    } else {
      const timeout = setTimeout(() => {
        setShow(false);
      }, 600); 
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);
  const menuItems = [
    '최근 3개월',
    '최근 6개월',
    '최근 1년',
    '최근 2년',
  ];

  const handleOpenBottomSheet = () => {
    setIsOpen(true);
  };
  const handleCloseBottomSheet = () => {
    setIsOpen(false);
  };
  // 옵션 선택 및 바텀 시트 닫기
  const handleOptionSelect = (option : string) => {
    setListSelected(option);
    handleCloseBottomSheet();
  };    
  const backPage=  () =>  {
    router.back(); 
  }
  return (
    <div className={styles.reserveHistoryWrap}>
      <div className={styles.titleContainer}>
        <Image src="/icons/backBlack.svg" alt='뒤로가기' width={25} height={25} className={styles.back} onClick={backPage}/>
        <div className={styles.title01}>예약내역</div>
      </div>
      <div className={styles.reserveHistoryContent}>
        <div className={styles.dataSetup}>
          <div className={styles.dateTitle} aria-haspopup="dialog"
              aria-expanded={isOpen}onClick={handleOpenBottomSheet}>
            <div className={styles.sort}
            >{listSelected}
            </div>
            <Image src="/icons/notify-arrow.svg" alt='기간 선택' width={18} height={18} className={styles.choice}/>
          </div>
          {/* 바텀 시트 백드롭 */}
          {isOpen && (
            <div className={styles.bottomSheetBackDrop}
              onClick={handleCloseBottomSheet}
              style={{opacity: isOpen ? 1 : 0}}
              aria-hidden="true"
            />
          )}
          {/* 바텀 시트 모달 */}
          <div className={styles.bottomSheetModal}
            role="dialog"
            aria-modal="true"  
            aria-label="기간 선택"
            style={{ transform: isOpen ? 'translateY(0%)' : 'translateY(100%)'}}
          >
            <div className={styles.bottomSheetHeader}>
              <div className={styles.bottomSheetTitle}>기간 선택</div>
              <button className={styles.close} onClick={handleCloseBottomSheet}>&times;</button> {/* 닫기 버튼 */}
            </div>
            {menuItems.map(option => (
              <div
                key={option} className={styles.optionList}
                onClick={() => handleOptionSelect(option)}
                style={{
                  fontWeight: listSelected === option ? '700' : '400',
                  color: listSelected === option ? '#3366ff' : '#222',
                }}
              >
                <span>{option}</span>
                {listSelected === option && <span className={styles.check}>✓</span>}
              </div>
            ))}
          </div>
        </div>
        <div className={styles.reserveHistory}>
          <div className={styles.reserveHistoryItem}>
            <div>2026.03.01 (일)</div>
            <div>
              <Link href={'/payment/DetailReserveCompletion'} className={styles.link}>
                <div>상세보기</div>
              </Link>
              <Image src="/icons/notify-arrow.svg" alt='버튼' width={10} height={10} className={styles.notifyArrow} priority={true}/>
            </div>
          </div>
          <div className={styles.hotelData}>
            <div className={styles.status}>이용완료</div> {/*예약상태에 따라 변경 */}
            <div className={styles.hotelName}>그랜드 하얏트 호텔</div>
            <div className={styles.hotelSubInfo}>
              <Image src="/images/popularImg01.jpg" alt='호텔사진' width={72} height={72} className={styles.hotelImg}/>
              <div className={styles.hotelInfo}>
                <div className={styles.roomName}>프리미엄 스위트룸</div>
                <div className={styles.roomDate}>2026.4.20 (월) - 2026.4.21 (화) <span>ㅣ</span> 1박</div>
                <div className={styles.roomCheckTime}>체크인 15:00 <span>ㅣ</span>체크아웃  11:00</div>
                <div className={styles.roomPerson}>기준 2명 / 최대 2명</div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.reserveHistory}>
          <div className={styles.reserveHistoryItem}>
            <div>2026.03.08 (일)</div>
            <div>
              <Link href={'/payment/DetailReserveCompletion'} className={styles.link}>
                <div>상세보기</div>
              </Link>
              <Image src="/icons/notify-arrow.svg" alt='버튼' width={10} height={10} className={styles.notifyArrow} priority={true}/>
            </div>
          </div>
          <div className={styles.hotelData}>
            <div className={styles.cancel}>취소완료</div> {/*예약상태에 따라 변경 */}
            <div className={styles.hotelName}>신라 호텔</div>
            <div className={styles.hotelSubInfo}>
              <Image src="/images/popularImg01.jpg" alt='호텔사진' width={72} height={72} className={styles.hotelImg}/>
              <div className={styles.hotelInfo}>
                <div className={styles.roomName}>프리미엄 스위트룸</div>
                <div className={styles.roomDate}>2026.4.28 (월) - 2026.4.29 (화) <span>ㅣ</span> 1박</div>
                <div className={styles.roomCheckTime}>체크인 15:00 <span>ㅣ</span>체크아웃  11:00</div>
                <div className={styles.roomPerson}>기준 2명 / 최대 2명</div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.noticeContent}>
          <div>예약 내역은 최대 2년까지 조회 가능합니다.</div>
          <div>(주)OOOO은 통신판매 중개자로서 통신판매의 당사자가 아니며 상품의 예약, 이용 및 환불 등과 관련된 의무와 책임은 각 판매자에게 있습니다.</div>
        </div>
      </div>
    </div>
  )
}
export default ReserveHistory;