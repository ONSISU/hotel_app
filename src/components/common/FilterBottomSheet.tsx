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

const FilterBottomSheet: React.FC<BottomSheetProps> = ({
  children,
  isOpen,
  onClose,
  heightPercent = 90,
  draggable = true,
}) => {
  const sheetRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [currentTranslateY, setCurrentTranslateY] = useState(0);
  const [sheetPixelHeight, setSheetPixelHeight] = useState(0);
  const [topOffsetPx, setTopOffsetPx] = useState(0);
  const [isClosedAndHidden, setIsClosedAndHidden] = useState(true);

  // 바텀시트의 고정될 높이와 상단 오프셋을 클라이언트에서 계산
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const calculatedSheetHeight = window.innerHeight * (heightPercent / 100);
      setSheetPixelHeight(calculatedSheetHeight);
      const calculatedTopOffset = window.innerHeight - calculatedSheetHeight;
      setTopOffsetPx(calculatedTopOffset);

      if (isOpen) {
        setCurrentTranslateY(calculatedTopOffset);
        setIsClosedAndHidden(false);
      } else {
        setCurrentTranslateY(window.innerHeight);
        setIsClosedAndHidden(true);
      }
    }
  }, [heightPercent, isOpen]);

  // **(이전) setSheetTransform 함수를 변경합니다.**
  // 이제 이 함수는 DOM을 직접 조작하여 transform과 transition을 설정합니다.
  const applySheetTransform = useCallback((y: number, enableTransition: boolean) => {
    if (sheetRef.current) {
      const currentSheet = sheetRef.current; // 클로저 이슈 방지를 위해 참조

      // 1. transition 속성만 먼저 설정합니다.
      currentSheet.style.transition = enableTransition ? 'transform 2.0s ease-out' : 'none'; // **2.0s로 설정**

      // 2. DOM에 transition이 적용될 시간을 아주 아주 짧게 준 다음 transform을 적용합니다.
      // 0ms여도 브라우저는 별도의 태스크로 처리하려는 경향이 있습니다.
      setTimeout(() => {
        currentSheet.style.transform = `translateY(${y}px)`;
      }, 0); // 0ms 지연
    }
  }, []); // 의존성 배열은 빈 채로 유지

  // isOpen 상태 변경 시 시트 열림/닫힘 처리 및 애니메이션 트리거
  useEffect(() => {
    if (typeof window !== 'undefined' && sheetPixelHeight > 0) {
      if (isOpen) {
        applySheetTransform(topOffsetPx, true); // applySheetTransform 호출
        setCurrentTranslateY(topOffsetPx);
        document.body.style.overflow = 'hidden';
        setIsClosedAndHidden(false);
      } else {
        applySheetTransform(window.innerHeight, true); // applySheetTransform 호출
        setCurrentTranslateY(window.innerHeight);
        document.body.style.overflow = '';
        
        const transitionEndHandler = () => {
          if (!isOpen && sheetRef.current) {
            setIsClosedAndHidden(true);
            sheetRef.current.removeEventListener('transitionend', transitionEndHandler);
          }
        };
        if (sheetRef.current && !isDragging) {
            sheetRef.current.addEventListener('transitionend', transitionEndHandler);
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

  return (
    <>
      {isOpen && <div className="overlay" onClick={onClose} />}
      <div
        ref={sheetRef}
        className={`bottomSheet ${isOpen ? 'open' : ''} ${isDragging ? 'dragging' : ''}`}
        style={{
          height: `${sheetPixelHeight}px`, // 계산된 픽셀 높이로 고정
          // 초기 렌더링 시에는 currentTranslateY 값으로 설정하여 즉시 올바른 위치에 있도록 함
          transform: `translateY(${currentTranslateY}px)`
        }}
      >
        {draggable && (
          <div
            className="handle"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={(e) => e.preventDefault()} // 데스크톱에서 드래그 시 텍스트 선택 방지
          >
            <div className="handleBar"></div>
          </div>
        )}
        <div className="content">
          <div>ddd</div>
        </div>
      </div>
    </>
  );
};

export default FilterBottomSheet;