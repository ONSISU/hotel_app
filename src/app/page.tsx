'use client'
import Image from 'next/image';
import styles from "./home.module.css";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import 'swiper/css/scrollbar';

export default function Home() {
  return (
    <div className={styles["wrapper"]}>
      <div className={styles["container"]}>
        <div className={styles.a}>
          <div className={styles["a-profile"]}>
              <Image src="/images/profileImg.png" alt='프로필사진' width={60} height={60} className={styles["radius-profile-img"]} />
              <div className={styles["profile-info"]}>
                <div className={styles["profile-name"]}>Nam bang</div>
                <div className={styles["profile-location"]}>
                  <Image src="/icons/location.svg" alt='위치' width={18} height={18}/>
                  <p>서울 여의도동</p>
                </div>
              </div>
          </div>
          <div className={styles["a-icon"]}>
            <span className={styles["radius-01"]}>
              <Image src="/icons/search.svg" alt='검색' width={25} height={25} title='검색'/>
            </span>
            <span className={styles["radius-02"]}>
              <Image src="/icons/notify.svg" alt='알림' width={25} height={25} title='알림'/>
            </span>
          </div>
        </div>
        <div className={styles.b}>
          <div className={styles["wrap-notify"]}>
            <div className={styles["notify-Img"]}>
              <div className={styles["radius-03"]}>
                <Image src="/icons/notify-location.svg" alt='위치' width={21} height={21}/>
              </div>
            </div>
            <span>근처 장소를 표시하려면 위치를 변경할 수 있습니다.</span>
            <Image src="/icons/notify-arrow.svg" alt='버튼' width={24} height={24} className={styles["notify-arrow"]}/>
          </div>
        </div>
        <div className={styles.c}>
          <div className={styles["wrap-popular"]}>
            <div className={styles["popular-title"]}>
              <span className={styles["tit"]}>찜 목록</span>
              <span className={styles["more"]}>더보기</span>
            </div>
            <div className={styles["container-popular"]}>
              <Swiper
              spaceBetween={30}
              slidesPerView={3}
              >
                <SwiperSlide>
                  <div className={styles["popular-img"]}>
                    <div className={styles["popular-heart-radius"]}>
                      <Image src="/icons/popular-fullHeart.png" alt='찜' width={16} height={16} className={styles["heart"]}/>
                    </div>
                    <div className={styles["popular-info"]}>
                      <div className={styles["name"]}>그랜드 하얏테 호텔</div>
                      <div className={styles["location"]}>서울</div>
                      <div className={styles["popular-info02"]}>
                        <div className={styles["price"]}>550,000원~</div>
                        <div className={styles["score"]}>
                          <Image src="/images/popular-star.png" alt='popular' width={14} height={14}/>
                          <span>4.6</span>
                        </div>
                      </div>
                    </div>
                    <Image src="/images/popularImg01.jpg" alt='popular' width={100} height={100} className={styles["img"]} />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className={styles["popular-img"]}>
                    <div className={styles["popular-heart-radius"]}>
                      <Image src="/icons/popular-fullHeart.png" alt='찜' width={16} height={16} className={styles["heart"]}/>
                    </div>
                    <div className={styles["popular-info"]}>
                      <div className={styles["name"]}>신라호텔</div>
                      <div className={styles["location"]}>서울</div>
                      <div className={styles["popular-info02"]}>
                        <div className={styles["price"]}>500,000원~</div>
                        <div className={styles["score"]}>
                          <Image src="/images/popular-star.png" alt='popular' width={14} height={14}/>
                          <span>4.3</span>
                        </div>
                      </div>
                    </div>
                    <Image src="/images/popularImg02.jpg" alt='popular' width={100} height={100} className={styles["img"]} />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div  className={styles["popular-img"]}>
                    <div className={styles["popular-heart-radius"]}>
                      <Image src="/icons/popular-fullHeart.png" alt='찜' width={16} height={16} className={styles["heart"]}/>
                    </div>
                    <div className={styles["popular-info"]}>
                      <div className={styles["name"]}>시그니엘 부산</div>
                      <div className={styles["location"]}>부산</div>
                      <div className={styles["popular-info02"]}>
                        <div className={styles["price"]}>660,000원~</div>
                        <div className={styles["score"]}>
                          <Image src="/images/popular-star.png" alt='popular' width={14} height={14}/>
                          <span>4.5</span>
                        </div>
                      </div>
                    </div>
                    <Image src="/images/popularImg03.jpg" alt='popular' width={100} height={100} className={styles["img"]} />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className={styles["popular-img"]}>
                    <div className={styles["popular-heart-radius"]}>
                      <Image src="/icons/popular-fullHeart.png" alt='찜' width={16} height={16} className={styles["heart"]}/>
                    </div>
                    <div className={styles["popular-info"]}>
                      <div className={styles["name"]}>조선 펠리스 서울</div>
                      <div className={styles["location"]}>서울</div>
                      <div className={styles["popular-info02"]}>
                        <div className={styles["price"]}>1,240,000원~</div>
                        <div className={styles["score"]}>
                          <Image src="/images/popular-star.png" alt='popular' width={14} height={14}/>
                          <span>4.5</span>
                        </div>
                      </div>
                    </div>
                    <Image src="/images/popularImg04.jpg" alt='popular' width={100} height={100} className={styles["img"]} />
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
          </div>

        </div>
        <div className={styles.d}>
          <div className={styles["wrap-recommend"]}>
            <div className={styles["recommend-title"]}>
              <span className={styles["tit"]}>추천</span>
              <span className={styles["more"]}>더보기</span>
            </div>
              {/* <div className={styles["recommend-choice"]}>
                <Swiper
                modules={[Pagination]}
                spaceBetween={12}
                slidesPerView={4}
                style={{
        width: '100%',
        maxWidth: '800px', // 스와이퍼의 최대 너비
        height: '400px', // 스와이퍼의 높이
      }}

                >
                  <SwiperSlide>
                    <div className={styles["choice-all"]}>
                      <div></div>
                      <span>All</span>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className={styles["choice-villas"]}>
                      <Image src="/icons/villas.svg" alt='choice' width={28} height={28} className={styles["villas"]} />
                      <span>Villas</span>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className={styles["choice-hotels"]}>
                      <Image src="/icons/hotels.svg" alt='choice' width={28} height={28} className={styles["hotels"]} />
                      <span>Hotels</span>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className={styles["choice-apartment"]}>
                      <Image src="/icons/apartment.svg" alt='choice' width={28} height={28} className={styles["apartment"]} />
                      <span>Apartment</span>
                    </div>
                  </SwiperSlide>
                </Swiper>
            </div> */}
            <div className={styles["recommend-choice"]}>
                <div className={styles["choice-all"]}>
                  <div></div>
                  <span>All</span>
                </div>
                <div className={styles["choice-hotels"]}>
                  <Image src="/icons/hotels.svg" alt='choice' width={28} height={28} className={styles["hotels"]} />
                  <span>호텔</span>
                </div>
                <div className={styles["choice-villas"]}>
                  <Image src="/icons/villas.svg" alt='choice' width={28} height={28} className={styles["villas"]} />
                  <span>펜션</span>
                </div>
                <div className={styles["choice-camping"]}>
                  <Image src="/icons/apartment.svg" alt='choice' width={28} height={28} className={styles["camping"]} />
                  <span>캠핑</span>
                </div>
                <div className={styles["choice-motel"]}>
                  <Image src="/icons/apartment.svg" alt='choice' width={28} height={28} className={styles["motel"]} />
                  <span>모텔</span>
                </div>
            </div>
            <div className={styles["recommend-list"]}>
                <div className={styles["hotels-list-content"]}>
                  <Image src="/images/hotelList1.jpg" alt='리스트' width={84} height={84} className={styles["hotels-list-img"]} />
                  <div className={styles["hotels-list-info1"]}>
                    <div className={styles["name"]}>롯데 시그니엘</div>
                    <div className={styles["location"]}>
                      <Image src="/icons/location.svg" alt='위치' width={18} height={18}/>
                      <p>서울 송파구</p>
                    </div>
                    <div className={styles["hotels-list-info2"]}>
                      <span className={styles["price"]}>1,270,000원 ~</span>
                    </div>
                  </div>
                  <div className={styles["hotels-list-score"]}>
                    <Image src="/images/popular-star.png" alt='score' width={16} height={16}/>
                    <span className={styles["score"]}>4.9</span>
                  </div>
                </div>
                <hr className={styles["recommend-hr"]}/>
                <div className={styles["hotels-list-content"]}>
                  <Image src="/images/hotelList2.jpg" alt='리스트' width={84} height={84} className={styles["hotels-list-img"]} />
                  <div className={styles["hotels-list-info1"]}>
                    <div className={styles["name"]}>신라스테이</div>
                    <div className={styles["location"]}>
                      <Image src="/icons/location.svg" alt='위치' width={18} height={18}/>
                      <p>서울 강남</p>
                    </div>
                    <div className={styles["hotels-list-info2"]}>
                      <span className={styles["price"]}>300,000원 ~</span> 
                    </div>
                  </div>
                  <div className={styles["hotels-list-score"]}>
                    <Image src="/images/popular-star.png" alt='score' width={16} height={16}/>
                    <span className={styles["score"]}>4.8</span>
                  </div>
                </div>
                <hr className={styles["recommend-hr"]}/>
                <div className={styles["hotels-list-content"]}>
                  <Image src="/images/hotelList3.jpg" alt='리스트' width={84} height={84} className={styles["hotels-list-img"]} />
                  <div className={styles["hotels-list-info1"]}>
                    <div className={styles["name"]}>글래드 여의도</div>
                    <div className={styles["location"]}>
                      <Image src="/icons/location.svg" alt='위치' width={18} height={18}/>
                      <p>서울 여의도</p>
                    </div>
                    <div className={styles["hotels-list-info2"]}>
                      <span className={styles["price"]}>330,000원 ~</span> 
                    </div>
                  </div>
                  <div className={styles["hotels-list-score"]}>
                    <Image src="/images/popular-star.png" alt='score' width={16} height={16}/>
                    <span className={styles["score"]}>4.3</span>
                  </div>
                </div>
            </div>
          </div>
        </div>
        <div className={styles.e}>
          <div className={styles["wrap-map"]}>
            <div className={styles["map-title"]}>
              <span className={styles["tit"]}>내주변</span>
              <span className={styles["more"]}>지도보기</span>
            </div>
            <div className={styles["map"]}>
              <div>
                네이버지도 예정
              </div>
            </div>
          </div>
          <div>

          </div>

        </div>
        <div className={styles.f}>
          <div className={styles["wrap-bestToday"]}>
            <div className={styles["bestToday-title"]}>
              <span className={styles["tit"]}>오늘의 베스트🔥</span>
              <span className={styles["more"]}>더보기</span>
            </div>
            <div className={styles["bestToday-list"]}>
              <div className={styles["bestToday-content"]}>
                <Image src="/images/hotelList3.jpg" alt='리스트' width={84} height={84} className={styles["best-list-img"]} />
                <div className={styles["best-list-info"]}>
                  <div className={styles["name"]}>우리집 앞마당</div>
                  <div className={styles["location"]}>
                    <Image src="/icons/location.svg" alt='위치' width={16} height={16}/>
                    <p>서울 은평구</p>
                  </div>
                  <div className={styles["best-list-info2"]}>
                    <div className={styles["best-list-score"]}>
                      <Image src="/images/popular-star.png" alt='score' width={16} height={16}/>
                      <span className={styles["score"]}>5.0</span>
                      <span className={styles["review"]}>(1)</span>
                    </div>
                    <div className={styles["best-list-price"]}>
                      <span className={styles["discount-price"]}>900,000원</span>
                      <span className={styles["discount-rate"]}>10%</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles["bestToday-content"]}>
                <Image src="/images/hotelList2.jpg" alt='리스트' width={84} height={84} className={styles["best-list-img"]} />
                <div className={styles["best-list-info"]}>
                  <div className={styles["name"]}>힐스테이트 제주</div>
                  <div className={styles["location"]}>
                    <Image src="/icons/location.svg" alt='위치' width={16} height={16}/>
                    <p>제주 제주시</p>
                  </div>
                  <div className={styles["best-list-info2"]}>
                    <div className={styles["best-list-score"]}>
                      <Image src="/images/popular-star.png" alt='score' width={16} height={16}/>
                      <span className={styles["score"]}>4.0</span>
                      <span className={styles["review"]}>(532)</span>
                    </div>
                    <div className={styles["best-list-price"]}>
                      <span className={styles["discount-price"]}>69,000원</span>
                      <span className={styles["discount-rate"]}>40%</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles["bestToday-content"]}>
                <Image src="/images/hotelList1.jpg" alt='리스트' width={84} height={84} className={styles["best-list-img"]} />
                <div className={styles["best-list-info"]}>
                  <div className={styles["name"]}>앵봉산 가족캠핑장</div>
                  <div className={styles["location"]}>
                    <Image src="/icons/location.svg" alt='위치' width={16} height={16}/>
                    <p>서울 은평구</p>
                  </div>
                  <div className={styles["best-list-info2"]}>
                    <div className={styles["best-list-score"]}>
                      <Image src="/images/popular-star.png" alt='score' width={16} height={16}/>
                      <span className={styles["score"]}>4.1</span>
                      <span className={styles["review"]}>(4)</span>
                    </div>
                    <div className={styles["best-list-price"]}>
                      <span className={styles["discount-price"]}>95,000원</span>
                      <span className={styles["discount-rate"]}>5%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>

      </div>
    </div>
  );
}
