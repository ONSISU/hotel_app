// src/components/BottomSheet.tsx
import React, { useState, useRef, useEffect, useCallback } from 'react';
import '@/style/components/common/FilterBottomSheet.css';

interface BottomSheetProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  heightPercent?: number; // 최대 높이를 설정 (기본값 97)
  draggable?: boolean; // 드래그 기능 활성화 여부
}

const BottomSheet: React.FC<BottomSheetProps> = ({
  children,
  isOpen,
  onClose,
  heightPercent = 97,
  draggable = true,
}) => {
  const sheetRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0); // 터치 시작 Y 좌표
  const [currentTranslateY, setCurrentTranslateY] = useState(0); // 현재 translateY 값

  const initialHeight = window.innerHeight * (heightPercent / 100); // 바텀시트의 최대 높이 (PX)
  const initialOpenTransform = `calc(100vh - ${heightPercent}vh)`; // 바텀시트가 열렸을 때의 초기 transform 위치

  // 시트의 CSS transform 속성을 업데이트하는 함수
  const setSheetTransform = useCallback((y: number, transition: boolean) => {
    if (sheetRef.current) {
      sheetRef.current.style.transition = transition ? 'transform 0.3s ease-out' : 'none';
      sheetRef.current.style.transform = `translateY(${y}px)`;
    }
  }, []);

  // isOpen 상태 변경 시 시트 열림/닫힘 처리
  useEffect(() => {
    if (isOpen) {
      // 열릴 때는 최상단 위치로
      setSheetTransform(0, true);
      setCurrentTranslateY(0);
      document.body.style.overflow = 'hidden'; // 바텀 시트 열렸을 때 스크롤 방지
    } else {
      // 닫힐 때는 아래로 숨김
      setSheetTransform(window.innerHeight, true);
      document.body.style.overflow = ''; // 바텀 시트 닫혔을 때 스크롤 허용
    }
  }, [isOpen, setSheetTransform, heightPercent]);

  // 드래그 시작
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!draggable) return;
    setIsDragging(true);
    setStartY(e.touches[0].clientY); // 터치 시작 Y 좌표 기록
    
    // 현재 translateY 값을 정확히 가져와서 드래그 시작 시점의 위치로 설정
    // CSS calc() 값을 숫자로 변환하기 어려우므로, 열린 상태를 기준으로 시작 Y를 0으로 간주
    // 또는 실제 DOM에서 getComputedStyle로 현재 transform 값을 파싱해야 할 수도 있습니다.
    // 여기서는 간단하게, 드래그 시작 시 열린 상태이므로 currentTranslateY를 0으로 초기화
    setCurrentTranslateY(0); 
    
    setSheetTransform(0, false); // 드래그 시작 시 transition 제거
  };

  // 드래그 중
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !draggable) return;

    const currentY = e.touches[0].clientY;
    const dy = currentY - startY; // 이동한 거리 (아래로 드래그하면 양수)

    // 바텀시트가 위로 올라가지 않도록 제한 (dy는 0보다 작아질 수 없음)
    // 아래로만 이동 가능하게 (닫히는 방향)
    const newTranslateY = Math.max(0, dy); 
    setCurrentTranslateY(newTranslateY);
    setSheetTransform(newTranslateY, false);
  };

  // 드래그 끝
  const handleTouchEnd = () => {
    if (!isDragging || !draggable) return;
    setIsDragging(false);

    // 시트의 총 높이 (Viewport Height에서 Top Gap을 뺀 값)
    const sheetHeight = initialHeight; 
    
    // 현재 드래그한 거리가 시트 높이의 일정 비율(예: 30%) 이상이면 닫기
    if (currentTranslateY > sheetHeight * 0.3) { // 30% 이상 드래그하면 닫기
      onClose(); // 바텀 시트 닫기
    } else {
      // 아니면 원래 열린 위치로 되돌리기 (스냅백)
      setSheetTransform(0, true); // transition 적용하여 부드럽게
      setCurrentTranslateY(0);
    }
  };

  if (!isOpen && currentTranslateY === 0) { // 시트가 닫힌 상태이고 완전히 아래에 숨겨져 있다면 렌더링 안함
    return null;
  }

  return (
    <>
      {isOpen && <div className="overlay" onClick={onClose} />}
      <div
        ref={sheetRef}
        className={`${styles.bottomSheet} ${isOpen ? styles.open : ''} ${isDragging ? styles.dragging : ''}`}
        style={{ maxHeight: `${heightPercent}vh`, transform: `translateY(${isOpen ? 0 : window.innerHeight}px)` }} // 초기 transform 값
      >
        {draggable && (
          <div
            className={styles.handle}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={(e) => e.preventDefault()} // 데스크톱에서 드래그 시 텍스트 선택 방지
          >
            <div className={styles.handleBar}></div>
          </div>
        )}
        <div className={styles.content}>
          {children}
        </div>
      </div>
    </>
  );
};

export default BottomSheet;