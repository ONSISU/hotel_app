import styles from "@/style/page/info/Favorite.module.scss";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState, useCallback  } from "react";
import { FavoriteHotel, FavoriteHotelApiResponse } from '@/app/type/home';
import axios from "axios";
import Link from "next/link";

export default function Favorite() {
  const router = useRouter();
  const [favoriteHotelData, setFavoriteHotelData] = useState<FavoriteHotel[]>([]);
  const [favoriteHeart, setFavoriteHeart] = useState(false);
  const imagePathAddress = "http://tomhoon.my:33000";

  const backPage = () =>  {
    router.back(); 
  }
  
  const favoriteSave = (e: React.MouseEvent) =>  {
    e.stopPropagation();
    e.preventDefault(); 
    setFavoriteHeart(!favoriteHeart);
  }

  useEffect(() => {
    const favoriteHotel = async () => {
      try {
        const response = await axios.get<FavoriteHotelApiResponse>('http://tomhoon.my:33000/api/v1/hotel/popular');
        const favoriteHotelList: FavoriteHotel[] = response.data.data; 
        setFavoriteHotelData(favoriteHotelList);
      } catch (error) {
        console.error('데이터 가져오기 에러:', error);
        setFavoriteHotelData([]);
      }
    }
    favoriteHotel();
  }, []);
  return(
    <>
      <div className={styles.wrap}>
        <div className={styles.titleContainer}>
          <Image src="/icons/backBlack.svg" alt='뒤로가기' width={25} height={25} className={styles.back} onClick={backPage}/>
          <div className={styles.title01}>찜</div>
          <div></div>
        </div>
        <div className={styles.favoriteContainer}>
          <div className={styles.search}>
            <Image src="/icons/search.svg" alt='검색' width={25} height={25} className={styles.searchImg}/>
            <input type="text" placeholder="검색" className={styles.searchInput}/>
          </div>
          <div className={styles.favoriteList}>
            {favoriteHotelData.map(favorite => ( 
              <div key={favorite.hotelId}>
                <Link href="/hotel/DetailHotel" className={styles["popular-link"]} >
                  <div className={styles.favoriteContent}>
                    <div className={styles.favoriteInfo}>
                      <Image 
                        src={`${imagePathAddress}${favorite.imagePath}`}
                        alt='favorite' 
                        priority={true}  
                        width={120} 
                        height={160}
                        className={styles.favoriteImage} 
                      />
                      <div className={styles.favoriteInfoDetail}>
                        <div className={styles.favoriteName}>{favorite.name}</div>
                        <div className={styles.favoriteLocation}>{favorite.location}</div>
                        <div className={styles.ScoreContainer} >
                          <Image src="/images/popular-star.png" alt='score' width={14} height={14} priority={true}/>
                          <div className={styles.favoriteScore}>5.0</div>
                          <div className={styles.favoriteReview}>(321)</div>
                        </div>
                      </div>
                    </div>
                    <div className={styles.popularHeartRadius}>
                      {!favoriteHeart ? 
                        <Image src="/icons/popular-fullHeart.png" alt='찜' width={16} height={16} className={styles.heart} priority={true} onClick={(e) => favoriteSave(e)}/> : 
                        <Image src="/icons/popular-binHeart.png" alt='찜' width={16} height={16} className={styles.heart} priority={true} onClick={(e) => favoriteSave(e)}/>
                      }
                    </div>
                    <div className={styles.favoritePrice}>
                      <div className={styles.discount}>
                        <span>10%</span>
                        <span>660,000</span>
                      </div>
                      <div className={styles.price}>600,000원</div>
                      <div className={styles.reserve}>예약마감</div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}