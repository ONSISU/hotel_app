'use client';
import styles from "@/style/page/hotel/DetailHotel.module.scss";
import '@/style/components/common/Calendar.css'; // css import
import Image from 'next/image';
import Link from 'next/link';
import Calendar, {Value} from 'react-calendar'; 
import React, { useState, useEffect, useRef, useMemo, FC, useCallback } from 'react';
import BottomSheet from '@/components/common/HotelInfoBottomSheet';
import { useRouter } from 'next/router';
import {HotelDetail, HotelDetailApiResponse} from '@/app/type/hotelDetail';
import axios from "axios";
import Loading from "@/components/Loading";
  
const getFormattedDateRange = (startDate: Date, endDate: Date): string => {
  const formatSingleDate = (date: Date): string => {
    let formatted = date.toLocaleDateString('ko-KR', { month: '2-digit', day: '2-digit' });
    formatted = formatted.replace('. ', '.');
    if (formatted.endsWith('.')) {
      formatted = formatted.slice(0, -1);
    }
    return formatted;
  };
  const formattedStart = formatSingleDate(startDate);
  const formattedEnd = formatSingleDate(endDate);

  return `${formattedStart} ~ ${formattedEnd}`;
};

const getDurationString = (startDate: Date, endDate: Date) => {
  const start = new Date(startDate);
  start.setHours(0, 0, 0, 0);
  const end = new Date(endDate);
  end.setHours(0, 0, 0, 0);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const nights = Math.floor(diffTime / (1000 * 60 * 60 * 24)); // 밀리초를 일수로 변환하여 '박' 수 계산

  return `${nights}박`;
};

const DetailHotel: FC = () => {
  const router = useRouter();
  const [showMoreFacilities, setShowMoreFacilities] = useState<boolean>(false); 
  const [isLocation, setIsLocation] = useState<boolean>(false);
  const [isPeopleInfo, setIsPeopleInfo] = useState<boolean>(false); 
  const [selectedAttendeesForDisplay, setSelectedAttendeesForDisplay] = useState<number>(2);
  const [tempAttendeesValue, setTempAttendeesValue] = useState<number>(2);
  // 캘린더
  const [isCalendar, setIsCalendar] = useState<boolean>(false);
  const today = useMemo(() => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
  }, []); 
  const tomorrow = useMemo(() => {
    const date = new Date(today);
    date.setDate(today.getDate() + 1);
    date.setHours(0, 0, 0, 0);
    return date;
  }, [today]); 
  const sixMonthsLater = useMemo(() => {
    const date = new Date(today);
    date.setMonth(today.getMonth() + 6);
    date.setHours(23, 59, 59, 999);
    return date;
  }, [today]);
  const [selectedDatesForDisplay, setSelectedDatesForDisplay] = useState<[Date, Date]>(
    () => [today, tomorrow] 
  );
  const [tempCalendarValue, setTempCalendarValue] = useState<Value>(null);
  const [popupSelectedRangeText, setPopupSelectedRangeText] = useState<string>('');
  const [popupStayDurationText, setPopupStayDurationText] = useState<string>('');
  const [mainPageRangeText, setMainPageRangeText] = useState<string>('');
  const [mainPageDurationText, setMainPageDurationText] = useState<string>('');
  const [mainPageAttendeesText, setMainPageAttendeesText] = useState<string>('');

  // 바텀시트
  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false); // 바텀 시트 열림/닫힘 상태
  const openSheet = () => setIsSheetOpen(true);
  const closeSheet = () => setIsSheetOpen(false);

  //detail정보
  //const [hotelId, setHotelId] = useState<string | null>(null); 
  const [hotelDetail, setHotelDetail] = useState<HotelDetail | null>(null); 
  const pageAddress = "http://tomhoon.my:33000";

  // 로딩
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (isCalendar) {
      document.body.style.overflow = 'hidden'; 
    } else {
      document.body.style.overflow = 'unset'; 
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isCalendar]); 

  useEffect(() => {
    let startDispDate: Date = today;
    let endDispDate: Date = tomorrow;

    if (Array.isArray(tempCalendarValue) && tempCalendarValue[0] instanceof Date) {
      startDispDate = tempCalendarValue[0];
      if (tempCalendarValue[1] instanceof Date) {
        endDispDate = tempCalendarValue[1];
      } else { 
        endDispDate = new Date(startDispDate);
        endDispDate.setDate(startDispDate.getDate() + 1);
        endDispDate.setHours(0,0,0,0);
      }
    } else if (tempCalendarValue instanceof Date) { 
      startDispDate = tempCalendarValue;
      endDispDate = new Date(startDispDate);
      endDispDate.setDate(startDispDate.getDate() + 1);
      endDispDate.setHours(0,0,0,0);
    }
    setPopupSelectedRangeText(getFormattedDateRange(startDispDate, endDispDate));
    setPopupStayDurationText(getDurationString(startDispDate, endDispDate));
  }, [tempCalendarValue, today, tomorrow]);

  useEffect(() => {
    const [start, end] = selectedDatesForDisplay;
    setMainPageRangeText(getFormattedDateRange(start, end));
    setMainPageDurationText(getDurationString(start, end));
    setMainPageAttendeesText(`${selectedAttendeesForDisplay}`);
  }, [selectedDatesForDisplay, selectedAttendeesForDisplay]);
  
  const detailLocationToggle = () => {
    setIsLocation(!isLocation);
  };

  const peopleInfoToggle = () => {
    setIsPeopleInfo(!isPeopleInfo);
  };

  const peopleCountDown = () => {
    setTempAttendeesValue(prevCount => Math.max(1, prevCount - 1));
  };

  const peopleCountUp = () => {
    setTempAttendeesValue(prevCount => Math.min(30, prevCount + 1));
  };

  const fnCalendar = () => {
    setTempCalendarValue(selectedDatesForDisplay);
    setTempAttendeesValue(selectedAttendeesForDisplay); 
    setIsPeopleInfo(false); 
    setIsCalendar(true);
  };

  const cancelButton = () => {
    setIsCalendar(false);
  };

  const handleCalendarChange = (nextValue: Value) => {
    setTempCalendarValue(nextValue);
  };

  const applyButton = () => {
    let finalSelectedRange: [Date, Date];
    if (Array.isArray(tempCalendarValue) && tempCalendarValue[0] instanceof Date && tempCalendarValue[1] instanceof Date) {
      finalSelectedRange = [tempCalendarValue[0], tempCalendarValue[1]];
    } else if (tempCalendarValue instanceof Date) { 
      const start = tempCalendarValue;
      const end = new Date(start);
      end.setDate(start.getDate() + 1);
      finalSelectedRange = [start, end];
    } else { 
      finalSelectedRange = [today, tomorrow]; 
    }
    setSelectedDatesForDisplay(finalSelectedRange); 
    setSelectedAttendeesForDisplay(tempAttendeesValue); 
    setIsCalendar(false);
  };

  const handleDayClick = (clickedDate: Date) => {
    const selectedStart = clickedDate;
    const selectedEnd = new Date(selectedStart);
    selectedEnd.setDate(selectedStart.getDate() + 1);
    selectedEnd.setHours(0,0,0,0);
    setTempCalendarValue([selectedStart, selectedEnd]);
  };
  const backPage=  () =>  {
    router.back(); 
  }
  const fetchHotelDetails = useCallback(async (id: string) => {
    try {
    setIsLoading(true);
      const response = await axios.get<HotelDetailApiResponse>(`http://tomhoon.my:33000/api/v1/hotel/detail?hotelId=${id}`);
      const hotelDetailDate: HotelDetail = response.data.data; 
      setHotelDetail(hotelDetailDate); // 성공적으로 가져온 데이터 저장
    } catch {
      setHotelDetail(null); // 에러 발생 시 데이터 초기화
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    const idFromUrl = Array.isArray(router.query.hotelId)
      ? router.query.hotelId[0]
      : (router.query.hotelId || null); // null도 처리 가능하게

    // 2. hotelId가 유효하면 상세 정보를 가져오는 함수 호출
    if (idFromUrl) {
      fetchHotelDetails(idFromUrl);
    } 
  }, [router.isReady, router.query, fetchHotelDetails]); // searchParams가 변경될 때마다 이 useEffect가 다시 실행돼

  // 3. hotelId를 이용해서 API에서 상세 정보를 가져오는 비동기 함수

  if (!hotelDetail) {
    return (
      <>
        {isLoading && <Loading />}
      </>
    );
  }
  
  return (
    <div className={styles.detailWrap}>
      <div className={styles.titleContainer} >
        <Image src="/icons/backBlack.svg" alt='뒤로가기' width={25} height={25} className={styles.back} onClick={backPage} priority={true}/>
        <div className={styles.title01}>{hotelDetail.hotelName}</div>
        <Image src="/icons/moreIconBlack.svg" alt='더보기' width={25} height={25} className={styles.more} priority={true}/>
      </div>
      <div className={styles.detailContainer}>
        <div className={styles.detailMainImg}>
          <Image src={`${pageAddress}${hotelDetail.pictureUrl}`} alt='호텔' width={500} height={360} className={styles.mainImg} priority={true}/>
        </div>
        <div className={styles.infoContainer}>
          <div className={styles.info01}>
            <div className={styles.title}>{hotelDetail.hotelName}</div>
            <div className={styles.info}>
              <Image src="/icons/location02.svg" alt='위치' width={18} height={18} priority={true}/>
              <div className={styles.locationInfo} onClick={detailLocationToggle}>
                <p>{hotelDetail.location}</p>
                <Image src="/icons/notify-arrow.svg" alt='버튼' width={10} height={10} className={styles.detailLocation} priority={true}/>
              </div>
              {isLocation &&
              <div className={styles.locationToggle}>
                <div>도로명 : 소월로 322</div>
                <div>지번 : 한남동 747-7</div>
              </div>
              }
              <div className={styles.scoreInfo}>
                <Image src="/images/popular-star.png" alt='score' width={16} height={16} priority={true}/>
                <span className={styles.score}> </span>
              </div>
            </div>
          </div>
          <div className={styles.info02}>
            <div className={styles.subTitle}>소개</div>
            <div className={styles.subInfo}>
              그랜드 하얏트 서울에서 한국의 활기찬 문화가 살아 숨 쉬는 글로벌 도시인 서울을 탐험해 보세요.
              서울 도심에 위치해 교통의 편리함과 세련되고 아늑한 객실이 더욱 특별한 순간을 선사해 드립니다.
              서울의 상징인 남산과 한강을 가장 가까이 즐길 수 있는 곳, 모든 여행의 순간을 특별하게 만들어 드립니다.
            </div>
          </div>
          <div className={styles.info03}>
            <div className={styles.mainTitle}>객실 선택</div>
            <div className={styles.roomDate}>
              <div className={styles.subDate} onClick={fnCalendar}>
                <Image src="/icons/date.svg" alt='날짜' width={14} height={14} className={styles.dateImg} priority={true}/>
                <div className={styles.dateDay}>{mainPageRangeText} ({mainPageDurationText})</div>
              </div>
              <div className={styles.subPeople} onClick={fnCalendar}>
                <Image src="/icons/people.svg" alt='인원' width={14} height={14} className={styles.peopleImg} priority={true}/>
                <div className={styles.datePeople}>인원 {mainPageAttendeesText}</div>
              </div>
            </div>
            {hotelDetail.ownHotelList && hotelDetail.ownHotelList.length > 0 && (
            <div className={styles.roomList}>
              {hotelDetail.ownHotelList.map(room => (
                <div className={styles.roomContainer} key={room.ownHotelId} >
                  <div className={styles.roomImg}>
                    <Image src={`${pageAddress}${room.pictureList}`} alt='객실' width={450} height={260} className={styles.img} priority={true}/>
                  </div>
                  <div className={styles.roomInfo01}>
                    <div className={styles.title}>{room.roomType} {room.roomName}</div>
                    <div className={styles.people}>기준 {room.maxPerson} / 최대 {room.maxPerson}</div>
                    <div className={styles.bed}>더블침대 1개</div>
                  </div>
                  <div className={styles.roomInfo02}>
                    <div className={styles.type}>숙박</div>
                    <div className={styles.time}>
                      체크인 <span>{room.checkInTime.slice(0,5)}</span> - 체크아웃 <span>{room.checkOutTime.slice(0,5)}</span>
                    </div>
                    <div className={styles.countRoom}>남은객실 {room.countRoom}개</div>
                    <div className={styles.roomPrice}>
                      <div className={styles.discount}></div>
                      <div className={styles.price}>{room.price.toLocaleString()}원</div>
                      <div className={styles.reserve}></div>
                      <Link href="/hotel/DetailRoom" style={{textDecorationLine: "none"}}>
                        <div className={styles.roomDetail}>
                          <div className={styles.title}>상세보기</div>
                          <Image src="/icons/notify-arrow.svg" alt='버튼' width={10} height={10} className={styles.detailImg} priority={true}/>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
                ))}
            </div>
          )}
            {/* <div className={styles.roomContainer}>
            <Image src="/images/room3.jpg" alt='객실' width={400} height={160} className={styles.roomImg}/>
              <div className={styles.roomInfo01}>
                <div className={styles.title}>프리미엄 패밀리룸</div>
                <div className={styles.people}>기준 2인 / 최대 4인</div>
                <div className={styles.bed}>더블침대 2개</div>
              </div>
              <div className={styles.roomInfo02}>
                <div className={styles.type}>숙박</div>
                <div className={styles.time}>
                  체크인 <span>15:00</span> - 체크아웃 <span>11:00</span>
                </div>
                <div className={styles.roomPrice}>
                  <div className={styles.discount}>
                    <span>15%</span>
                    <span>1,700,000</span>
                  </div>
                  <div className={styles.price}>1,445,000원</div>
                  <div className={styles.reserve}></div>
                  <div className={styles.roomDetail}>
                    <div className={styles.title}>상세보기</div>
                    <Image src="/icons/notify-arrow.svg" alt='버튼' width={10} height={10} className={styles.detailImg}/>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.roomContainer}>
              <Image src="/images/room3.jpg" alt='객실' width={400} height={200} className={styles.roomImg}/>
              <div className={styles.roomInfo01}>
                <div className={styles.title}>디럭스룸</div>
                <div className={styles.people}>기준 2인 / 최대 3인</div>
                <div className={styles.bed}>더블침대 1개, 싱글침대 1개</div>
              </div>
              <div className={styles.roomInfo02}>
                <div className={styles.type}>숙박</div>
                <div className={styles.time}>
                  체크인 <span>15:00</span> - 체크아웃 <span>11:00</span>
                </div>
                <div className={styles.roomPrice}>
                  <div className={styles.discount}></div>
                  <div className={[styles.price, styles.end].join(" ")}>900,000원</div>
                  <div className={styles.reserve}>예약마감</div>
                  <div className={styles.roomDetail}>
                    <div className={styles.title}>상세보기</div>
                    <Image src="/icons/notify-arrow.svg" alt='버튼' width={10} height={10} className={styles.detailImg}/>
                  </div>
                </div>
              </div>
              </div> */}
          </div>
          <div className={styles.info04}>
            <div className={styles.subTitle}>시설 및 서비스</div>
            <div 
            className={`${styles.subInfo} ${!showMoreFacilities ? styles.collapsed : ''}`}>
              - 실내수영장<br></br>
              - 와이파이<br></br>
              - 24시간 데스크<br></br>
              - 조식운영<br></br>
              - 주차가능<br></br>
              - 피트니스 센터<br></br>
              - 사우나<br></br>
              - 비즈니스 센터<br></br>
              - 컨시어지 서비스<br></br>
              - 객실 내 미니바<br></br>
              - 객실 내 금고<br></br>
              - 세탁 서비스<br></br>
              - 룸 서비스<br></br>
              - 어린이 돌봄 서비스<br></br>
              - 렌터카 서비스
            </div>
            {!showMoreFacilities ? (
              <div className={styles.moreButton}
                onClick={() => setShowMoreFacilities(true)}>
                {!showMoreFacilities &&  '더보기'}
              </div>
              ) : null
            }
          </div>
          <div className={styles.info05}>
            <div className={styles.title}>
              <span className={styles.subTitle}>위치정보</span>
              <span className={styles.more}>지도보기</span>
            </div>
            <div className={styles.map}>
              <div>
                네이버지도 예정
              </div>
            </div>
          </div>
          <div className={styles.info06}>
            <div className={styles.title}>
              <span className={styles.subTitle}>리뷰</span>
              <Link href="/hotel/Reviews" style={{textDecorationLine: "none"}}>
                <span className={styles.more}>더보기</span>
              </Link>
            </div>
            <hr className={styles.reviewLine}/>
            <Link href="/hotel/Reviews" style={{textDecorationLine: "none"}}>
              <div className={styles.reviewBest}>
                <div className={styles.reviewInfo}>
                  <Image src="/images/profileImg.png" alt='프로필' width={44} height={44} className={styles.profileImg}/>
                  <div className={styles.profile}>
                    <div>
                      <div className={styles.name}>NamBang</div>
                      <div className={styles.date}>25.11.11</div>
                    </div>
                    <div className={styles.score}>
                      <Image src="/images/popular-star.png" alt='score' width={16} height={16}/>
                      <Image src="/images/popular-star.png" alt='score' width={16} height={16}/>
                      <Image src="/images/popular-star.png" alt='score' width={16} height={16}/>
                      <Image src="/images/popular-star.png" alt='score' width={16} height={16}/>
                      <Image src="/images/popular-star.png" alt='score' width={16} height={16}/>
                    </div>
                  </div>
                </div>
                <div className={styles.content}>
                  음식이 친절하고 사장님이 맛있어요.
                </div>
              </div>
            </Link>
            <Link href="/hotel/Reviews" style={{textDecorationLine: "none"}}>
              <div className={styles.reviewBest}>
                <div className={styles.reviewInfo}>
                  <Image src="/images/profileImg.png" alt='프로필' width={44} height={44} className={styles.profileImg}/>
                  <div className={styles.profile}>
                    <div>
                      <div className={styles.name}>낭만가 남대리</div>
                      <div className={styles.date}>25.11.12</div>
                    </div>
                    <div className={styles.score}>
                      <Image src="/images/popular-star.png" alt='score' width={16} height={16}/>
                      <Image src="/images/popular-star.png" alt='score' width={16} height={16}/>
                      <Image src="/images/popular-star.png" alt='score' width={16} height={16}/>
                      <Image src="/images/popular-star.png" alt='score' width={16} height={16}/>
                      <Image src="/images/bin-star.png" alt='score' width={16} height={16}/>
                    </div>
                  </div>
                </div>
                <div className={styles.content}>
                  길 가다가 넘어져서 1점 뺐어요...
                </div>
              </div>
            </Link>
          </div>
          <div className={styles.info07}>
            <div className={styles.title}>취소 문의</div>
            <div className={styles.content}>예약 취소시 수수료가 발생 될 수 있습니다.</div>
          </div>
          <div className={styles.info08} onClick={openSheet}>
            <div className={styles.title}>판매자 정보</div>
            <Image src="/icons/notify-arrow.svg" alt='버튼' width={16} height={16} className={styles.sellingInfo} priority={true} />
          </div>
        </div>
        <div className={styles.priceContainer}></div>
      </div>
      {isCalendar &&
      <div className={styles.popupCalendar}>
        <div className={styles.popupContent}>
          <div className={styles.popupTitle}>날짜 선택</div>
          <Calendar 
          onClickDay={handleDayClick}
          onChange={handleCalendarChange} 
          value={tempCalendarValue} 
          selectRange ={true} 
          calendarType="gregory" 
          prev2Label={null} 
          next2Label={null} 
          minDate={today} 
          maxDate={sixMonthsLater}
          formatDay={(locale, date) => date.toLocaleString('en', { day: 'numeric' })}
          />
          <div className={styles.dateValue}>{popupSelectedRangeText} ({popupStayDurationText})</div>
          <div className={styles.peopleValue}>
            <div className={styles.peopleTitle}>
              <div>인원수</div>
              <Image src="/icons/info.svg" alt='info' width={20} height={20} className={styles.info} onClick={peopleInfoToggle} priority={true}/>
            </div>
            {isPeopleInfo &&
              <div className={styles.peopleInfoToggle}>
                <div>유아 및 아동도 인원수에 포함해주세요.</div>
              </div>
              }
            <div className={styles.peopleCount}>
              <Image src="/icons/minus.svg" alt='minus' width={24} height={24} className={styles.minus} onClick={peopleCountDown} priority={true}/>
              <div className={styles.countTxt}>{tempAttendeesValue}</div>
              <Image src="/icons/add.svg" alt='add' width={24} height={24} className={styles.add} onClick={peopleCountUp} priority={true}/>
            </div>
          </div>
          <div className={styles.popupButton}>
            <div className={styles.cancelButton} onClick={cancelButton}>취소</div>
            <div className={styles.applyButton} onClick={applyButton}>적용</div>
          </div>
        </div>
      </div>
      }
      <BottomSheet isOpen={isSheetOpen} onClose={closeSheet}>
        <>
        <div className="bottomSheetHeader">
          <h3>판매자 정보</h3>
          <button className="closeButton" onClick={closeSheet}>×</button>
        </div>
        <table>
              <tbody>
                <tr>
                  <td className="title">대표자명</td>
                  <td className="text">남대리</td>
                </tr>
                <tr>
                  <td className="title">상호명</td>
                  <td className="text">(주)식은엔비디아</td>
                </tr>
                <tr>
                  <td className="title">사업자주소</td>
                  <td className="text">{hotelDetail.location}</td>
                </tr>
                <tr>
                  <td className="title">이메일</td>
                  <td className="text">nam0001@naver.com</td>
                </tr>
                <tr>
                  <td className="title">연락처</td>
                  <td className="text">{hotelDetail.tel}</td>
                </tr>
                <tr>
                  <td className="title">사업자등록번호</td>
                  <td className="text">{hotelDetail.businessNumber}</td>
                </tr>
                <tr>
                  <td className="title">판매업자신고번호</td>
                  <td className="text">{hotelDetail.registNumber}</td>
                </tr>
              </tbody>
          </table>
        </>
      </BottomSheet>
    </div>
  );
}
export default DetailHotel;