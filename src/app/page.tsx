'use client'
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import axios from 'axios';
import styles from "./home.module.css";
import Link from 'next/link';
import {PopularHotel, PopularHotelApiResponse, FavoriteHotel, FavoriteHotelApiResponse, BestHotel, BestHotelApiResponse} from '../app/type/home';
import {SearchType, SearchTypeApiResponse} from '../app/type/searchType';
import UserStates from '@/states/UserStates'; 
import Loading from "@/components/Loading";
import Map from "@/components/common/Map";

export default function Home() {
  const [isRecommend, setIsRecommend] = useState('ALL');
  //const [popularHotelData, setPopularHotelData] = useState<PopularHotel[]>([]);
  const [favoriteHotelData, setFavoriteHotelData] = useState<FavoriteHotel[]>([]);
  const [bestHotelData, setBestHotelData] = useState<BestHotel[]>([]);
  const [typeList, setTypeList] = useState<SearchType[]>([]);
  const availableTypes: string[] = ['HOTEL', 'VILLA', 'APT', 'MOTEL'];
  const pageAddress = "http://tomhoon.my:33000";
  const [isScrolled, setIsScrolled] = useState(false); 
  // 로딩
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 70) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // const popularHotel = async () => {
    //   try {
    //     const response = await axios.get<PopularHotelApiResponse>('http://tomhoon.my:33000/api/v1/hotel/popular');
    //     const popularHotelList: PopularHotel[] = response.data.data; 
    //     setPopularHotelData(popularHotelList);
    //   } catch (error) {
    //     console.error('데이터 가져오기 에러:', error);
    //     setPopularHotelData([]);
    //   }
    // }
    const favoriteHotel = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get<FavoriteHotelApiResponse>('/api-proxy/api/v1/hotel/popular');
        const favoriteHotelList: FavoriteHotel[] = response.data.data; 
        setFavoriteHotelData(favoriteHotelList);
        setIsLoading(false);
      } catch (error) {
        console.error('데이터 가져오기 에러:', error);
        setFavoriteHotelData([]);
      }
    }
    const bestHotel = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get<BestHotelApiResponse>('/api-proxy/api/v1/hotel/popular');
        const bestHotelList: BestHotel[] = response.data.data; 
        setBestHotelData(bestHotelList);
        setIsLoading(false);
      } catch (error) {
        console.error('데이터 가져오기 에러:', error);
        setBestHotelData([]);
      }
    }
      // popularHotel();
      favoriteHotel();
      bestHotel();
      recommendItem("ALL");
  }, []);
  const recommendItem = async (type:string) => {
    setIsRecommend(type);
    try {
      setIsLoading(true);
      if (type === 'ALL') {
        const randomIndex = Math.floor(Math.random() * availableTypes.length);
        type = availableTypes[randomIndex]; // 랜덤으로 타입 선택
      }
      const response = await axios.get<SearchTypeApiResponse>(`/api-proxy/api/v1/hotel/search`
      , {
          params: {
            type: type
          }
        });
      setTypeList(response.data.data.content); 
      console.log(`${type} 데이터:`, response.data);
      setIsLoading(false);
    } catch (error) {
      console.error(`Error fetching ${type} data:`, error);
      setTypeList([])
    }
  };
  
  return (
    <>
      {isScrolled &&
      <Link href="/info/Search">
        <div className={styles.fixedSearchContainer} >
          <div className={styles.fixedSearch} >
            <div className={styles.fixedSearchContent}>어떤 호텔을 검색하시겠어요?</div>
          </div>
          <Image src="/icons/search.svg" alt='검색' width={25} height={25} title='검색' priority={true} className={styles.search}/>
        </div>
      </Link>
      }
      <div className={styles.wrapper}>
        <div className={styles["container"]}>
          <div className={styles.a}>
            <div className={styles["a-profile"]}>
              <Image src="/images/profileImg.png" alt='프로필사진' width={60} height={60} className={styles["radius-profile-img"]} />
              <div className={styles["profile-info"]}>
                <div className={styles["profile-name"]}>Nam bang</div>
                <div className={styles["profile-location"]}>
                  <Image src="/icons/location01.svg" alt='위치' width={18} height={18}/>
                  <p>서울 여의도동</p>
                </div>
              </div>
            </div>
            <div className={styles["a-icon"]}>
              <span className={styles["radius-01"]}>
                <Link href="/info/Search">
                  <Image src="/icons/search.svg" alt='검색' width={25} height={25} title='검색' priority={true}/>
                </Link>
              </span>
              <span className={styles["radius-02"]}>
                <Link href="/info/Notify" >
                  <Image src="/icons/notify.svg" alt='알림' width={25} height={25} title='알림' priority={true}/>
                </Link>
              </span>
            </div>
          </div>
          <div className={styles.b}>
              <div className={styles["wrap-notify"]}>
                <div className={styles["notify-Img"]}>
                  <div className={styles["radius-03"]}>
                    <Image src="/icons/notify-location.svg" alt='위치' width={21} height={21} priority={true}/>
                  </div>
                </div>
                <span>근처 장소를 표시하려면 위치를 변경할 수 있습니다.</span>
                <Image src="/icons/notify-arrow.svg" alt='버튼' width={24} height={24} className={styles["notify-arrow"]} priority={true}/>
              </div>
          </div>
          <div className={styles.c}>
            <div className={styles["wrap-popular"]}>
              <div className={styles["popular-title"]}>
                <span className={styles["tit"]}>찜 목록</span>
                <Link href="/info/Favorite">
                  <span className={styles["more"]} >더보기</span>
                </Link>
              </div>
              <div className={styles["container-popular"]}>
                {favoriteHotelData.map(favorite => ( 
                  // <Link href={`/hotel/DetailHotel`}
                  <Link href={`/hotel/DetailHotel?hotelId=${favorite.hotelId}`}
                    className={styles["popular-link"]} key={favorite.hotelId}>
                    <div className={styles["popular-img"]}>
                      <div className={styles["popular-heart-radius"]}>
                        <Image src="/icons/popular-fullHeart.png" alt='찜' width={16} height={16} className={styles["heart"]} priority={true} />
                      </div>
                      <Image 
                        src={`${pageAddress}${favorite.imagePath}`}
                        alt='popular' 
                        priority={true}  
                        width={155} 
                        height={220}
                        className={styles["bg-image"]} 
                      />
                      <div className={styles["popular-info"]}>
                        <div className={styles["name"]}>{favorite.name}</div>
                        <div className={styles["location"]}>{favorite.location}</div>
                        <div className={styles["popular-info02"]}>
                          <div className={styles["price"]}>550,000원~</div>
                          <div className={styles["score"]}>
                            <Image src="/images/popular-star.png" alt='popular' width={14} height={14} priority={true}/>
                            <span>4.6</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className={styles.d}>
              <div className={styles["wrap-recommend"]} >
                <div className={styles["recommend-title"]}>
                  <span className={styles["tit"]}>추천</span>
                  <span className={styles["more"]}>더보기</span>
                </div>
                <div className={styles["recommend-choice"]}>
                  <div className={`${styles["choice-all"]} ${isRecommend === 'ALL' ? styles.selected : ''}`} onClick={() => recommendItem('ALL')} >
                    <div></div>
                    <span>All</span>
                  </div>
                  <div className={`${styles["choice-hotels"]} ${isRecommend === 'HOTEL' ? styles.selected : ''}`} onClick={() => recommendItem('HOTEL')}>
                    <Image src="/icons/hotels.svg" alt='choice' width={28} height={28} priority={true}/>
                    <span>호텔</span>
                  </div>
                  <div className={`${styles["choice-villas"]} ${isRecommend === 'VILLA' ? styles.selected : ''}`} onClick={() => recommendItem('VILLA')}>
                    <Image src="/icons/villas.svg" alt='choice' width={28} height={28} priority={true}/>
                    <span>펜션</span>
                  </div>
                  <div className={`${styles["choice-apt"]} ${isRecommend === 'APT' ? styles.selected : ''}`} onClick={() => recommendItem('APT')}>
                    <Image src="/icons/apartment.svg" alt='choice' width={28} height={28} priority={true}/>
                    <span>아파트</span>
                  </div>
                  <div className={`${styles["choice-motel"]} ${isRecommend === 'motel' ? styles.selected : ''}`} onClick={() => recommendItem('motel')}>
                    <Image src="/icons/apartment.svg" alt='choice' width={28} height={28} priority={true}/>
                    <span>모텔</span>
                  </div>
                </div>
                <div className={styles["recommend-list"]}>
                  {typeList && typeList.length > 0 ? (
                  typeList.slice(0,5).map((type) => (
                    <div key={type.hotelId}>
                      <Link href={`/hotel/DetailHotel?hotelId=${type.hotelId}`} className={styles["hotels-list-content"]}>
                        <Image src={`${pageAddress}${type.hotelPictureList}`} alt='리스트' width={84} height={84} className={styles["hotels-list-img"]} priority={true} />
                        <div className={styles["hotels-list-info1"]}>
                          <div className={styles["name"]}>{type.hotelName}</div>
                          <div className={styles["location"]}>
                            <Image src="/icons/location01.svg" alt='위치' width={18} height={18} priority={true}/>
                            <p>{type.location}</p>
                          </div>
                          <div className={styles["hotels-list-info2"]}>
                            <span className={styles["price"]}>1,270,000원 ~</span>
                          </div>
                        </div>
                        <div className={styles["hotels-list-score"]}>
                          <Image src="/images/popular-star.png" alt='score' width={16} height={16} priority={true}/>
                          <span className={styles["score"]}>4.9</span>
                        </div>
                        </Link>
                      <hr className={styles["recommend-hr"]}/>
                    </div>
                  ))
                ):(<div className={styles["recommend-null"]}>추천 리스트가 없습니다.</div>)}
                </div>
              </div>
          </div>
          <div className={styles.e}>
            <div className={styles["wrap-map"]}>
              <div className={styles["map-title"]}>
                <span className={styles["tit"]}>내주변</span>
                <Link href={'/map'}>
                  <span className={styles["more"]}>지도보기</span>
                </Link>
              </div>
              <div className={styles["map"]}>
                <div>
                  <Link href={'/map'}>
                    <Map />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.f}>
            <div className={styles["wrap-bestToday"]}>
              <div className={styles["bestToday-title"]}>
                <span className={styles["tit"]}>오늘의 베스트🔥</span>
                <span className={styles["more"]}>더보기</span>
              </div>
              <div className={styles["bestToday-list"]}>
                {bestHotelData.map(best => ( 
                  <div className={styles["bestToday-content"]} key={best.hotelId}>
                    <Image src={`${pageAddress}${best.imagePath}`} alt='리스트' width={84} height={84} className={styles["best-list-img"]} priority={true} />
                    <div className={styles["best-list-info"]}>
                      <div className={styles["name"]}>{best.name}</div>
                      <div className={styles["location"]}>
                        <Image src="/icons/location01.svg" alt='위치' width={16} height={16} priority={true}/>
                        <p>{best.location}</p>
                      </div>
                      <div className={styles["best-list-info2"]}>
                        <div className={styles["best-list-score"]}>
                          <Image src="/images/popular-star.png" alt='score' width={16} height={16} priority={true}/>
                          <span className={styles["score"]}>5.0</span>
                          <span className={styles["review"]}>(1)</span>
                        </div>
                        <div className={styles["best-list-price"]}>
                          <span className={styles["discount-rate"]}>10%</span>
                          <span className={styles["discount-price"]}>900,000원</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.bottomAppBar}>
        <div className={styles.AppBar}>
          <div className={styles.item01}>
            <Link href="/" className={styles["link"]}>
                <Image src="/icons/homeIcon.svg" alt='홈' width={20} height={20} title='홈'priority={true}/>
                <div className={styles.title}>홈</div>
            </Link>
          </div>
          <div className={styles.item01}>
            <Link href="/info/Search" className={styles["link"]}>
              <Image src="/icons/search.svg" alt='검색' width={20} height={20} title='검색' priority={true}/>
              <div className={styles.title}>검색</div>
            </Link>
          </div>
          <div className={styles.item01}>
            <Link href="/" className={styles["link"]}>
              <Image src="/icons/menuIcon2.svg" alt='카테고리' width={20} height={20} title='카테고리' priority={true}/>
              <div className={styles.title}>카테고리</div>
            </Link>
          </div>
          <div className={styles.item01}>
            <Link href="/" className={styles["link"]}>
              <Image src="/icons/binPeople.svg" alt='내정보' width={20} height={20} title='내정보' priority={true}/>
              <div className={styles.title}>내정보</div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
