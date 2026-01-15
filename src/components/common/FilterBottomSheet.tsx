// src/components/BottomSheet.tsx
import React, { useState, forwardRef, useRef, useEffect, useCallback, useLayoutEffect    } from 'react';
import '@/style/components/common/FilterBottomSheet.css';
import Image from 'next/image';

interface BottomSheetProps {
  sliderRef: React.RefObject<HTMLDivElement | null>;
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  heightPercent?: number;
  draggable?: boolean;
}
const OVERALL_MIN_PRICE = 20000;  // 2만원
const OVERALL_MAX_PRICE = 2000000; // 200만원

const priceRanges = [
  { label: '5만원 이하', min: OVERALL_MIN_PRICE, max: 50000 },
  { label: '5~10만원', min: 50000 , max: 100000 },
  { label: '10~20만원', min: 100000, max: 200000 },
  { label: '20~30만원', min: 200000, max: 300000 },
  { label: '30만원이상', min: 300000, max: OVERALL_MAX_PRICE },
  { label: '전체가격', min: OVERALL_MIN_PRICE, max: OVERALL_MAX_PRICE },
];
const hotelGrade = [
  { label: '5성급', value: '5성급'},
  { label: '4성급', value: '4성급'},
  { label: '3성급', value: '3성급'},
  { label: '2성급', value: '2성급'},
  { label: '1성급', value: '1성급'},
];
const roomType = [
  { label: '호텔', value: '호텔'},
  { label: '모텔', value: '모텔'},
  { label: '아파트', value: '아파트'},
  { label: '펜션/리조트', value: '펜션/리조트'},
  { label: '풀빌라', value: '풀빌라'},
  { label: '캠핑', value: '캠핑'},
  { label: '게스트하우스', value: '게스트하우스'},
];
const score = [
  { label: '5', value: '5' },
  { label: '4', value: '4' },
  { label: '3', value: '3' },
  { label: '2', value: '2' },
  { label: '1', value: '1' },
];
const serviceType = [
  { label: '레스토랑', value: '레스토랑' },
  { label: '스파/월풀', value: '스파/월풀' },
  { label: '반려동물 동반', value: '반려동물 동반' },
  { label: '수영장', value: '수영장' },
];
// 초기화 버튼
const initialMinPrice = OVERALL_MIN_PRICE;
const initialMaxPrice = OVERALL_MAX_PRICE;
const initialHotelGrades: string[] = [];
const initialRoomTypes: string[] = []; 
const initialServiceTypes: string[] = []; 
const initialSelectedScore: string[] = [];

// 숫자에 쉼표와 '원'을 붙여주는 헬퍼 함수
const formatPrice = (price: number): string => {
  const tenThousand = 10000;
  const flooredPrice = Math.floor(price / tenThousand) * tenThousand;
  if (flooredPrice >= OVERALL_MAX_PRICE) {
    return `${flooredPrice.toLocaleString()} 이상`; // "200만원 이상"
  }
  return `${flooredPrice.toLocaleString()}원`;
};
const FilterBottomSheet = forwardRef<HTMLDivElement, BottomSheetProps>(function FilterBottomSheet(
  { sliderRef, isOpen, onClose, heightPercent = 90, draggable = true }, ref
) {

  // 부모가 slider DOM에 접근할 수 있도록 내부 DOM을 노출
  const sheetRef = useRef<HTMLDivElement | null >(null);
  
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [currentTranslateY, setCurrentTranslateY] = useState(0);
  const [sheetPixelHeight, setSheetPixelHeight] = useState(0);
  const [topOffsetPx, setTopOffsetPx] = useState(0);
  const [isClosedAndHidden, setIsClosedAndHidden] = useState(true);
  // 예약가능 버튼
  const [selectedPossibility, setSelectedPossibility] = useState<boolean>(false);
  const initialPossibility: boolean = false;
  // 가격 슬라이드
  const [selectedMinPrice, setSelectedMinPrice] = useState<number>(OVERALL_MIN_PRICE);
  const [selectedMaxPrice, setSelectedMaxPrice] = useState<number>(OVERALL_MAX_PRICE);
  const [isDraggingMin, setIsDraggingMin] = useState(false);
  const [isDraggingMax, setIsDraggingMax] = useState(false);
  const [minHandlePos, setMinHandlePos] = useState<number>(0);
  const [maxHandlePos, setMaxHandlePos] = useState<number>(366);
  //  호텔 성급
  const [selectedHotelGrades, setSelectedHotelGrades] = useState<string[]>([]);
  // 숙소 유형
  const [selectedRoomTypes, setSelectedRoomTypes] = useState<string[]>([]);
  // 별점
  const [selectedScore, setSelectedScore] = useState<string[]>([]);
  // 서비스 유형
  const [selectedServiceTypes, setSelectedServiceTypes] = useState<string[]>([]);
  // 초기화버튼
  const [isFilterChanged, setIsFilterChanged] = useState<boolean>(false);

  // 초기화버튼
  useEffect(() => {
    const hasPriceChanged =
      selectedMinPrice !== initialMinPrice || selectedMaxPrice !== initialMaxPrice;

    // 배열 비교는 요소의 순서와 내용이 모두 같아야 '같다'고 판단합니다.
    const hasHotelGradesChanged =
      JSON.stringify([...selectedHotelGrades].sort()) !==
      JSON.stringify([...initialHotelGrades].sort());

    const hasRoomTypesChanged =
      JSON.stringify([...selectedRoomTypes].sort()) !==
      JSON.stringify([...initialRoomTypes].sort());

    const hasServiceTypesChanged =
      JSON.stringify([...selectedServiceTypes].sort()) !==
      JSON.stringify([...initialServiceTypes].sort());
    const hasScoreChanged =
      JSON.stringify([...selectedScore].sort()) !==
      JSON.stringify([...initialSelectedScore].sort());
    const hasPossibilityChanged = selectedPossibility !== initialPossibility;
    // 하나라도 변경되었다면 isFilterChanged를 true로 설정
    if (
      hasPriceChanged ||
      hasHotelGradesChanged ||
      hasRoomTypesChanged ||
      hasServiceTypesChanged ||
      hasPossibilityChanged ||
      hasScoreChanged 
    ) {
      setIsFilterChanged(true);
    } else {
      setIsFilterChanged(false);
    }
  }, [selectedMinPrice, selectedMaxPrice, selectedHotelGrades, selectedRoomTypes, selectedServiceTypes, selectedPossibility, initialPossibility, selectedScore]);
  const handleResetFilters = () => {
    if (!isFilterChanged) return;

    setSelectedMinPrice(initialMinPrice);
    setSelectedMaxPrice(initialMaxPrice);
    setSelectedHotelGrades(initialHotelGrades);
    setSelectedRoomTypes(initialRoomTypes);
    setSelectedServiceTypes(initialServiceTypes);
    setSelectedPossibility(initialPossibility); 
    setSelectedScore(initialSelectedScore);
    // 슬라이더 핸들 위치도 초기화
    setSelectedMinPrice(20000);
    setSelectedMaxPrice(2000000);
    handleRangeButtonClick(OVERALL_MIN_PRICE,OVERALL_MAX_PRICE);
  };
  // 예약가능 버튼
  const handlePossibilityChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPossibility(e.target.checked);
  }, []);
  // 별점
  const handleScoreClick = useCallback((scoreValue: string) => {
    setSelectedScore((prevScores) =>
      prevScores.includes(scoreValue)
        ? prevScores.filter((score) => score !== scoreValue) // 이미 있으면 제거
        : [...prevScores, scoreValue] // 없으면 추가
    );
  }, []);
  // 서비스 유형
  const handleServiceTypeChange = useCallback((service: string, isChecked: boolean) => {
    setSelectedServiceTypes((prev) =>
      isChecked ? [...prev, service] : prev.filter((item) => item !== service)
    );
  }, []);
  // 가격 슬라이드
  useLayoutEffect(() => {
    if (isOpen && sliderRef.current) { 
      setSelectedMinPrice(20000);
      setSelectedMaxPrice(2000000);
    }
  }, [isOpen, sliderRef]); 

  const pixelToPrice = useCallback((pixel: number) => {
    if (!sliderRef.current) return OVERALL_MIN_PRICE;
    const sliderWidth = sliderRef.current.offsetWidth;
    const priceRange = OVERALL_MAX_PRICE - OVERALL_MIN_PRICE;
    const price = Math.round((pixel / sliderWidth) * priceRange + OVERALL_MIN_PRICE);
    return Math.max(OVERALL_MIN_PRICE, Math.min(price, OVERALL_MAX_PRICE));
  }, [sliderRef]); 

  // 가격을 픽셀 위치로 변환
  const priceToPixel = useCallback((price: number, sliderWidth: number): number => {
    if (sliderWidth === 0) return 0;
    const priceRange = OVERALL_MAX_PRICE - OVERALL_MIN_PRICE;
    if (priceRange === 0) return 0; // 나눗셈 에러 방지
    return ((price - OVERALL_MIN_PRICE) / priceRange) * sliderWidth;
  }, []);
    // 핸들 위치를 계산하고 상태를 업데이트하는 함수
  const updateHandlePositions = useCallback(() => {
    if (sliderRef.current) {
      const sliderWidth = sliderRef.current.offsetWidth;
      const newMinPos = priceToPixel(selectedMinPrice, sliderWidth);
      const newMaxPos = priceToPixel(selectedMaxPrice, sliderWidth);
      setMinHandlePos(newMinPos);
      setMaxHandlePos(newMaxPos);
    }
  }, [sliderRef, priceToPixel, selectedMinPrice, selectedMaxPrice]);
  // 핸들 드래그 시작
  const handleDragStart = useCallback((e: React.MouseEvent | React.TouchEvent, type: 'min' | 'max') => {
    if (type === 'min') setIsDraggingMin(true);
    else setIsDraggingMax(true);
  }, []);

  // 핸들 드래그 중
  const handleDrag = useCallback((e: MouseEvent | TouchEvent) => {
    if (!isDraggingMin && !isDraggingMax) return;
    if (!sliderRef.current) return;

    const sliderRect = sliderRef.current.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    let newPixel = clientX - sliderRect.left;
    newPixel = Math.max(0, Math.min(newPixel, sliderRect.width));
    let newPrice = pixelToPrice(newPixel);

    if (isDraggingMin) {
      newPrice = Math.min(newPrice, selectedMaxPrice);
      newPrice = Math.max(newPrice, OVERALL_MIN_PRICE);
      setSelectedMinPrice(newPrice); // 부모의 상태를 직접 업데이트
    } else if (isDraggingMax) {
      newPrice = Math.max(newPrice, selectedMinPrice);
      newPrice = Math.min(newPrice, OVERALL_MAX_PRICE);
      setSelectedMaxPrice(newPrice); // 부모의 상태를 직접 업데이트
    }
  }, [isDraggingMin, isDraggingMax, sliderRef, pixelToPrice, selectedMaxPrice, selectedMinPrice]);
  // 드래그 종료
  const handleDragEnd = useCallback(() => {
    setIsDraggingMin(false);
    setIsDraggingMax(false);
  }, []);
  const handleClickOnTrack = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (isDraggingMin || isDraggingMax) return;
    if (!sliderRef.current) return;

    const sliderRect = sliderRef.current.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    let clickPixel = clientX - sliderRect.left;

    clickPixel = Math.max(0, Math.min(clickPixel, sliderRect.width));
    const clickedPrice = pixelToPrice(clickPixel);
    const currentMinPixel = priceToPixel(selectedMinPrice, sliderRect.width);
    const currentMaxPixel = priceToPixel(selectedMaxPrice, sliderRect.width);
    const distToMinHandle = Math.abs(clickPixel - currentMinPixel);
    const distToMaxHandle = Math.abs(clickPixel - currentMaxPixel);

    if (distToMinHandle <= distToMaxHandle) {
        setSelectedMinPrice(clickedPrice);
    } else {
        setSelectedMaxPrice(clickedPrice);
    }
  }, [isDraggingMin, isDraggingMax, sliderRef, pixelToPrice, priceToPixel, selectedMinPrice, selectedMaxPrice]);

  useEffect(() => {
    window.addEventListener('mousemove', handleDrag);
    window.addEventListener('mouseup', handleDragEnd);
    window.addEventListener('touchmove', handleDrag);
    window.addEventListener('touchend', handleDragEnd);
    return () => {
      window.removeEventListener('mousemove', handleDrag);
      window.removeEventListener('mouseup', handleDragEnd);
      window.removeEventListener('touchmove', handleDrag);
      window.removeEventListener('touchend', handleDragEnd);
    };
  }, [handleDrag, handleDragEnd]);
  useEffect(() => {
    updateHandlePositions();
    const handleResize = () => {
        updateHandlePositions();
    };
    window.addEventListener('resize', handleResize);
    return () => {
        window.removeEventListener('resize', handleResize);
    };
  }, [updateHandlePositions, isOpen]);
  // 가격 범위 버튼 클릭 시 호출될 함수 (이전 PriceFilterPage.tsx)
  const handleRangeButtonClick = (min: number, max: number) => {
    setSelectedMinPrice(min);
    setSelectedMaxPrice(max);
  };
  // 현재 선택된 범위가 버튼 범위와 일치하는지 확인 (이전 PriceFilterPage.tsx)
  const isRangeActive = useCallback((min: number, max: number): boolean => {
    if (min === 300000 && selectedMinPrice >= min && selectedMaxPrice === OVERALL_MAX_PRICE) {
        return true;
    }
    return selectedMinPrice === min && selectedMaxPrice === max;
  }, [selectedMinPrice, selectedMaxPrice]);

  //가격슬라이드 끝
  
  // 바텀시트의 고정될 높이와 상단 오프셋을 클라이언트에서 계산
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const calculatedSheetHeight = window.innerHeight * (heightPercent / 100);
      setSheetPixelHeight(calculatedSheetHeight);
      setTopOffsetPx(window.innerHeight - calculatedSheetHeight);
    }
  }, [heightPercent]);

  const applySheetTransform = useCallback((y: number, enableTransition: boolean) => {
    if (sheetRef.current) {
      const currentSheet = sheetRef.current;
      currentSheet.style.transition = enableTransition ? '' : 'none';
      currentSheet.style.transform = `translateY(${y}px)`;
    }
  }, []); // 의존성 배열은 빈 채로 유지
  
  // isOpen 상태 변경 시 시트 열림/닫힘 처리 및 애니메이션 트리거
  useEffect(() => {
    if (typeof window !== 'undefined' && sheetPixelHeight > 0 && topOffsetPx >= 0) {
      if (isOpen) {
        // 열릴 때: 바로 보이게 하고, 애니메이션 시작
        setIsClosedAndHidden(false);
        document.body.style.overflow = 'hidden'; // 스크롤 방지
        // 아주 짧은 딜레이 후에 transform 적용 (transition이 제대로 걸리게)
        setTimeout(() => {
            applySheetTransform(topOffsetPx, true);
        }, 50); // 50ms 딜레이
      } else {
        // 닫힐 때: 애니메이션 시작
        document.body.style.overflow = ''; // 스크롤 다시 허용
        applySheetTransform(window.innerHeight, true);

        // transition이 끝난 후 컴포넌트를 완전히 숨김
        const transitionEndHandler = () => {
          if (sheetRef.current && !isOpen) { // 현재 isOpen이 false인 경우에만
            setIsClosedAndHidden(true);
            sheetRef.current.removeEventListener('transitionend', transitionEndHandler);
          }
        };
        // isDragging 중이 아닐 때만 transitionend 리스너 추가
        if (sheetRef.current && !isDragging) {
            sheetRef.current.addEventListener('transitionend', transitionEndHandler);
        } else if (isDragging) { // 드래그 중이었다면 애니메이션 없으니 바로 숨김
            setIsClosedAndHidden(true);
        }
      }
    }
  }, [isOpen, applySheetTransform, sheetPixelHeight, topOffsetPx, isDragging]);

  // 드래그 시작
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!draggable) return;
    setIsDragging(true);
    setStartY(e.touches[0].clientY);

    if (sheetRef.current) {
        const style = window.getComputedStyle(sheetRef.current);
        const matrix = new DOMMatrix(style.transform);
        setCurrentTranslateY(matrix.m42);
    }
    
    applySheetTransform(currentTranslateY, false); // applySheetTransform 호출
  };

  // 드래그 중
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !draggable) return;

    const currentTouchY = e.touches[0].clientY;
    const newY = currentTouchY - startY + currentTranslateY; 

    const maxTranslateY = typeof window !== 'undefined' ? window.innerHeight : sheetPixelHeight;
    const constrainedY = Math.max(topOffsetPx, Math.min(newY, maxTranslateY));
    
    applySheetTransform(constrainedY, false); // applySheetTransform 호출
  };

  // 드래그 끝
  const handleTouchEnd = () => {
    if (!isDragging || !draggable) return;
    setIsDragging(false);

    const finalTransformY = sheetRef.current ? new DOMMatrix(window.getComputedStyle(sheetRef.current).transform).m42 : topOffsetPx;
    const movedDistance = finalTransformY - topOffsetPx;

    if (movedDistance > sheetPixelHeight * 0.3) { 
      onClose();
    } else {
      applySheetTransform(topOffsetPx, true); // applySheetTransform 호출
      setCurrentTranslateY(topOffsetPx);
    }
  };

  if (isClosedAndHidden) { 
    return null;
  }
  
  if (typeof window === 'undefined' && isClosedAndHidden) {
      return null;
  }
  // 호텔 성급
  const handleHotelGradeClick = (gradeValue: string) => {
    if (selectedHotelGrades.includes(gradeValue)) {
      setSelectedHotelGrades(selectedHotelGrades.filter(grade => grade !== gradeValue));
    } else {
      setSelectedHotelGrades([...selectedHotelGrades, gradeValue]);
    }
  };
  // 숙소 유형
  const handleRoomTypeClick = (typeValue: string) => {
    if (selectedRoomTypes.includes(typeValue)) {
      setSelectedRoomTypes(selectedRoomTypes.filter(type => type !== typeValue));
    } else {
      setSelectedRoomTypes([...selectedRoomTypes, typeValue]);
    }
  };

  return (
    <>
      {isOpen && <div className="overlay" onClick={onClose} />}
      <div
        ref={sheetRef}
        className={`bottomSheet ${isOpen ? 'open' : ''} ${isDragging ? 'dragging' : ''}`}
        style={{
          height: `${sheetPixelHeight}px`, // 계산된 픽셀 높이로 고정
        }}
      >
        {draggable && (
          <div
            className="handle"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={(e) => e.preventDefault()}
          >
            <div className="handleBar"></div>
          </div>
        )}
        <div className="content">
          <div className="filterWrap">
            <div className="title">필터</div>
            <div className='filterContainer'>
              <div className='reversePossibility'>
                <label htmlFor='possibility'>
                  <div className='txt'>예약 가능한 숙소만 보기</div>
                  <input type='checkbox' id='possibility' className='possibility' checked={selectedPossibility} onChange={handlePossibilityChange} />
                </label>
              </div>
              <div className='priceRangeContainer'>
                <div className="price-range-container">
                  <div className="price-display">
                    <span>{formatPrice(selectedMinPrice)}</span>
                    <span>{formatPrice(selectedMaxPrice)}</span>
                  </div>
                  <div className="slider-wrapper" ref={sliderRef} onClick={handleClickOnTrack} onTouchStart={handleClickOnTrack}>
                    <div className="slider-track" />
                    <div
                      className="slider-fill"
                      style={{
                        left: `${minHandlePos}px`,
                        width: `${maxHandlePos - minHandlePos}px`,
                      }}
                    />
                    <div
                      className={`slider-handle ${isDraggingMin ? 'dragging' : ''}`}
                      style={{ left: `${minHandlePos}px` }}
                      onMouseDown={(e) => handleDragStart(e, 'min')}
                      onTouchStart={(e) => handleDragStart(e, 'min')}
                    />
                    <div
                      className={`slider-handle ${isDraggingMax ? 'dragging' : ''}`}
                      style={{ left:`${maxHandlePos}px`  }}
                      onMouseDown={(e) => handleDragStart(e, 'max')}
                      onTouchStart={(e) => handleDragStart(e, 'max')}
                    />
                  </div>
                  <div className="range-buttons">
                    {priceRanges.map((range, index) => (
                      <button
                        key={index}
                        onClick={() => handleRangeButtonClick(range.min, range.max)}
                        className={isRangeActive(range.min, range.max) ? 'active' : ''}
                      >
                        {range.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="hotelGrade">
                <div className="hotelGradeTit">호텔 성급</div>
                <div>
                    {hotelGrade.map((grade, index) => (
                      <button
                        key={index}
                        onClick={() => handleHotelGradeClick(grade.value)} // 클릭 이벤트 핸들러 연결
                        className={selectedHotelGrades.includes(grade.value) ? 'active' : ''}
                      >
                        {grade.label}
                      </button>
                    ))}
                </div>
              </div>
              <div className='roomType'>
                <div className='roomTypeTit'>숙소 유형</div>
                <div className='roomTypeList'>
                  {roomType.map((type, index) => (
                      <button
                        key={index}
                        onClick={() => handleRoomTypeClick(type.value)} // 클릭 이벤트 핸들러 연결
                        className={selectedRoomTypes.includes(type.value) ? 'active' : ''}
                      >
                        {type.label}
                      </button>
                    ))}
                </div>
              </div>
              <div className='score'>
                <div className='scoreTit'>별점</div>
                {score.map((item) => (
                  <div key={item.value} className={`scoreContainer ${selectedScore.includes(item.value) ? 'active' : ''}`} 
                    onClick={() => handleScoreClick(item.value)}>
                    <Image src="/images/popular-star.png" alt='별점' width={18} height={18} priority={true} className='img'/>
                    <div className='scoreTxt'>{item.label}</div>
                  </div>
                ))}
              </div>
              <div className='serviceType'>
                <div className='serviceTypeTit'>서비스 유형</div>
                {serviceType.map((serviceItem) => (
                  <label htmlFor={`service-${serviceItem.value}`} key={serviceItem.value}>
                    <div>{serviceItem.label}</div>
                    <input
                      type='checkbox'
                      id={`service-${serviceItem.value}`} 
                      value={serviceItem.value}
                      checked={selectedServiceTypes.includes(serviceItem.value)}
                      onChange={(e) => handleServiceTypeChange(e.target.value, e.target.checked)}
                    />
                  </label>
                ))}
              </div>
              <div className='filterBtn'>
                <div className={`filterReset ${!isFilterChanged ? 'disabled-state' : ''}`}>
                  <Image src="/icons/reload.png" alt='초기화' width={18} height={18} priority={true} className='img'/>
                  <button className='resetTxt' onClick={handleResetFilters} disabled={!isFilterChanged}>초기화</button>
                </div>
                <div className='filterApply' onClick={onClose}>0000개 숙소 보기</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});
FilterBottomSheet.displayName = 'FilterBottomSheet';
export default FilterBottomSheet;