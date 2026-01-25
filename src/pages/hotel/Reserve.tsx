'use client';
import styles from "@/style/page/hotel/Reserve.module.scss";
import Image from 'next/image';
import React, { useState, useEffect, useCallback, useRef  } from 'react';
import { useRouter } from 'next/navigation';
import BottomSheet from '@/components/common/HotelInfoBottomSheet';
//import PaymentWidget from "@/components/payment/PaymentWidget";
import usePaymentWidget from "@/components/payment/hooks/usePaymentWidget";
import { randomUUID } from "crypto";

function Reserve() {
  const [isChecked, setIsChecked] = useState(true);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked); 
  };
  //사용자 정보
  const [isName, setIsName] = useState<string>('');
  const [isPhone, setIsPhone] = useState<string>('');
  //약관
  const [allChecked, setAllChecked] = useState(false); // 전체동의
  const [termsChecked, setTermsChecked] = useState(false); // 이용규칙
  const [refundChecked, setRefundChecked] = useState(false); // 취소 및 환불규칙
  // 바텀시트
  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false); 
  const [isSheetOpenTerms01, setIsSheetOpenTerms01] = useState<boolean>(false); 
  const [isSheetOpenTerms02, setIsSheetOpenTerms02] = useState<boolean>(false); 
  const openSheet = () => setIsSheetOpen(true);
  const openSheetTerms01 = () => setIsSheetOpenTerms01(true);
  const openSheetTerms02 = () => setIsSheetOpenTerms02(true);
  const closeSheet = () => setIsSheetOpen(false);
  const closeSheetTerms01 = () => setIsSheetOpenTerms01(false);
  const closeSheetTerms02 = () => setIsSheetOpenTerms02(false);
  const router = useRouter();

  // 미사용으로 보여 주석
  // const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    setAllChecked(termsChecked && refundChecked);
  }, [termsChecked, refundChecked]); 

  const handleAllChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setAllChecked(isChecked); // 전체동의 상태 업데이트
    setTermsChecked(isChecked); // 모든 필수 항목도 전체동의 상태에 맞춰 업데이트
    setRefundChecked(isChecked);
  };
  // 이름 입력 변경 핸들러
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsName(e.target.value);
  };

  // 연락처 입력 변경 핸들러
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 숫자만 입력받도록 처리 (하이픈 없이)
    const phoneNumber = e.target.value.replace(/[^0-9]/g, ''); // 숫자 이외의 문자 제거
    setIsPhone(phoneNumber);
  };
  // '이용규칙' 체크박스 변경 핸들러
  const handleTermsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTermsChecked(e.target.checked); // 이용규칙 상태 업데이트
    // 이펙트에서 allChecked를 동기화해주므로 여기서 추가 로직은 필요 없습니다.
  };

  // '취소 및 환불규칙' 체크박스 변경 핸들러
  const handleRefundChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRefundChecked(e.target.checked); // 취소 및 환불규칙 상태 업데이트
    // 이펙트에서 allChecked를 동기화해주므로 여기서 추가 로직은 필요 없습니다.
  };
  const allCheckedToPayment =
    allChecked &&
    isName.trim() !== '' && // 이름이 비어있지 않은지 (공백만 있는 경우도 제외)
    isPhone.trim() !== ''; // 연락처가 비어있지 않은지 (공백만 있는 경우도 제외)

  const backPage=  () =>  {
    router.back(); 
  }
  const {
    goPayment
  } = usePaymentWidget();
  //const payBtn = async () => {
    // const res = await fetch(`http://tomhoon.my:33000/api/v1/reservation/room`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Authorization": accessToken || ""
    //   },
    //   body: JSON.stringify({
    //     "userId" : 3,
    //     "ownHotelId" : 2,
    //     "startDate" : "2025-12-15",
    //     "endDate" : "2025-12-15" 
    //   }),
    // });

    // const json = await res.json();
    // console.log(json);
  //}
  return (
    <div className={styles.roomWrap}>
      <div className={styles.titleContainer}>
        <Image src="/icons/backBlack.svg" alt='뒤로가기' width={25} height={25} className={styles.back} onClick={backPage}/>
        <div className={styles.title01}>예약</div>
        <Image src="/icons/moreIconBlack.svg" alt='더보기' width={25} height={25} className={styles.more}/>
      </div>
      <div className={styles.reserveContainer}>
        <div className={styles.reserveData}>
          <div className={styles.reserveTitle}>그랜드 하얏트 호텔</div>
          <div className={styles.checkDate}>
            <div className={styles.checkIn}>
              <div className={styles.title}>체크인</div>
              <div className={styles.date}>2025.12.10 (수)</div>
              <div className={styles.time}>15:00</div>
            </div>
            <div className={styles.checkOut}>
              <div className={styles.title}>체크아웃</div>
              <div className={styles.date}>2025.12.11 (목)</div>
              <div className={styles.time}>11:00</div>
            </div>
          </div>
          <div className={styles.reservePeople}>
            <Image src="/icons/binPeople.svg" alt='인원' width={16} height={16}/>
            <div className={styles.people}>예약인원<span>2</span>명</div>
          </div>
          <div className={styles.reservePrice}>
            <div className={styles.type}>숙박 /</div>
            <div className={styles.date}> 1박</div>
            <div className={styles.price}>80,000원</div>
          </div>
        </div>
        <div className={styles.reserveInfo}>
          <div className={styles.reserver}>
            <div className={styles.title}>예약자 정보</div>
            <div className={styles.info}>
                <div className={styles.name}>남대리</div> 
              <div className={styles.phone}>010-1111-2222</div>
            </div>
          </div>
          <div className={styles.user}>
            <div className={styles.title}>이용자 정보</div>
            <div className={styles.check}>
                <input type="checkbox" id="userCheck"  checked={isChecked} onChange={handleChange}/>
                <label htmlFor="userCheck" className={styles.txt}>예약자 정보와 동일</label>
            </div>
            <div className={styles.info}>
              <div className={styles.subTitle}>이름</div>
              <input type="text" className={styles.name} value={isName} 
                onChange={handleNameChange}  placeholder="이용자의 이름을 입력해주세요."/>
              <div className={styles.subTitle}>연락처</div>
              <input type="text" className={styles.phone} value={isPhone}
                onChange={handlePhoneChange} placeholder="이용자의 연락처를 입력해주세요.(-없이)" maxLength={11}/>
            </div>
          </div>
        </div>
        <div className={styles.discountContainer}>
          <div className={styles.title}>할인 및 결제정보</div>
          <div className={styles.couponContainer} onClick={openSheet}>
            <div className={styles.txt}>쿠폰 할인</div>
            <div className={styles.discount}>
              <div className={styles.discountPrice}>-20,000원</div>
              <Image src="/icons/notify-arrow.svg" alt='쿠폰할인' width={16} height={16} className={styles.img}/>
            </div>
          </div>
          <div className={styles.totalPrice}>
            <div className={styles.priceInfo}>
              <div className={styles.discountList}>
                <div className={styles.tit}>상품 금액</div>
                <div className={styles.price}>80,000원</div>
              </div>
              <div className={styles.discountList}>
                <div className={styles.tit}>할인 금액</div>
                <div className={styles.price}>-20,000원</div>
              </div>
              <div className={styles.discountPrice}>
                <div className={styles.tit}>총 결제 금액</div>
                <div className={styles.price}>60,000원</div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.paymentContainer}>

          {/* ✅ ASIS */}
          {/* <div className={styles.title}>결제 수단</div>
          <div className={styles.paymentList}>
            <label htmlFor="card">
              <input type="radio" name="payment" id="card"
              checked={selectedPaymentMethod === 'card'}
              onChange={() => handlePaymentChange('card')} />
              <div className={styles.txt}>신용/체크카드</div>
            </label>
            <label htmlFor="kakaoPay">
              <input type="radio" name="payment" id="kakaoPay"
              checked={selectedPaymentMethod === 'kakaoPay'}
              onChange={() => handlePaymentChange('kakaoPay')}/>
              <Image src="/icons/kakaopayment_medium.png" alt='카카오페이' width={20} height={16} className={styles.img}/>
              <div className={styles.txt}>카카오페이</div>
            </label>
            <label htmlFor="tossPay">
              <input type="radio" name="payment" id="tossPay"
              checked={selectedPaymentMethod === 'tossPay'}
              onChange={() => handlePaymentChange('tossPay')}/>
              <Image src="/icons/Toss_payment.png" alt='토스페이' width={20} height={16} className={styles.img}/>
              <div className={styles.txt}>토스페이</div>
            </label>
            <label htmlFor="naverPay">
              <input type="radio" name="payment" id="naverPay"
              checked={selectedPaymentMethod === 'naverPay'}
              onChange={() => handlePaymentChange('naverPay')}/>
              <Image src="/icons/naverPay.svg" alt='네이버페이' width={20} height={16} className={styles.img}/>
              <div className={styles.txt}>네이버페이</div>
            </label>
            <label htmlFor="phone">
              <input type="radio" name="payment" id="phone"
              checked={selectedPaymentMethod === 'phone'}
              onChange={() => handlePaymentChange('phone')}/>
              <div className={styles.txt}>휴대폰결제</div>
            </label>
          </div> */}

          {/* ✅ TOBE */}
          {/* {<PaymentWidget/>} */}
          <div className="wrapper w-100">
            <div className="max-w-540 w-100">
              <div id="payment-method" className="w-100" />
              <div id="agreement" className="w-100" />
              <div className="btn-wrapper w-100">
                {/* <button
                  className="btn primary w-100"
                  onClick={() => goPayment({})}
                >
                  결제하기
                </button> */}
              </div>
            </div>
          </div>




        </div>
        <div className={styles.paymentTerms}>
          <div className={styles.allTerms}>
            <input type="checkbox" id="allAgree" checked={allChecked} onChange={handleAllChange} />
            <label className={styles.txt} htmlFor="allAgree">전체동의</label>
          </div>
          <div className={styles.role01} >
            <div className={styles.roleLook01}>
              <input type="checkbox" id="role01" checked={termsChecked} // termsChecked 상태와 연결
                onChange={handleTermsChange}  onClick={(e) => e.stopPropagation()} />
              <label className={styles.txt} htmlFor="role01">[필수]이용규칙</label>
            </div>
            <Image src="/icons/notify-arrow.svg" alt='이용규칙' width={16} height={16} className={styles.img} onClick={openSheetTerms01}/>
          </div>
          <div className={styles.role02} >
            <div className={styles.roleLook02}>
              <input type="checkbox" id="role02" checked={refundChecked} // refundChecked 상태와 연결
                onChange={handleRefundChange} onClick={(e) => e.stopPropagation()} />
              <label className={styles.txt} htmlFor="role02">[필수]취소 및 환불규칙</label>
            </div>
            <Image src="/icons/notify-arrow.svg" alt='이용규칙' width={16} height={16} className={styles.img} onClick={openSheetTerms02}/>
          </div>
        </div>
        <button className={`${styles.paymentBtn} ${allCheckedToPayment ? styles.paymentBtnActive : ''}`} disabled={!allCheckedToPayment} onClick={() => goPayment({orderId: crypto.randomUUID()})}>60,000원 결제하기</button>
      </div>
      <BottomSheet isOpen={isSheetOpen} onClose={closeSheet}>
        <>
        <div className="bottomSheetHeader">
          <h3>쿠폰 할인</h3>
          <button className="closeButton" onClick={closeSheet}>×</button>
        </div>
        <div className={styles.bottomSheetRadioContainer}>
          <label htmlFor="notCoupon">
            <div className={styles.couponNotApply}>
              <input type="radio" name="coupon" id="notCoupon"/>
                <div>할인 안함</div>
            </div>
          </label>
          <label htmlFor="1">
            <div className={styles.couponApplyList}>
              <input type="radio" name="coupon" id="1"/>
              <div className={styles.couponApplyRadio}>
                <div>10% 할인 (20000원)</div>
                <div className={styles.couponEndDate}>25.12.31까지</div>
              </div>
            </div>
          </label>
          <div className={styles.couponApply} onClick={closeSheet}>적용하기</div>
        </div>
        </>
      </BottomSheet>
      <BottomSheet isOpen={isSheetOpenTerms01} onClose={closeSheetTerms01}>
        <>
          <div className="bottomSheetHeader">
            <h3>이용규칙</h3>
            <button className="closeButton" onClick={closeSheetTerms01}>×</button>
          </div>
          <div>
            각 숙박시설의 규정(규칙 및 약관 등)을 준수해야 합니다. 숙박시설 규정을 위반 시 입실 불가, 퇴실 조치, 추가요금 등이 발생할 수 있으며, 이에 대한 모든 책임은 예약 및 이용 고객님에게 있으므로 숙박시설의 이용규칙과 시설 현황을 반드시 확인하시기 바랍니다.
            규정 내 이용 가능 인원을 초과할 경우, 이용 불가 통보 또는 초과 인원에 대한 추가 요금이 발생할 수 있으며, 이에 대한 모든 책임은 예약 및 이용 고객님에게 있습니다.
            모든 숙박시설의 예약은 실시간으로 이루어지기 때문에, &ldquo;예약과 동시에 확정&rdquo;이 되더라도 over booking(오버부킹)을 비롯한 숙박시설 사정에 따라 “예약 대기” 또는 “예약취소” 상태로 변경될 수 있으며, 결제하신 금액은 자동 환불 처리됩니다.
            미성년자 투숙 시 청소년보호법 등 관계 법령에 따라 미성년자(만 19세 미만 청소년)의 경우 혼숙이 금지되며, 법정대리인 동행 없이 혼숙이 불가한 점 반드시 유의하여 주시길 바랍니다. 또한 해당 사유로 인하여 현장에서 입실이 불가할 경우 취소 및 환불이 불가합니다.
            각 숙박시설 정보는 예약을 위한 참고 자료로 숙박시설 내 자체 변동이나 기타 사유로 인해 실제와 차이가 있을 수 있습니다. 
          </div>
        </>
      </BottomSheet>
      <BottomSheet isOpen={isSheetOpenTerms02} onClose={closeSheetTerms02}>
        <>
          <div className="bottomSheetHeader">
            <h3>취소 및 환불 규칙</h3>
            <button className="closeButton" onClick={closeSheetTerms02}>×</button>
          </div>
          <div>
            결제수단 환불 정책
            취소완료 후 원결제수단으로 취소되는 시점은 영업일 기준 3~7일이 소요됩니다.
            예약 시 선택하신 결제수단에 따라 환불이 불가능한 경우, 고객센터를 통해 계좌환불로 대체 처리 될 수 있습니다.
            계좌환불 진행 시, 고객님의 계좌로 환불금액이 입금완료까지 영업일 기준 2~3일이 소요될 수 있습니다.
            &lsquo;휴대폰 결제&rsquo; 예약 건은 결제 당월에 한해 원 거래 취소 및 환불 처리가 가능합니다.
            환불은 고객이 예약 시 결제한 결제수단과 동일한 방법으로 진행됩니다.
          </div>
        </>
      </BottomSheet>

    </div>
  )
}
export default Reserve;