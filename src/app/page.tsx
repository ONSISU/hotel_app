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
                <div className={styles["profile-name"]}>name</div>
                <div className={styles["profile-location"]}>
                  <Image src="/icons/location.svg" alt='위치' width={18} height={18}/>
                  <p>Seoul, KO</p>
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
            <span>You Can Change Your Location to show nearby villas</span>
            <Image src="/icons/notify-arrow.svg" alt='버튼' width={24} height={24} className={styles["notify-arrow"]}/>
          </div>
        </div>
        <div className={styles.c}>
          <div className={styles["wrap-popular"]}>
            <div className={styles["popular-title"]}>
              <span className={styles["tit"]}>Most Popular</span>
              <span className={styles["more"]}>See All</span>
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
                      <div className={styles["name"]}>hotel name</div>
                      <div className={styles["location"]}>hotel location</div>
                      <div className={styles["popular-info02"]}>
                        <div className={styles["price"]}>$190/night</div>
                        <div className={styles["score"]}>
                          <Image src="/images/popular-star.png" alt='popular' width={14} height={14}/>
                          <span>4.5</span>
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
                      <div className={styles["name"]}>hotel name</div>
                      <div className={styles["location"]}>hotel location</div>
                      <div className={styles["popular-info02"]}>
                        <div className={styles["price"]}>$190/night</div>
                        <div className={styles["score"]}>
                          <Image src="/images/popular-star.png" alt='popular' width={14} height={14}/>
                          <span>4.5</span>
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
                      <div className={styles["name"]}>hotel name</div>
                      <div className={styles["location"]}>hotel location</div>
                      <div className={styles["popular-info02"]}>
                        <div className={styles["price"]}>$190/night</div>
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
                      <div className={styles["name"]}>hotel name</div>
                      <div className={styles["location"]}>hotel location</div>
                      <div className={styles["popular-info02"]}>
                        <div className={styles["price"]}>$190/night</div>
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
              <span className={styles["tit"]}>Recomended for you</span>
              <span className={styles["more"]}>See All</span>
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
                    <div className={styles["choice-villas"]}>
                      <Image src="/icons/villas.svg" alt='choice' width={28} height={28} className={styles["villas"]} />
                      <span>Villas</span>
                    </div>
                    <div className={styles["choice-hotels"]}>
                      <Image src="/icons/hotels.svg" alt='choice' width={28} height={28} className={styles["hotels"]} />
                      <span>Hotels</span>
                    </div>
                    <div className={styles["choice-apartment"]}>
                      <Image src="/icons/apartment.svg" alt='choice' width={28} height={28} className={styles["apartment"]} />
                      <span>Apartment</span>
                    </div>
            </div>
          </div>
        </div>
        <div className={styles.e}>

        </div>
        <div className={styles.f}>

        </div>
      </div>
      <div>

      </div>
    </div>
  );
}
