import styles from "@/style/page/hotel/Reviews.module.scss";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect, useRef } from 'react';

const data = [
  { rating: 1, count: 5 },
  { rating: 2, count: 7 },
  { rating: 3, count: 2 },
  { rating: 4, count: 15 },
  { rating: 5, count: 25 },
];

export default function Reviews() {
  const [listSelected, setListSelected] = useState('추천순');
  const [isOpen, setIsOpen] = useState(false);
  const [show, setShow] = useState(false);  
  const [showMoreFacilities, setShowMoreFacilities] = useState(false); 
  const [hasMoreFacilities, setHasMoreFacilities] = useState(false); 
  const facilitiesRef = useRef<HTMLDivElement>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const router = useRouter();
  
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

  useEffect(() => {
    if (facilitiesRef.current) {
      if (facilitiesRef.current.scrollHeight > 90) {
        setHasMoreFacilities(true);
      } else {
        setHasMoreFacilities(false);
      }
    }
  }, []);

  const backPage=  () =>  {
    router.back(); 
  }
  const totalCount = data.reduce((sum, item) => sum + item.count, 0);

  const menuItems = [
    '추천순',
    '최신순',
    '평점 높은순',
    '평점 낮은순',
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

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 150) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // 페이지 최상단으로 부드럽게 스크롤하는 함수
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // 부드러운 스크롤 효과
    });
  };

  return(
    <>
    <div className={styles.reviewWrap}>
      <div className={styles.titleContainer}>
        <Image src="/icons/backBlack.svg" alt='뒤로가기' width={25} height={25} className={styles.back} onClick={backPage}/>
        <div className={styles.title01}>리뷰</div>
        <Image src="/icons/moreIconBlack.svg" alt='더보기' width={25} height={25} className={styles.more}/>
      </div>
    </div>
    <div className={styles.scoreContainer}>
      <div className={styles.scoreContent}>
        <div className={styles.score}>4.4</div>
        <div className={styles.scoreImg}>
          <Image src="/images/popular-star.png" alt='score' width={18} height={18}/>
          <Image src="/images/popular-star.png" alt='score' width={18} height={18}/>
          <Image src="/images/popular-star.png" alt='score' width={18} height={18}/>
          <Image src="/images/popular-star.png" alt='score' width={18} height={18}/>
          <Image src="/images/popular-star.png" alt='score' width={18} height={18}/>
        </div>
        <div className={styles.scoreAssessment}>421개의 평가</div>
      </div>
      <div className={styles.scoreGrade}>
        {data.map(({ rating, count }) => {
          const barWidth = (count / totalCount) * 160;
          return (
            <div className={styles.grade} key={rating}>
              {/* 별점 숫자 */}
              <div className={styles.rating}>{rating}</div>
              {/* 바 배경 */}
              <div className={styles.gradeBar}>
                {/* 파란색 채워진 부분 */}
                <div className={styles.gradeBarFill} 
                style={{width: `${barWidth}px`}}/>
              </div>
            </div>
          );
        })}
      </div>
    </div>
    <div className={styles.reviewContent}>
      <div className={styles.subTitle}>
        <div className={styles.title}>Review (421)</div>
        <div className={styles.sort}
          onClick={handleOpenBottomSheet}
          aria-haspopup="dialog"
          aria-expanded={isOpen}
        >{listSelected} ▼ 
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
          aria-label="정렬 옵션 선택"
          style={{ transform: isOpen ? 'translateY(0%)' : 'translateY(100%)'}}
        >
          <div className={styles.bottomSheetHeader}>
            <div className={styles.bottomSheetTitle}>정렬</div>
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
      <div className={styles.subContent}>
        <div className={styles.reviewInfo}>
          <div className={styles.userInfo}>
            <div className={styles.subInfo}>
              <Image src="/images/profileImg.png" alt='프로필사진' width={42} height={42} className={styles["radius-profile-img"]} />
              <div className={styles.info}>
                <div className={styles.name}>남뱅뱅</div>
                <div className={styles.date}>2025.11.25</div>
              </div>
            </div>
            <Image src="/icons/menuIcon.png" alt='menu' width={28} height={28}/>
          </div>
          <div className={styles.score}>
            <Image src="/images/popular-star.png" alt='score' width={16} height={16}/>
            <Image src="/images/popular-star.png" alt='score' width={16} height={16}/>
            <Image src="/images/popular-star.png" alt='score' width={16} height={16}/>
            <Image src="/images/popular-star.png" alt='score' width={16} height={16}/>
            <Image src="/images/popular-star.png" alt='score' width={16} height={16}/>
          </div>
          <div className={styles.roomName}>프리미엄 패밀리룸</div>
        </div>
        <div ref={facilitiesRef} 
            className={`${styles.content} ${!showMoreFacilities && hasMoreFacilities ? styles.collapsed : ''}`}>
          바다가 보이는 곳이라 좋았어요 좋아염좋아염좋아염좋아염좋아염좋아염좋아염좋아염좋아염좋아염좋아염좋아염좋아염좋아염좋아염좋아염좋아염좋아염좋아염좋아염좋아염좋아염좋아염좋아염좋아염좋아염좋아염좋아염좋아염좋아염좋아염좋아염좋아염좋아염좋아염좋아염좋아염좋아염좋아염좋아염좋아염좋아염좋아염좋아염좋아염좋아염좋아염좋아염좋아염좋아염좋아염좋아염
        </div>
        {hasMoreFacilities && (
          <div className={styles.moreButton}
            onClick={() => setShowMoreFacilities(true)}>
            {showMoreFacilities ? '': '더보기'}
          </div>
          )}
      </div>
      <div className={styles.subContent}>
        <div className={styles.reviewInfo}>
          <div className={styles.userInfo}>
            <div className={styles.subInfo}>
              <Image src="/images/profileImg.png" alt='프로필사진' width={42} height={42} className={styles["radius-profile-img"]} />
              <div className={styles.info}>
                <div className={styles.name}>지나가던지렁이</div>
                <div className={styles.date}>2025.11.24</div>
              </div>
            </div>
            <Image src="/icons/menuIcon.png" alt='menu' width={28} height={28}/>
          </div>
          <div className={styles.score}>
            <Image src="/images/popular-star.png" alt='score' width={16} height={16}/>
            <Image src="/images/popular-star.png" alt='score' width={16} height={16}/>
            <Image src="/images/popular-star.png" alt='score' width={16} height={16}/>
            <Image src="/images/bin-star.png" alt='score' width={16} height={16}/>
            <Image src="/images/bin-star.png" alt='score' width={16} height={16}/>
          </div>
          <div className={styles.roomName}>프리미엄 패밀리룸</div>
        </div>
        <div ref={facilitiesRef} 
            className={`${styles.content} ${!showMoreFacilities && hasMoreFacilities ? styles.collapsed : ''}`}>
          개미는 오늘도 뚠뚠 열심히 일을 하네 뚠뚠 개미는 언제나 뚠뚠 열심히 일을 하네 뚠뚠 
        </div>
        {hasMoreFacilities && (
          <div className={styles.moreButton}
            onClick={() => setShowMoreFacilities(true)}>
            {showMoreFacilities ? '': '더보기'}
          </div>
          )}
      </div>
      <div className={styles.subContent}>
        <div className={styles.reviewInfo}>
          <div className={styles.userInfo}>
            <div className={styles.subInfo}>
              <Image src="/images/profileImg.png" alt='프로필사진' width={42} height={42} className={styles["radius-profile-img"]} />
              <div className={styles.info}>
                <div className={styles.name}>지나가던지렁이</div>
                <div className={styles.date}>2025.11.24</div>
              </div>
            </div>
            <Image src="/icons/menuIcon.png" alt='menu' width={28} height={28}/>
          </div>
          <div className={styles.score}>
            <Image src="/images/popular-star.png" alt='score' width={16} height={16}/>
            <Image src="/images/popular-star.png" alt='score' width={16} height={16}/>
            <Image src="/images/popular-star.png" alt='score' width={16} height={16}/>
            <Image src="/images/popular-star.png" alt='score' width={16} height={16}/>
            <Image src="/images/bin-star.png" alt='score' width={16} height={16}/>
          </div>
          <div className={styles.roomName}>프리미엄 패밀리룸</div>
        </div>
        <div ref={facilitiesRef} 
            className={`${styles.content} ${!showMoreFacilities && hasMoreFacilities ? styles.collapsed : ''}`}>
          개미는 오늘도 뚠뚠 열심히 일을 하네 뚠뚠 개미는 언제나 뚠뚠 열심히 일을 하네 뚠뚠 
        </div>
        {hasMoreFacilities && (
          <div className={styles.moreButton}
            onClick={() => setShowMoreFacilities(true)}>
            {showMoreFacilities ? '': '더보기'}
          </div>
          )}
      </div>
      <div className={styles.subContent}>
        <div className={styles.reviewInfo}>
          <div className={styles.userInfo}>
            <div className={styles.subInfo}>
              <Image src="/images/profileImg.png" alt='프로필사진' width={42} height={42} className={styles["radius-profile-img"]} />
              <div className={styles.info}>
                <div className={styles.name}>지나가던지렁이</div>
                <div className={styles.date}>2025.11.24</div>
              </div>
            </div>
            <Image src="/icons/menuIcon.png" alt='menu' width={28} height={28}/>
          </div>
          <div className={styles.score}>
            <Image src="/images/popular-star.png" alt='score' width={16} height={16}/>
            <Image src="/images/popular-star.png" alt='score' width={16} height={16}/>
            <Image src="/images/popular-star.png" alt='score' width={16} height={16}/>
            <Image src="/images/popular-star.png" alt='score' width={16} height={16}/>
            <Image src="/images/bin-star.png" alt='score' width={16} height={16}/>
          </div>
          <div className={styles.roomName}>프리미엄 패밀리룸</div>
        </div>
        <div ref={facilitiesRef} 
            className={`${styles.content} ${!showMoreFacilities && hasMoreFacilities ? styles.collapsed : ''}`}>
          개미는 오늘도 뚠뚠 열심히 일을 하네 뚠뚠 개미는 언제나 뚠뚠 열심히 일을 하네 뚠뚠 
        </div>
        {hasMoreFacilities && (
          <div className={styles.moreButton}
            onClick={() => setShowMoreFacilities(true)}>
            {showMoreFacilities ? '': '더보기'}
          </div>
          )}
      </div>
      <div className={styles.subContent}>
        <div className={styles.reviewInfo}>
          <div className={styles.userInfo}>
            <div className={styles.subInfo}>
              <Image src="/images/profileImg.png" alt='프로필사진' width={42} height={42} className={styles["radius-profile-img"]} />
              <div className={styles.info}>
                <div className={styles.name}>지나가던지렁이</div>
                <div className={styles.date}>2025.11.24</div>
              </div>
            </div>
            <Image src="/icons/menuIcon.png" alt='menu' width={28} height={28}/>
          </div>
          <div className={styles.score}>
            <Image src="/images/popular-star.png" alt='score' width={16} height={16}/>
            <Image src="/images/popular-star.png" alt='score' width={16} height={16}/>
            <Image src="/images/popular-star.png" alt='score' width={16} height={16}/>
            <Image src="/images/popular-star.png" alt='score' width={16} height={16}/>
            <Image src="/images/bin-star.png" alt='score' width={16} height={16}/>
          </div>
          <div className={styles.roomName}>프리미엄 패밀리룸</div>
        </div>
        <div ref={facilitiesRef} 
            className={`${styles.content} ${!showMoreFacilities && hasMoreFacilities ? styles.collapsed : ''}`}>
          개미는 오늘도 뚠뚠 열심히 일을 하네 뚠뚠 개미는 언제나 뚠뚠 열심히 일을 하네 뚠뚠 
        </div>
        {hasMoreFacilities && (
          <div className={styles.moreButton}
            onClick={() => setShowMoreFacilities(true)}>
            {showMoreFacilities ? '': '더보기'}
          </div>
          )}
      </div>
    </div>
    {showScrollButton && ( 
      <div className={styles.scrollBtn}
        onClick={scrollToTop}
        style={{opacity: showScrollButton ? 1 : 0}}>∧
      </div>
    )}
    </>
  );
}