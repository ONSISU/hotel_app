import styles from "@/style/page/info/Search.module.scss";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef, useCallback, useLayoutEffect  } from "react";
import axios from "axios";
import Link from "next/link";
import {PopularHotel, PopularHotelApiResponse} from '@/app/type/recommend';
import {recentSearch} from '@/app/type/recent';
import FilterBottomSheet from '@/components/common/FilterBottomSheet'; 

const LOCAL_STORAGE_KEY = 'recentSearches';

const OVERALL_MIN_PRICE = 20000;
const OVERALL_MAX_PRICE = 2000000;

export default function Search() {
  const router = useRouter();
  const imagePathAddress = "http://tomhoon.my:33000";
  const [recentSearches, setRecentSearches] = useState<recentSearch[]>([]);
  const [searchInput, setSearchInput] = useState<string>(''); // 검색 입력 필드의 상태
  const [popularHotelData, setPopularHotelData] = useState<PopularHotel[]>([]);
  const [isFilterBottomSheetOpen, setIsFilterBottomSheetOpen] = useState(false); 
  const sliderRef = useRef<HTMLDivElement | null>(null);
  // useEffect(() => {
  //   if (sliderRef.current) {
  //     console.log('slider DOM:', sliderRef.current);
  //     // 예: sliderRef.current.getBoundingClientRect()
  //   }
  // }, [isFilterBottomSheetOpen]);
    const [initialPixel, setInitialPixel] = useState<number | null>(null);

  const priceToPixel = useCallback((price: number) => {
    if (!sliderRef.current) return 0;
    const sliderWidth = sliderRef.current.offsetWidth;
    const priceRange = OVERALL_MAX_PRICE - OVERALL_MIN_PRICE;
    return ((price - OVERALL_MIN_PRICE) / priceRange) * sliderWidth;
  }, []);

  useLayoutEffect(() => {
    if (!sliderRef.current) return;

    const update = () => {
      const px = priceToPixel(300000);
      setInitialPixel(px);
      console.log('updated pixel:', px);
    };

    // 초기 실행
    update();

    // ResizeObserver로 사이즈 변화 감지
    const ro = new ResizeObserver(() => {
      update();
    });
    ro.observe(sliderRef.current);

    return () => {
      ro.disconnect();
    };
  }, [priceToPixel]);
  const backPage = () =>  {
    router.back(); 
  }

  useEffect(() => {
    try {
      const storedSearches = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedSearches) {
        setRecentSearches(JSON.parse(storedSearches));
      }
    } catch (error) {
      console.error("로컬 스토리지에서 최근 검색어를 불러오는데 실패했습니다.", error);
    }
  }, []);
  useEffect(() => {
    const popularHotel = async () => {
      try {
        const response = await axios.get<PopularHotelApiResponse>('http://tomhoon.my:33000/api/v1/hotel/popular');
        const popularHotelList: PopularHotel[] = response.data.data; 
        setPopularHotelData(popularHotelList);
      } catch (error) {
        console.error('데이터 가져오기 에러:', error);
        setPopularHotelData([]);
      }
    }
      popularHotel();
  }, []);
  const addRecentSearch = (name: string) => {
    if (!name.trim()) return; // 빈 문자열은 추가하지 않아요.

    const newSearchItem: recentSearch = {
      id: `${name}-${Date.now()}`,
      name: name.trim(), // 앞뒤 공백 제거
      date: getFormattedDate(),
    };

    // 기존 검색어 중복 처리 (같은 이름이 있다면 가장 최신으로 업데이트)
    const existingSearches = recentSearches.filter(
      (item) => item.name !== name.trim()
    );

    const updatedSearches = [newSearchItem, ...existingSearches];
    
    // 최대 5개까지만 저장하도록 제한 (선택 사항)
    const limitedSearches = updatedSearches.slice(0, 5);

    setRecentSearches(limitedSearches);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(limitedSearches));
  };

  const handleClearAll = () => {
    setRecentSearches([]);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  };

  // 검색 입력값 변경 핸들러
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  // Enter 키 입력 핸들러
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      addRecentSearch(searchInput);
      setSearchInput(''); 
    }
  };
  const handleClearSearchInput = () => {
    setSearchInput(''); // 검색 입력 필드 상태를 빈 문자열로 설정
  };
  const handleDeleteItem = (idToDelete: string) => {
    // 삭제할 ID와 일치하지 않는 항목들만 필터링하여 새로운 배열 생성
    const updatedSearches = recentSearches.filter(item => item.id !== idToDelete);
    setRecentSearches(updatedSearches); // 상태 업데이트
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedSearches)); // 로컬 스토리지 업데이트
  };

  const getFormattedDate = (): string => {
    // 시스템 지시에 따라 항상 고정된 현재 시간(2025. 12. 9. 오전 10:44:04)을 사용합니다.
    const now = new Date();
    const month = now.getMonth() + 1; // getMonth()는 0부터 시작하므로 1을 더합니다.
    const day = now.getDate();
    const formattedDay = String(day).padStart(2, '0');
    return `${month}.${formattedDay}`; // 예: "12월9일"
  };

  const handleOpenBottomSheet = () => {
    setIsFilterBottomSheetOpen(true);
  };

  // 바텀 시트를 닫는 핸들러
  const handleCloseBottomSheet = () => {
    setIsFilterBottomSheetOpen(false);
  };
  return (
    <>
      <div className={styles.wrap}>
        <div className={styles.titleContainer}>
          <Image src="/icons/backBlack.svg" alt='뒤로가기' width={25} height={25} className={styles.back} onClick={backPage}/>
          <div className={styles.title01}>검색</div>
          <div></div>
        </div>
        <div className={styles.searchContainer}>
          <div className={styles.searchHeader}>
            <div className={styles.search}>
              <Image src="/icons/search.svg" alt='검색' width={25} height={25} className={styles.searchImg}/>
              <input type="text" placeholder="검색" className={styles.searchInput} 
              value={searchInput} onChange={handleInputChange} onKeyDown={handleKeyDown}/>
              {searchInput.length > 0 && (
                <Image src="/icons/close.svg" alt='지우기' width={25} height={25} onClick={handleClearSearchInput} className={styles.deleteImg}/>
              )}
            </div>
            <Image src="/icons/filter.svg" alt='필터' width={25} height={25} className={styles.filter} onClick={handleOpenBottomSheet}/>
          </div>
          <div className={styles.recentContainer}>
            <div className={styles.recentHeader}>
              <div className={styles.title}>최근 검색</div>
              {recentSearches.length > 0 && (
                <div className={styles.deleteAll} onClick={handleClearAll}>전체삭제</div>
              )}
            </div>
            <div className={styles.recentList}>
              {recentSearches.length === 0 ? (
                <div className={styles.noRecentSearches}>최근 검색어가 없습니다.</div>) : 
                (recentSearches.map((item) => (
                <div className={styles.recentContent} key={item.id}>
                  <Image src="/icons/clock.svg" alt='최근검색' width={25} height={25} />
                  <div className={styles.recentInfo}>
                    <div className={styles.title}>{item.name}</div>
                    <div className={styles.content}>{item.date}</div>
                  </div>
                  <Image src="/icons/close02.svg" alt='지우기' width={20} height={20} onClick={(e) => {e.stopPropagation(); handleDeleteItem(item.id)}} className={styles.deleteImg}/>
                </div>
                ))
              )}
            </div>
          </div>
          <div className={styles.popularHeader}>
              <div className={styles.title}>추천</div>
              <div className={styles.more} >더보기</div>
            </div>
          <div className={styles.popularList}>
            {popularHotelData.map(popular => (
              <Link href={`/hotel/DetailHotel?hotelId=${popular.hotelId}`} key={popular.hotelId} className={styles.link}>
                <div className={styles.popularContent}>
                  <Image src={`${imagePathAddress}${popular.imagePath}`} alt='리스트' width={84} height={84} className={styles["hotelsListImg"]} priority={true} />
                  <div className={styles.popularInfo}>
                    <div className={styles.name}>{popular.name}</div>
                    <div className={styles.location}>
                      <Image src="/icons/location01.svg" alt='위치' width={18} height={18} priority={true}/>
                      <p>{popular.location}</p>
                    </div>
                    <div className={styles.popularPrice}>
                      <span className={styles.price}>1,270,000원 ~</span>
                    </div>
                  </div>
                  <div className={styles.popularScore}>
                    <Image src="/images/popular-star.png" alt='score' width={16} height={16} priority={true}/>
                    <span className={styles.score}>4.9</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <FilterBottomSheet
        sliderRef={sliderRef}
        isOpen={isFilterBottomSheetOpen}
        onClose={handleCloseBottomSheet}
        heightPercent={90} // 97% 높이까지 올라옴
        draggable= {true} // 드래그 기능 활성화 여부
      >
        <div></div>
      </FilterBottomSheet>
    </>
  )
}