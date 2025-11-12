import styles from "@/style/components/hotel/DetailHotel.module.scss";
import Image from 'next/image';

import React, { useState, useEffect, useCallback, useRef  } from 'react';

export default function DetailHotel() {

  const [showMoreFacilities, setShowMoreFacilities] = useState(false); 
  const [hasMoreFacilities, setHasMoreFacilities] = useState(false); 
  const facilitiesRef = useRef<HTMLDivElement>(null);
  const [isLocation, setIsLocation] = useState(false);

  useEffect(() => {
    if (facilitiesRef.current) {
      if (facilitiesRef.current.scrollHeight > 150) {
        setHasMoreFacilities(true);
      } else {
        setHasMoreFacilities(false);
      }
    }
  }, []);
  const DetailLocationToggle = () => {
    setIsLocation(!isLocation);
  };

  return (
    <div className={styles.detailWrap}>
      <div className={styles.titleContainer}>
        <Image src="/icons/backBlack.svg" alt='뒤로가기' width={25} height={25} className={styles.back}/>
        <div className={styles.title02}>그랜드 하얏트 호텔</div>
        <Image src="/icons/moreIconBlack.svg" alt='더보기' width={25} height={25} className={styles.more}/>
      </div>
      <div className={styles.detailContainer}>
        <div className={styles.detailImg}>
          <Image src="/images/popularImg01.jpg" alt='호텔' width={50} height={50} className={styles.mainImg}/>
        </div>
        <div className={styles.infoContainer}>
          <div className={styles.info01}>
            <div className={styles.title}>그랜드 하얏트 호텔</div>
            <div className={styles.info}>
              <Image src="/icons/location02.svg" alt='위치' width={18} height={18}/>
              <div className={styles.locationInfo} onClick={DetailLocationToggle}>
                <p>서울 용산구</p>
                <Image src="/icons/notify-arrow.svg" alt='버튼' width={10} height={10} className={styles.detailLocation}/>
              </div>
              {isLocation &&
              <div className={styles.locationToggle}>
                <div>도로명 : 소월로 322</div>
                <div>지번 : 한남동 747-7</div>
              </div>
              }
              <div className={styles.scoreInfo}>
                <Image src="/images/popular-star.png" alt='score' width={16} height={16}/>
                <span className={styles.score}>4.1</span>
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
              <div className={styles.subDate}>
                <Image src="/icons/date.svg" alt='날짜' width={14} height={14} className={styles.dateImg}/>
                <div className={styles.dateDay}>11.11~11.13 (2박)</div>
              </div>
              <div className={styles.subPeople}>
                <Image src="/icons/people.svg" alt='날짜' width={14} height={14} className={styles.peopleImg}/>
                <div className={styles.datePeople}>인원 2</div>
              </div>
            </div>
            <div className={styles.roomContainer}>
              <Image src="/images/room3.jpg" alt='객실' width={400} height={200} className={styles.roomImg}/>
              <div className={styles.roomInfo01}>
                <div className={styles.title}>프리미엄 스위트룸</div>
                <div className={styles.people}>기준 2인 / 최대 2인</div>
                <div className={styles.bed}>더블침대 1개</div>
              </div>
              <div className={styles.roomInfo02}>
                <div className={styles.type}>숙박</div>
                <div className={styles.time}>
                  체크인 <span>15:00</span> - 체크아웃 <span>11:00</span>
                </div>
                <div className={styles.roomPrice}>
                  <div className={styles.price}>1,200,000원</div>
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
                  <div className={styles.price}>1,500,000원</div>
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
                  <div className={[styles.price, styles.end].join(" ")}>900,000원</div>
                  <div className={styles.reserve}>예약마감</div>
                  <div className={styles.roomDetail}>
                    <div className={styles.title}>상세보기</div>
                    <Image src="/icons/notify-arrow.svg" alt='버튼' width={10} height={10} className={styles.detailImg}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.info04}>
            <div className={styles.subTitle}>시설 및 서비스</div>
            <div ref={facilitiesRef} 
            className={`${styles.subInfo} ${!showMoreFacilities && hasMoreFacilities ? styles.collapsed : ''}`}>
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
            {hasMoreFacilities && (
            <button className={styles.moreButton}
              onClick={() => setShowMoreFacilities(!showMoreFacilities)}>
              {showMoreFacilities ? '닫기' : '더보기'}
            </button>
          )}
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
              <span className={styles.more}>더보기</span>
            </div>
            <hr className={styles.reviewLine}/>
            <div className={styles.reviewBest}>
              <div className={styles.reviewInfo}>
                <Image src="/images/profileImg.png" alt='호텔' width={44} height={44} className={styles.profileImg}/>
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
            <div className={styles.reviewBest}>
              <div className={styles.reviewInfo}>
                <Image src="/images/profileImg.png" alt='호텔' width={44} height={44} className={styles.profileImg}/>
                <div className={styles.profile}>
                  <div>
                    <div className={styles.name}>낭만가 남대리</div>
                    <div className={styles.date}>25.11.12</div>
                  </div>
                  <div className={styles.score}>
                    <Image src="/images/bin-star.png" alt='score' width={16} height={16}/>
                    <Image src="/images/popular-star.png" alt='score' width={16} height={16}/>
                    <Image src="/images/popular-star.png" alt='score' width={16} height={16}/>
                    <Image src="/images/popular-star.png" alt='score' width={16} height={16}/>
                    <Image src="/images/popular-star.png" alt='score' width={16} height={16}/>
                  </div>
                </div>
              </div>
              <div className={styles.content}>
                길 가다가 넘어져서 1점 뺐어요...
              </div>
            </div>
          </div>
          <div className={styles.info07}>
            <div className={styles.title}>취소 문의</div>
            <div className={styles.content}>예약 취소시 수수료가 발생 될 수 있습니다.</div>
          </div>
          <div className={styles.info08}>
            <div className={styles.title}>판매자 정보</div>
            <Image src="/icons/notify-arrow.svg" alt='버튼' width={16} height={16} className={styles.sellingInfo}/>
          </div>
        </div>
        <div className={styles.priceContainer}></div>
      </div>
    </div>

  );
}
